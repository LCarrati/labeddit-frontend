import Header from "../../Components/Header/header"
import SignupForm from "../../Components/SignupForm/SignupForm"
import { Container, TitleDiv } from "./styles"


const SignupPage = () => {
  return (
    <>
      <Header menu_text="Entrar" cancelButtonVisibility="hidden" cancelButtonFunction="goToLogin" />
      <Container>
        <TitleDiv>
          <h1>Olá, boas vindas ao LabEddit ;&#41;</h1>
        </TitleDiv>
        <SignupForm />
      </Container>
    </>

  )
}

export default SignupPage