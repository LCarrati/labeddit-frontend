import { useState } from "react";
import { BottonLine, Container, NewPostButton, TextField } from "./styles"
import { axiosPrivate } from "../../Api/axios";

type Props = {
    objective: string;
    placeholder?: string;
    onPostCreated: (newPost: any) => void;
  };
const NewPost: React.FC<Props> = ({objective, placeholder, onPostCreated}) => {

    const [textFieldValue, setTextFieldValue] = useState('');
    const handleNewPost = async () => {
        try {
            const response = await axiosPrivate.post('/posts/createpost', {
                content: textFieldValue
            })
            console.log(response.data)
            const newPost = {
                key: response.data.post_id,
                post_id: response.data.post_id,
                content: response.data.content,
                likes: 0,
                dislikes: 0,
                comments: 0,
                nickname: response.data.nickname
            }
            onPostCreated(newPost);
            setTextFieldValue('')
        } catch (error) {
            
        }
    }

  return (
    <Container>
        <TextField placeholder={placeholder || "Postar"} value={textFieldValue}
  onChange={(e) => setTextFieldValue(e.target.value)}/>
        <NewPostButton onClick={handleNewPost}>{objective}</NewPostButton>
        <BottonLine />
    </Container>

  )
}

export default NewPost