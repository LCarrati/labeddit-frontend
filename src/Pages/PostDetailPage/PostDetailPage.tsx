import Header from "../../Components/Header/header"
import NewPost from "../../Components/NewPost/newpost"
import Post from "../../Components/Post/post"


const PostDetailPage = () => {
  return (
    <>
    <Header menu_text="Logout" cancelButtonVisibility="visible"/>
    <Post/>
    <NewPost objective="Responder" placeholder="Adicionar comentário"/>
    <Post/>
    <Post/>
    <Post/>
    </>
  )
}

export default PostDetailPage