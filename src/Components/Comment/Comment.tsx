import { Author, Container, InteractionsContainer, Message, Votes } from "./styles"
import arrow_up_icon from "../../assets/arrow_up_icon.png"
import arrow_down_icon from "../../assets/arrow_down_icon.png"
import { axiosPrivate } from "../../Api/axios";
import { useEffect, useState } from "react";
import arrow_up_icon_filled from "../../assets/arrow-up-filled.png"
import arrow_down_icon_filled from "../../assets/arrow-down-filled.png"
import useTokenFromCookie from "../Hooks/useTokenFromCookie";
import trashCan from '../../assets/icons8-full-trash-50.png';
import trashCanHover from '../../assets/icons8-full-trash-50-hover.png';
import { CommentProps } from "../../Interfaces/interfaces";
import { CHECK_COMMENTS_LIKES_URL, DELETE_COMMENT_URL, SET_COMMENTS_LIKES_URL } from "../../env";

const Comment: React.FC<CommentProps> = ({ comment_id, post_id, comment, likes, dislikes, creator, onDeleteComment }) => {

  const [commentLikes, setCommentLikes] = useState(likes);
  const [commentDislikes, setCommentDislikes] = useState(dislikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisLiked, setIsDisLiked] = useState(false);
  const [isHovered, setTrashIsHovered] = useState(false);

  // receber o nickname através do cookie
  const { nickname } = useTokenFromCookie();

  // buscar a quantidade de likes e dislikes do comentário
  const getLikeStatus = async () => {
    try {
      const response = await axiosPrivate.post(CHECK_COMMENTS_LIKES_URL, { comment_id });
      if (response.status === 200) {
        if (response.data.like === 1) {
          setIsLiked(true);
        } else if (response.data.like === -1) {
          setIsDisLiked(true);
        } else {
          setIsLiked(false);
          setIsDisLiked(false);
        }
      } else {
        console.log('Erro ao checar os likes');
      }
    } catch (error) {
      console.log(error);
    }
  }

  // buscar a quantidade de likes e dislikes do comentário ao montar o componente
  useEffect(() => {
    getLikeStatus()
  }, [])

  // lógica do like (upvote)
  const handleUpvote = async () => {
    try {
      const response = await axiosPrivate.post(SET_COMMENTS_LIKES_URL, { comment_id, likeDislike: 1 });
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

  // lógica do dislike (downvote)
  const handleDownvote = async () => {
    try {
      const response = await axiosPrivate.post(SET_COMMENTS_LIKES_URL, { comment_id, likeDislike: 0 });
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

  // deletar comentário
  const handleDeleteComment = async () => {
    try {
      const response = await axiosPrivate.delete(DELETE_COMMENT_URL, { data: { comment_id, post_id } });
      if (response.status === 200) {
        onDeleteComment(comment_id)
      } else {
        console.log('Erro ao deletar comentário');
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
          <img src={isLiked ? arrow_up_icon_filled : arrow_up_icon} onClick={handleUpvote} alt="upvote" />
          <p>{commentLikes - commentDislikes}</p>
          <img src={isDisLiked ? arrow_down_icon_filled : arrow_down_icon} onClick={handleDownvote} alt="upvote" />
        </Votes>
      </InteractionsContainer>
    </Container>

  )
}

export default Comment