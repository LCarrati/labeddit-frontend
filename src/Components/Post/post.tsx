import { Author, CommentCount, Container, InteractionsContainer, Message, Votes } from "./styles"
import arrow_up_icon from "../../assets/arrow_up_icon.png"
import arrow_down_icon from "../../assets/arrow_down_icon.png"
import comments_icon from "../../assets/comments_icon.png"
import { axiosPrivate } from "../../Api/axios";
import { useEffect, useState } from "react";
import arrow_up_icon_filled from "../../assets/arrow_up_icon_filled.svg"
import arrow_down_icon_filled from "../../assets/arrow_down_icon_filled.svg"
import useTokenFromCookie from "../Hooks/useTokenFromCookie";
import trashCan from '../../assets/icons8-full-trash-50.png';
import trashCanHover from '../../assets/icons8-full-trash-50-hover.png';
import { goToPostDetail } from "../../Routes/coordinator";
import { useNavigate } from "react-router-dom";


interface PostProps {
    post_id: string;
    content: string;
    likes: number;
    dislikes: number;
    comments: number;
    creator: string;
    onDeletePost: (deletedPostID: string) => void;
  }

  
  const Post: React.FC<PostProps> = ({ post_id, content, likes, dislikes, comments, creator, onDeletePost }) => {

    const [postLikes, setPostLikes] = useState(likes);
    const [postDislikes, setPostDislikes] = useState(dislikes);
    const [isLiked, setIsLiked] = useState(false);
    const [isDisLiked, setIsDisLiked] = useState(false);
    const [isHovered, setTrashIsHovered] = useState(false);

    const navigate = useNavigate()

    const { nickname } = useTokenFromCookie();

    const getLikeStatus = async () => {
      try {
        const response = await axiosPrivate.post('/likedislike/checklikestatus', {post_id});
        console.log(response.status)
        if (response.status === 200) {
          if(response.data.like === 1) {
            setIsLiked(true);
          } else if (response.data.like === -1) {
            setIsDisLiked(true);
          } else {
            setIsLiked(false);
            setIsDisLiked(false);
          }
        } else {
          console.log('Erro ao enviar o like');
        }
      } catch (error) {

      }
    }
    useEffect(() => {
      getLikeStatus()
    }, [])
    

    const handleUpvote = async () => {
      try {
        const response = await axiosPrivate.post('/likedislike/likedislike', {post_id, likeDislike: 1});
        if (response.status === 200) {
          setPostLikes(response.data.likesdislikeoutput.likes);
          setPostDislikes(response.data.likesdislikeoutput.dislikes);
          setIsLiked(!isLiked);
          setIsDisLiked(false)
        } else {
          console.log('Erro ao enviar o like');
        }
      } catch (error) {
          console.log(error)
      }
    }
  
    const handleDownvote = async () => {
      try {
        const response = await axiosPrivate.post('/likedislike/likedislike', {post_id, likeDislike: 0});
        if (response.status === 200) {
          setPostLikes(response.data.likesdislikeoutput.likes);
          setPostDislikes(response.data.likesdislikeoutput.dislikes);
          setIsDisLiked(!isDisLiked);
          setIsLiked(false)
        } else {
          console.log('Erro ao enviar o dislike');
        }
      } catch (error) {
          console.log(error)
      }
    }

    // delete post
    const handleDeletePost = async () => {
      try {
        const response = await axiosPrivate.delete('/posts/deletepost', { data: { post_id } });
        if (response.status === 201) {
          onDeletePost(post_id)
        } else {
          console.log('Erro ao enviar o dislike');
        }
      } catch (error) {
          console.log(error)
      }    
    }

    const handleComments = () => {
      goToPostDetail(post_id, navigate)
    }
  return (

    <Container key={post_id}>
        <Author>Enviado por: {creator}</Author>
        {nickname === creator ? (
        (
          <img
            className="trashCan"
            src={isHovered ? trashCanHover : trashCan}
            alt=""
            onMouseEnter={() => setTrashIsHovered(true)}
            onMouseLeave={() => setTrashIsHovered(false)}
            onClick={handleDeletePost}
          />
        )
        ) : null}
        
        <Message>{content}</Message>
        <InteractionsContainer>
            <Votes>
                <img src={isLiked ? arrow_up_icon_filled : arrow_up_icon} onClick={handleUpvote} alt="upvote"/>
                <p>{postLikes - postDislikes}</p>
                <img src={isDisLiked ? arrow_down_icon_filled : arrow_down_icon} onClick={handleDownvote} alt="upvote"/>
            </Votes>
            <CommentCount onClick={handleComments}>
                <img src={comments_icon} alt="" />
                <p>{comments}</p>
            </CommentCount>
        </InteractionsContainer>
    </Container>
    
  )
}

export default Post