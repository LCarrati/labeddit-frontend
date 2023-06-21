import { ReactNode } from "react";

export interface IComment {
    comment_id: string;
    post_id: string;
    content: string;
    likes: number;
    dislikes: number;
    comment: string;
    nickname: string;
}

export interface CommentProps {
    comment_id: string;
    post_id: string;
    content: string;
    likes: number;
    dislikes: number;
    comment: string;
    creator: string;
    onDeleteComment: (deletedCommentID: string) => void;
}

export interface PostProps {
    post_id: string;
    content: string;
    likes: number;
    dislikes: number;
    comments: number;
    creator: string;
    onDeletePost: (deletedPostID: string) => void;
}

export interface IPost {
    post_id: string;
    content: string;
    likes: number;
    dislikes: number;
    comments: number;
    nickname: string;
}

export interface AuthContextData {
    token: string | null;
    nickname: string | null;
    role: string | null;
    setNickname: (nickname: string | null) => void;
    setRole: (role: string | null) => void;
    setToken: (token: string | null) => void;
}

export interface AuthProviderProps {
    children?: ReactNode;
}

export interface NewPostProps {
    objective: string;
    placeholder?: string;
    onPostCreated: (newPost: any) => void;
};

export interface NewCommentProps {
    objective: string;
    placeholder?: string;
    onCommentCreated: (newComment: any) => void;
    post_id: string;
};

export interface HeaderProps {
    menu_text: string;
    cancelButtonVisibility: 'visible' | 'hidden';
    cancelButtonFunction?: 'goToLogin' | 'goHome';
  };