import { useEffect, useState } from "react"
import { axiosPrivate } from "../../Api/axios"
import Header from "../../Components/Header/header"
import NewPost from "../../Components/NewPost/newpost"
import Post from "../../Components/Post/post"


const PostsListPage = () => {

    interface Post {
        post_id: number;
        content: string;
        likes: number;
        dislikes: number;
        comments: number;
        nickname: string;
      }
    const [postsList, setPostsList] = useState<Post[]>([])

    const getPosts = async () => {
        const response = await axiosPrivate.get('/posts/postslist', {withCredentials: true});
        const posts = response.data.posts
        setPostsList(posts)
    }

    interface PostProps {
        key: number;
        content: string;
        likes: number;
        dislikes: number;
        comments: number;
        creator: string;
      }
    const postsListJSX = postsList.map((post) => {
        const postProps: PostProps = {
            key: post.post_id,
            content: post.content,
            likes: post.likes,
            dislikes: post.dislikes,
            comments: post.comments,
            creator: post.nickname,
          };
          return <Post {...postProps} />;
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

    useEffect(() => {
        getPosts()
    },[])

  return (
    <>
    <Header menu_text="Logout" cancelButtonVisibility="hidden"/>
    <NewPost objective="Postar" placeholder="Escreva seu post..."/>
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