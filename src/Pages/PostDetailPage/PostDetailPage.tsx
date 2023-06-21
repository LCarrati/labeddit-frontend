import { useEffect, useState } from "react"
import { axiosPrivate } from "../../Api/axios"
import Header from "../../Components/Header/header"
import { goToPostsList } from "../../Routes/coordinator"
import { useNavigate, useParams } from "react-router-dom"
import NewComment from "../../Components/NewComment/NewComment"
import Comment from "../../Components/Comment/Comment"
import Post from "../../Components/Post/post"
import { IComment , CommentProps, PostProps } from "../../Interfaces/interfaces"

const PostDetailPage = () => {
  const { post_id } = useParams();
  const [post, setPost] = useState<JSX.Element | null>(null);
  const [commentsList, setCommentsList] = useState<IComment[]>([])
  const navigate = useNavigate()

  // buscar lista de comentários
  const getComments = async () => {
    try {
      const response = await axiosPrivate.get(`/comment/getallcomments/${post_id}`, { withCredentials: true });
      const comments = response.data
      setCommentsList(comments)
    } catch (error) {
      console.log(error)
      goToPostsList(navigate)
    }
  }

  // deletar comentário
  const handleCommentDeleted = (deletedCommentID: string) => {
    const newCommentsList = [...commentsList].filter((comment) => comment.comment_id !== deletedCommentID);
    setCommentsList(newCommentsList);
  };

  // criar lista de comentários
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
    return <Comment key={comment.comment_id} {...commentProps} />;
  })

  // criar novo comentário
  const handleCommentCreated = (newComment: IComment) => {
    setCommentsList([...commentsList, newComment]);
  };

  // buscar comentários ao montar o componente
  useEffect(() => {
    getComments()
  }, [])

  // lógica para deletar o post estando na página do post
  const handlePostDeleted = (deletedPostID: string) => {
    console.log(deletedPostID)
    // implementar lógica para deletar o post e retornar para página principal
  };

  // buscar post por id
  const getPostById = async () => {
    try {
      const response = await axiosPrivate
        .get(`/posts/findpost/${post_id}`, {
          withCredentials: true
        });

      const postProps: PostProps = {
        post_id: response.data.posts.post_id,
        content: response.data.posts.content,
        likes: response.data.posts.likes,
        dislikes: response.data.posts.dislikes,
        comments: response.data.posts.comments,
        creator: response.data.posts.nickname,
        onDeletePost: handlePostDeleted
      };
      const postComponent = <Post key={post_id} {...postProps} />;
      setPost(postComponent);
    } catch (error) {
      console.log(error)
      goToPostsList(navigate)
    }
  }

  // atualiza a contagem de comentários ao criar/deletar comentário
  useEffect(() => {
    getPostById();
  }, [commentsList]);

  // Verificar se post_id é undefined antes de usá-lo
  const postIdProp = post_id ? post_id : "";

  return (
    <>
      <Header menu_text="Logout" cancelButtonVisibility="visible" />
      {post}
      <NewComment objective="Responder" placeholder="Escreva sua resposta..." onCommentCreated={handleCommentCreated} post_id={postIdProp} />
      {commentsListJSX}
    </>
  )
}

export default PostDetailPage