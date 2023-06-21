import { useState } from "react";
import { BottonLine, Container, NewPostButton, TextField } from "./styles"
import { axiosPrivate } from "../../Api/axios";
import { NewCommentProps } from "../../Interfaces/interfaces";
import { CREATE_COMMENT_URL } from "../../env";

const NewComment: React.FC<NewCommentProps> = ({ objective, placeholder, onCommentCreated, post_id }) => {

  const [textFieldValue, setTextFieldValue] = useState('');

  // lógica do botão de criar comentário
  const handleNewComment = async () => {
    try {
      const response = await axiosPrivate.post(CREATE_COMMENT_URL, {
        content: textFieldValue,
        post_id: post_id
      })

      const newComment = {
        key: response.data.comment_id,
        comment_id: response.data.comment_id,
        post_id: response.data.post_id,
        comment: response.data.comment,
        likes: 0,
        dislikes: 0,
        nickname: response.data.nickname
      }

      onCommentCreated(newComment); // essa função veio como props
      setTextFieldValue('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <TextField placeholder={placeholder || "Postar"} value={textFieldValue}
        onChange={(e) => setTextFieldValue(e.target.value)} />
      <NewPostButton onClick={handleNewComment}>{objective}</NewPostButton>
      <BottonLine />
    </Container>
  )
}

export default NewComment