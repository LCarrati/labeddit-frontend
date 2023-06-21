import { useEffect, useState } from "react"
import { axiosPrivate } from "../../Api/axios"
import Header from "../../Components/Header/header"
import NewPost from "../../Components/NewPost/newpost"
import Post from "../../Components/Post/post"
import { goToLogin } from "../../Routes/coordinator"
import { useNavigate } from "react-router-dom"
import { IPost, PostProps } from "../../Interfaces/interfaces"


const PostsListPage = () => {

  const [postsList, setPostsList] = useState<IPost[]>([])
  const navigate = useNavigate() 

  // buscar lista de posts
  const getPosts = async () => {
    try {
      const response = await axiosPrivate.get('/posts/postslist', { withCredentials: true });
      const posts = response.data.posts
      setPostsList(posts)
    } catch (error) {
      console.log(error)
      goToLogin(navigate)
    }
  }

  // atualizar lista de posts ao deletar post
  const handlePostDeleted = (deletedPostID: string) => {
    const newPostsList = [...postsList].filter((post) => post.post_id !== deletedPostID);
    setPostsList(newPostsList);
  };

  // renderizar lista de posts
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
    return <Post key={post.post_id} {...postProps} />;
  })

  // atualizar lista de posts ao criar novo post
  const handlePostCreated = (newPost: IPost) => {
    setPostsList([...postsList, newPost]);
  };

  // buscar lista de posts ao montar o componente
  useEffect(() => {
    getPosts()
  }, [])

  return (
    <>
      <Header menu_text="Logout" cancelButtonVisibility="hidden" />
      <NewPost objective="Postar" placeholder="Escreva seu post..." onPostCreated={handlePostCreated} />
      {postsListJSX}
    </>
  )
}

export default PostsListPage