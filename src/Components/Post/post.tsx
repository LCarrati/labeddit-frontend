import { Author, CommentCount, Container, InteractionsContainer, Message, Votes } from "./styles"
import arrow_up_icon from "../../assets/arrow_up_icon.png"
import arrow_down_icon from "../../assets/arrow_down_icon.png"
import comments_icon from "../../assets/comments_icon.png"


interface PostProps {
    key: number;
    content: string;
    likes: number;
    dislikes: number;
    comments: number;
    creator: string;
  }

const Post: React.FC<PostProps> = ({ key, content, likes, dislikes, comments, creator }) => {
  return (

    <Container key={key}>
        <Author>{creator}</Author>
        <Message>{content}</Message>
        <InteractionsContainer>
            <Votes>
                <img src={arrow_up_icon} alt="upvote"/>
                <p>{likes - dislikes}</p>
                <img src={arrow_down_icon} alt="upvote"/>
            </Votes>
            <CommentCount>
                <img src={comments_icon} alt="" />
                <p>{comments}</p>
            </CommentCount>
        </InteractionsContainer>
    </Container>
    
  )
}

export default Post