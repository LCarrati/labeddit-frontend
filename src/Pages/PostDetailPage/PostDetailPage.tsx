import { useEffect, useState } from "react"
import { axiosPrivate } from "../../Api/axios"
import Header from "../../Components/Header/header"
import { goToLogin } from "../../Routes/coordinator"
import { useNavigate, useParams } from "react-router-dom"
import NewComment from "../../Components/NewComment/NewComment"
import Comment from "../../Components/Comment/Comment"
import Post from "../../Components/Post/post"


const PostDetailPage = () => {
  const { post_id } = useParams();
  const [post, setPost] = useState<JSX.Element | null>(null);

    interface Comment {
      comment_id: string;
        post_id: string;
        content: string;
        likes: number;
        dislikes: number;
        comment: string;
        nickname: string;
      }
    const [commentsList, setCommentsList] = useState<Comment[]>([])
    const navigate = useNavigate()

    const getComments = async () => {
      try {
        const response = await axiosPrivate.get(`/comment/getallcomments/${post_id}`, {withCredentials: true});
        const comments = response.data
        console.log(response.data)
        setCommentsList(comments)        
      } catch (error) {
        goToLogin(navigate)
      }
    }

    interface CommentProps {
      comment_id: string;
        post_id: string;
        content: string;
        likes: number;
        dislikes: number;
        comment: string;
        creator: string;
        onDeleteComment: (deletedCommentID: string) => void;
      }

      const handleCommentDeleted = (deletedCommentID: string) => {
        console.log(deletedCommentID)
        const newCommentsList = [...commentsList].filter((comment) => comment.comment_id !== deletedCommentID);
        console.log(newCommentsList)
        setCommentsList(newCommentsList);
      };

    const commentsListJSX = [...commentsList].reverse().map((comment) => {
        const commentProps: CommentProps = {
            comment_id: comment.comment_id,
            post_id: comment.post_id,
            content: comment.content,
            likes: comment.likes,
            dislikes: comment.dislikes,
            comment: comment.comment,
            creator: comment.nickname,
            onDeleteComment: handleCommentDeleted

          };
          return <Comment key={comment.comment_id} {...commentProps}/>;

    })

    const handleCommentCreated = (newComment: Comment) => {
      console.log(newComment)
        setCommentsList([...commentsList, newComment]);
      };

    useEffect(() => {
        getComments()
    },[])


    interface PostProps {
      post_id: string;
      content: string;
      likes: number;
      dislikes: number;
      comments: number;
      creator: string;
      onDeletePost: (deletedPostID: string) => void;
    }

    const handlePostDeleted = (deletedPostID: string) => {
      console.log(deletedPostID)

    };
    // procurar o post pelo post_id, alimentar o objeto postProps com as informações, assim vou ter os dados.

    // axios request to get post by ID
    const getPostById = async () => {
      try {
        const response = await axiosPrivate
        .get(`/posts/findpost/${post_id}`, {
          withCredentials: true
        });
        console.log(response.data)

        const postProps: PostProps = {
          post_id: response.data.posts.post_id,
          content: response.data.posts.content,
          likes: response.data.posts.likes,
          dislikes: response.data.posts.dislikes,
          comments: response.data.posts.comments,
          creator: response.data.posts.nickname,
          onDeletePost: handlePostDeleted
        };
        const postComponent = <Post key={post_id} {...postProps}/>;
        setPost(postComponent);

      } catch (error) {
        goToLogin(navigate)
      }
    }
    useEffect(() => {
      getPostById();
    }, [commentsList]);



//
// Verificar se post_id é undefined antes de usá-lo
const postIdProp = post_id ? post_id : "";
  return (
    <>
    <Header menu_text="Logout" cancelButtonVisibility="visible"/>
    {post}
    <NewComment objective="Responder" placeholder="Escreva sua resposta..." onCommentCreated={handleCommentCreated} post_id={postIdProp}/>
        {commentsListJSX}
    </>
  )
}

export default PostDetailPage