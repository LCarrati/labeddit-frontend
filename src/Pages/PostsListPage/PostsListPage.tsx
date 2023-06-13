import { useEffect, useState } from "react"
import { axiosPrivate } from "../../Api/axios"
import Header from "../../Components/Header/header"
import NewPost from "../../Components/NewPost/newpost"
import Post from "../../Components/Post/post"
import { goToLogin } from "../../Routes/coordinator"
import { useNavigate } from "react-router-dom"


const PostsListPage = () => {

    interface Post {
        post_id: string;
        content: string;
        likes: number;
        dislikes: number;
        comments: number;
        nickname: string;
      }
    const [postsList, setPostsList] = useState<Post[]>([])
    const navigate = useNavigate()

    const getPosts = async () => {
      try {
        const response = await axiosPrivate.get('/posts/postslist', {withCredentials: true});
        const posts = response.data.posts
        console.log(posts)
        setPostsList(posts)        
      } catch (error) {
        goToLogin(navigate)
      }
    }

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
        const newPostsList = [...postsList].filter((post) => post.post_id !== deletedPostID);
        setPostsList(newPostsList);
      };

    const postsListJSX = [...postsList].reverse().map((post) => {
        const postProps: PostProps = {
            post_id: post.post_id,
            content: post.content,
            likes: post.likes,
            dislikes: post.dislikes,
            comments: post.comments,
            creator: post.nickname,
            onDeletePost: handlePostDeleted

          };
          return <Post key={post.post_id} {...postProps}/>;
        // return <Post 
        //     key={post.post_id} 
        //     content={post.content} 
        //     likes={post.likes}
        //     dislikes={post.dislikes}
        //     comments={post.comments}
        //     creator={post.nickname}
        //     as="div"
        // />
    })

    const handlePostCreated = (newPost: Post) => {
      console.log(newPost)
        setPostsList([...postsList, newPost]);
      };

    useEffect(() => {
        getPosts()
    },[])

  return (
    <>
    <Header menu_text="Logout" cancelButtonVisibility="hidden"/>
    <NewPost objective="Postar" placeholder="Escreva seu post..." onPostCreated={handlePostCreated}/>
        {postsListJSX}
    {/* <PostsListContainer> */}
        {/* <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/> */}
    {/* </PostsListContainer> */}
    </>
  )
}

export default PostsListPage