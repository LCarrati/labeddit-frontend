import { NavigateFunction } from "react-router-dom"

export const goToLogin = (navigate: NavigateFunction) => {
  navigate('/login')
}

export const goToSignUp = (navigate: NavigateFunction) => {
  navigate('/signup')
}

export const goToPostsList = (navigate: NavigateFunction) => {
  navigate('/')
}

export const goToPostDetail = (post_id: string, navigate: NavigateFunction) => {
  navigate(`/postdetail/${post_id}`)
}

// export const goToMyProfile = (navigate: NavigateFunction) => {
//   navigate(`/myprofile`)
// }

// export const goToUserDetail = (nickname: string, navigate: NavigateFunction) => {
//   navigate(`/user/${nickname}`)
// }

// export const goToError = (navigate: NavigateFunction) => {
//   navigate('*')
// }
