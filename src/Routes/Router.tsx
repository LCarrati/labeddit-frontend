import { BrowserRouter, Routes, Route } from "react-router-dom"
import PostsListPage from "../Pages/PostsListPage/PostsListPage"
import LoginPage from "../Pages/LoginPage/LoginPage"
import SignupPage from "../Pages/SignupPage/SignupPage"
import PostDetailPage from "../Pages/PostDetailPage/PostDetailPage"

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<PostsListPage/>} />
                <Route path='login' element={<LoginPage/>} />
                <Route path='signup' element={<SignupPage/>} />
                <Route path='postdetail' element={<PostDetailPage/>} />
                <Route path='postdetail/:post_id' element={<PostDetailPage/>} />
                {/* <Route path='myprofile' element={<ProfilePage />} />
                <Route path='user/:nickname' element={<UserDetailPage />} />
                <Route path='*' element={<ErrorPage/>} /> */}
            </Routes>
        </BrowserRouter>
    )
}

export default Router