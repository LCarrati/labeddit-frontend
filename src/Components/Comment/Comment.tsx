import { Author,  Container, InteractionsContainer, Message, Votes } from "./styles"
import arrow_up_icon from "../../assets/arrow_up_icon.png"
import arrow_down_icon from "../../assets/arrow_down_icon.png"
import { axiosPrivate } from "../../Api/axios";
import { useEffect, useState } from "react";
import arrow_up_icon_filled from "../../assets/arrow_up_icon_filled.svg"
import arrow_down_icon_filled from "../../assets/arrow_down_icon_filled.svg"
import useTokenFromCookie from "../Hooks/useTokenFromCookie";
import trashCan from '../../assets/icons8-full-trash-50.png';
import trashCanHover from '../../assets/icons8-full-trash-50-hover.png';


interface CommentProps {
    comment_id: string;
    post_id: string;
    comment: string;
    likes: number;
    dislikes: number;
    creator: string;
    onDeleteComment: (deletedCommentID: string) => void;
  }

  
  const Comment: React.FC<CommentProps> = ({ comment_id, post_id, comment, likes, dislikes,  creator, onDeleteComment }) => {

    const [commentLikes, setCommentLikes] = useState(likes);
    const [commentDislikes, setCommentDislikes] = useState(dislikes);
    const [isLiked, setIsLiked] = useState(false);
    const [isDisLiked, setIsDisLiked] = useState(false);
    const [isHovered, setTrashIsHovered] = useState(false);

    const { nickname } = useTokenFromCookie();

    const getLikeStatus = async () => {
      try {
        const response = await axiosPrivate.post('/likedislike/checkcommentlikestatus', {comment_id});
        console.log(response.data)
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
        const response = await axiosPrivate.post('/likedislike/commentlikedislike', {comment_id, likeDislike: 1});
        if (response.status === 200) {
          setCommentLikes(response.data.likesdislikeoutput.likes);
          setCommentDislikes(response.data.likesdislikeoutput.dislikes);
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
        const response = await axiosPrivate.post('/likedislike/commentlikedislike', {comment_id, likeDislike: 0});
        if (response.status === 200) {
          setCommentLikes(response.data.likesdislikeoutput.likes);
          setCommentDislikes(response.data.likesdislikeoutput.dislikes);
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
    const handleDeleteComment = async () => {
      try {
        const response = await axiosPrivate.delete('/comment/deletecomment', { data: { comment_id, post_id } });
        if (response.status === 200) {
          console.log('cheguei aqui')
          onDeleteComment(comment_id)
        } else {
          console.log('Erro ao enviar o dislike');
        }
      } catch (error) {
          console.log(error)
      }    
    }
  return (

    <Container key={comment_id}>
        <Author>Enviado por: {creator}</Author>
        {nickname === creator ? (
        (
          <img
            className="trashCan"
            src={isHovered ? trashCanHover : trashCan}
            alt=""
            onMouseEnter={() => setTrashIsHovered(true)}
            onMouseLeave={() => setTrashIsHovered(false)}
            onClick={handleDeleteComment}
          />
        )
        ) : null}
        
        <Message>{comment}</Message>
        <InteractionsContainer>
            <Votes>
                <img src={isLiked ? arrow_up_icon_filled : arrow_up_icon} onClick={handleUpvote} alt="upvote"/>
                <p>{commentLikes - commentDislikes}</p>
                <img src={isDisLiked ? arrow_down_icon_filled : arrow_down_icon} onClick={handleDownvote} alt="upvote"/>
            </Votes>
        </InteractionsContainer>
    </Container>
    
  )
}

export default Comment