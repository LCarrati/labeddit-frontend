import { Container, FormArea, LogoArea } from "./styles"
import logo from "../../assets/logo.png"
import LoginForm from "../../Components/LoginForm/LoginForm"


const LoginPage = () => {
  return (
    <Container>
        <LogoArea>
            <img src={logo} alt=""/>
            <p>O projeto de rede social da Labenu</p>
        </LogoArea>
        <FormArea>
            <LoginForm />
        </FormArea>
    </Container>
  )
}

export default LoginPage