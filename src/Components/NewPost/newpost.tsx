import { BottonLine, Container, NewPostButton, TextField } from "./styles"

type Props = {
    objective: string;
    placeholder?: string;
  };
const NewPost: React.FC<Props> = ({objective, placeholder}) => {

  return (
    <Container>
        <TextField placeholder={placeholder || "Postar"}/>
        <NewPostButton>{objective}</NewPostButton>
        <BottonLine />
    </Container>

  )
}

export default NewPost