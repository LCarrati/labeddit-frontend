export const BASE_URL = 'https://vps72.heliohost.us/labeddit-backend/'

// validar input de usuário:
// 1) ^ significa início, primeiro caractere deve ser uma letra minúscula ou maiúscula
// 2) segundo caractere em diante pode ser letra minúscula, maiúscula ou números (de 0 a 9)
// 3) precisa ter no mínimo 3 caracteres e no máximo 24 ({2,23} é para validar o último bloco,
// então temos 1 caractere do primeiro bloco + 2 a 23 caracteres do segundo bloco)
// $ significa fim
export const NICKNAME_REGEX = /^[a-zA-Z][a-z0-9A-Z0-9]{2,23}$/;

// validar input de senha:
// 1) precisa ter de 8 a 24 caracteres
// 2) precisa incluir pelo menos 1 letra minuscula, 1 letra maiuscula, 1 numero e 1 caractere
// especial (! @ # $ %)
export const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const REGISTER_URL = "/users/signup/";
export const LOGIN_URL = '/users/login'
export const DELETE_COMMENT_URL = '/comment/deletecomment'
export const SET_COMMENTS_LIKES_URL = '/likedislike/commentlikedislike'
export const CHECK_COMMENTS_LIKES_URL = '/likedislike/checkcommentlikestatus'
export const LOGOUT_URL = '/users/logout'
export const CREATE_COMMENT_URL = '/comment/addcomment'
export const CREATE_POST_URL = '/posts/createpost'
export const CHECK_POSTS_LIKES_URL = '/likedislike/checklikestatus'
export const SET_POSTS_LIKES_URL = '/likedislike/likedislike'
export const DELETE_POST_URL = '/posts/deletepost'
export const POSTS_LIST_URL = '/posts/postslist'