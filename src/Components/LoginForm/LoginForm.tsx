import { useEffect, useState } from "react";
import { BottonLine, ButtonLogin, ButtonSignup, FormContainer, InputField } from "./styles";
import { goToPostsList, goToSignUp } from "../../Routes/coordinator";
import { axiosPrivate } from "../../Api/axios";
import useTokenFromCookie from "../Hooks/useTokenFromCookie";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL } from "../../env";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const { setNickname, setRole, setToken } = useTokenFromCookie();
  
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await axiosPrivate.post(
        LOGIN_URL,
        JSON.stringify({
          email,
          password
        })
      )
      setToken(response.data.token);
      setNickname(response.data.nickname);
      localStorage.setItem("nickname", response.data.nickname);
      setRole(response.data.role);
      goToPostsList(navigate)
    } catch (error: any) {
      console.log(error);
      if (!error?.response) {
        setErrorMsg("Sem resposta do servidor");
        //se tiver erro.response e tambem o status for 404 (não encontrado)
      } else if (error.response?.status === 404) {
        setErrorMsg("Usuário ou senha incorretos");
      } else {
        console.log(error);
        setErrorMsg("Login falhou, tente novamente");
      }
    }
  };

  const handleSignup = () => {
    goToSignUp(navigate);
  };

  useEffect(() => {
    setErrorMsg("");
  }, [email, password]);

  return (
    <FormContainer>
      <p className={errorMsg ? "errmsg" : "offscreen"}>
        {errorMsg}
      </p>
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