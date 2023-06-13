import { useState } from "react";
import { BottonLine, Container, NewPostButton, TextField } from "./styles"
import { axiosPrivate } from "../../Api/axios";

type Props = {
    objective: string;
    placeholder?: string;
    onCommentCreated: (newComment: any) => void;
    post_id: string;
  };
const NewComment: React.FC<Props> = ({objective, placeholder, onCommentCreated, post_id}) => {

    const [textFieldValue, setTextFieldValue] = useState('');
    const handleNewComment = async () => {
        try {
            const response = await axiosPrivate.post('/comment/addcomment', {
                content: textFieldValue,
                post_id: post_id
            })
            console.log(response.data)
            const newComment = {
                key: response.data.comment_id,
                comment_id: response.data.comment_id,
                post_id: response.data.post_id,
                comment: response.data.comment,
                likes: 0,
                dislikes: 0,
                nickname: response.data.nickname

        
            }
            onCommentCreated(newComment);
            setTextFieldValue('')
        } catch (error) {
            
        }
    }

  return (
    <Container>
        <TextField placeholder={placeholder || "Postar"} value={textFieldValue}
  onChange={(e) => setTextFieldValue(e.target.value)}/>
        <NewPostButton onClick={handleNewComment}>{objective}</NewPostButton>
        <BottonLine />
    </Container>

  )
}

export default NewComment