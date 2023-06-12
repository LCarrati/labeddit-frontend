import { CancelButton, Container, ElementDiv, MenuText, MiniLogo } from "./styles"
import mini_logo from "../../assets/mini_logo.png"
import cancel from "../../assets/cancel.png"
import { goToLogin, goToPostsList } from "../../Routes/coordinator";
import useTokenFromCookie from "../Hooks/useTokenFromCookie";
import { useNavigate } from "react-router-dom";

type Props = {
    menu_text: string;
    cancelButtonVisibility: 'visible' | 'hidden';
    cancelButtonFunction?: 'goToLogin' | 'goHome';
  };
  
  const COOKIE_NAME = 'lctkn'
  
  const Header: React.FC<Props> = ({ menu_text, cancelButtonVisibility, cancelButtonFunction }) => {
      
    const navigate = useNavigate()
    const { setToken } = useTokenFromCookie();
    const handleCancelButton = () => {
        cancelButtonFunction === 'goToLogin' ? goToLogin(navigate) : goToPostsList(navigate);
    }

    const handleMenuText = () => {
        menu_text === 'Entrar' ? goToLogin(navigate) : handleLogout();
    }

    const handleLogout = () => {
        console.log('merda')
        // logic to navitage to the login page and remove the cookie from the browser
        // to remove the cookie from the browser:
        // 
        setToken('');
        document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
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