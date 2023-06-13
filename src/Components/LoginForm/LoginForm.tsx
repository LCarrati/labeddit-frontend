import { useState } from "react";
import { BottonLine, ButtonLogin, ButtonSignup, FormContainer, InputField } from "./styles";
import { goToPostsList, goToSignUp } from "../../Routes/coordinator";
import axios from "../../Api/axios";
import useTokenFromCookie from "../Hooks/useTokenFromCookie";
import { useNavigate } from "react-router-dom";

const LOGIN_URL = '/users/login'

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setNickname, setRole, setToken} = useTokenFromCookie();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
          LOGIN_URL, 
          JSON.stringify({
            email,
            password
          })
        )
        console.log(response.data)
        setToken(response.data.token);
        setNickname(response.data.nickname);
        localStorage.setItem("nickname", response.data.nickname);
        setRole(response.data.role);
        goToPostsList(navigate)
    } catch (error) {
      // console.log(error);
    //   if (!error?.response) {
    //     setErrorMsg("Sem resposta do servidor");
    //     //se tiver erro.response e tambem o status for 409 (conflict)
    // } else if (error.response?.status === 409) {
    //     setErrorMsg("Nome de usuário não disponível");
    // } else {
    //     console.log(error);
    //     setErrorMsg("Registro falhou, tente novamente");
    // }
    }
  };

  const handleSignup = () => {
    goToSignUp(navigate);
  };

  return (
    <FormContainer>
      <InputField
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={handleEmailChange}
      />
      <InputField
        type="password"
        placeholder="Senha"
        value={password}
        onChange={handlePasswordChange}
      />
      <ButtonLogin onClick={handleLogin}>Continuar</ButtonLogin>
      <BottonLine />
      <ButtonSignup onClick={handleSignup}>Crie uma conta!</ButtonSignup>
    </FormContainer>
  )
}

export default LoginForm