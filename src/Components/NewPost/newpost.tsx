import { useState } from "react";
import { BottonLine, Container, NewPostButton, TextField } from "./styles"
import { axiosPrivate } from "../../Api/axios";
import { NewPostProps } from "../../Interfaces/interfaces";
import { CREATE_POST_URL } from "../../env";

const NewPost: React.FC<NewPostProps> = ({ objective, placeholder, onPostCreated }) => {

  const [textFieldValue, setTextFieldValue] = useState('');

  // lógica do botão de criar post
  const handleNewPost = async () => {
    try {
      const response = await axiosPrivate.post(CREATE_POST_URL, {
        content: textFieldValue
      })
      const newPost = {
        key: response.data.post_id,
        post_id: response.data.post_id,
        content: response.data.content,
        likes: 0,
        dislikes: 0,
        comments: 0,
        nickname: response.data.nickname
      }
      onPostCreated(newPost); // essa função veio como props
      setTextFieldValue('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <TextField placeholder={placeholder || "Postar"} value={textFieldValue}
        onChange={(e) => setTextFieldValue(e.target.value)} />
      <NewPostButton onClick={handleNewPost}>{objective}</NewPostButton>
      <BottonLine />
    </Container>
  )
}

export default NewPost