import { CancelButton, Container, ElementDiv, MenuText, MiniLogo } from "./styles"
import mini_logo from "../../assets/mini_logo.png"
import cancel from "../../assets/cancel.png"
import { goToLogin, goToPostsList } from "../../Routes/coordinator";
import useTokenFromCookie from "../Hooks/useTokenFromCookie";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../Api/axios";
import { HeaderProps } from "../../Interfaces/interfaces";
import { LOGOUT_URL } from "../../env";


const Header: React.FC<HeaderProps> = ({ menu_text, cancelButtonVisibility, cancelButtonFunction }) => {

  const navigate = useNavigate()

  // buscar o token e o nickname no cookie
  const { setToken, setNickname } = useTokenFromCookie();

  // lógica condicional do botão de cancelar
  const handleCancelButton = () => {
    cancelButtonFunction === 'goToLogin' ? goToLogin(navigate) : goToPostsList(navigate);
  }

  // lógica condicional do botão de Menu
  const handleMenuText = () => {
    menu_text === 'Entrar' ? goToLogin(navigate) : handleLogout();
  }

  // lógica do botão de logout
  const handleLogout = async () => {
    setToken('');
    localStorage.removeItem("nickname");
    setNickname(null);
    await axiosPrivate.get(LOGOUT_URL);
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