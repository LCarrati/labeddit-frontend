import { CancelButton, Container, ElementDiv, MenuText, MiniLogo } from "./styles"
import mini_logo from "../../assets/mini_logo.png"
import cancel from "../../assets/cancel.png"
import { goToLogin, goToPostsList } from "../../Routes/coordinator";
import useTokenFromCookie from "../Hooks/useTokenFromCookie";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../Api/axios";

type Props = {
    menu_text: string;
    cancelButtonVisibility: 'visible' | 'hidden';
    cancelButtonFunction?: 'goToLogin' | 'goHome';
  };
  
  // const COOKIE_NAME = 'lctkn'
  
  const Header: React.FC<Props> = ({ menu_text, cancelButtonVisibility, cancelButtonFunction }) => {
      
    const navigate = useNavigate()
    const { setToken, setNickname } = useTokenFromCookie();
    const handleCancelButton = () => {
        cancelButtonFunction === 'goToLogin' ? goToLogin(navigate) : goToPostsList(navigate);
    }

    const handleMenuText = () => {
        menu_text === 'Entrar' ? goToLogin(navigate) : handleLogout();
    }

    const handleLogout = async () => {
        // logic to navitage to the login page and remove the cookie from the browser
        // to remove the cookie from the browser:
        // 
        setToken('');
        localStorage.removeItem("nickname");
        setNickname(null);
        const response = await axiosPrivate.get('/users/logout');
        console.log(response)
        goToLogin(navigate)
    }

    return (
      <Container>
        <ElementDiv>
            <CancelButton isVisible={cancelButtonVisibility} src={cancel} alt="cancel button" onClick={handleCancelButton} />
        </ElementDiv>
        <ElementDiv>
            <MiniLogo src={mini_logo} alt="mini logo" />
        </ElementDiv>
        <ElementDiv>
            <MenuText onClick={handleMenuText}>{menu_text}</MenuText>
        </ElementDiv>
      </Container>
    );
  };

export default Header