import { useEffect, useRef, useState } from "react";
import { ButtonLogin, CheckboxContainer, CheckboxInput, CheckboxLabel, FormContainer, InputField } from "./styles";
import { axiosPublic } from "../../Api/axios";
import { useNavigate } from "react-router-dom";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { goToLogin } from "../../Routes/coordinator";
import { NICKNAME_REGEX, EMAIL_REGEX, PWD_REGEX, REGISTER_URL } from "../../env";

const SignupForm = () => {

  const nicknameRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const emailRef = useRef<HTMLInputElement>(null)

  const navigate = useNavigate();

  // para o campo apelido
  const [nickname, setNickname] = useState('');
  const [validNickname, setValidNickname] = useState(false);
  const [nicknameFocus, setNicknameFocus] = useState(false); //verifica se o foco está neste campo

  // para o campo email
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false); //verifica se o foco está neste campo

  // para o campo senha
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false); //verifica se o foco está neste campo

  // para o campo de repetir a senha
  // const [matchPassword, setMatchPassword] = useState("");
  // const [validMatch, setValidMatch] = useState(false);
  // const [matchFocus, setMatchFocus] = useState(false);

  // para a mensagem de erro
  const [errorMsg, setErrorMsg] = useState("");

  // para a checkbox
  const [isChecked, setIsChecked] = useState(false);

  // validar o input do campo nickname com REGEX e salvar no estado validNickname
  useEffect(() => {
    const result = NICKNAME_REGEX.test(nickname);
    setValidNickname(result);
  }, [nickname]);

  // validar o input do campo email com REGEX e salvar no estado validEmail
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  // validar o input do campo password com REGEX e salvar no estado validPassword
  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
  }, [password]);

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // QoL functions
  // após ser exibida uma msg de erro, o usuário começará a digitar novamente naquele campo para corrigir a informação, nesse caso vamos limpar a mensagem de erro
  useEffect(() => {
    setErrorMsg("");
  }, [nickname, email, password]);

  // validar o input do campo user com REGEX e salvar no estado validNickname
  useEffect(() => {
    const result = NICKNAME_REGEX.test(nickname);
    setValidNickname(result);
  }, [nickname]);

  // validar o input do campo email com REGEX e salvar no estado validEmail
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  const handleSignup = async () => {
    // se não tiver dados nos inputs mas o botão for habilitado por um JS Hack simples (tipo mudar o botão pra enable via devTools) então nada deve ser enviado no submit
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrorMsg("Entrada inválida");
      return;
    } // fim do código de proteção do botão

    try {
      await axiosPublic.post(
        REGISTER_URL,
        JSON.stringify({
          nickname: nickname,
          email: email,
          password: password
        }),
      );
      goToLogin(navigate)
    } catch (error: any) {
      //se nao tiver erro mas tb não receber uma response, ou seja, nenhuma resposta
      if (!error?.response) {
        setErrorMsg("Sem resposta do servidor");
        //se tiver erro.response e tambem o status for 409 (conflict)
      } else if (error.response?.status === 409) {
        setErrorMsg("Nome de usuário não disponível");
      } else {
        console.log(error);
        setErrorMsg("Registro falhou, tente novamente");
      }

      // muda o foco para o campo com erro
      if (errorRef && errorRef.current) {
        errorRef.current.focus();
      }
    }
    // if (isChecked) {
    //     // Lógica de criação de conta aqui
    //   } else {
    //     // Exibir mensagem de erro ou fazer algo quando os termos e condições não forem aceitos
    //   }
  };

  return (
    <FormContainer>
      {/* se errMsg existir, a classe será errmsg, senão será offscreen */}
      {/* usar a referência errRef e mostrar a mensagem de erro */}
      <p ref={errorRef} className={errorMsg ? "errmsg" : "offscreen"}>
        {errorMsg}
      </p>

      <InputField
        type="text"
        placeholder="Apelido"
        value={nickname}
        onChange={handleNicknameChange}
        ref={nicknameRef}
        required
        onFocus={() => setNicknameFocus(true)}
        onBlur={() => setNicknameFocus(false)}
        aria-invalid={validNickname ? "false" : "true"}
        aria-describedby="uidnote"
      />
      <div className="instructionPopUp">
        <span className={validNickname ? "valid" : "hide"}>
          <FontAwesomeIcon icon={faCheck} />
        </span>
        <span className={validNickname || !nickname ? "hide" : "invalid"}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
        {/* aria-describedby chama uma tooltip, definida no parágrafo abaixo */}
        <p
          id="uinote"
          className={
            nicknameFocus && nickname && !validNickname ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          3 a 24 caracteres.
        </p>
      </div>


      <InputField
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={handleEmailChange}
        ref={emailRef}
        required
        onFocus={() => setEmailFocus(true)}
        onBlur={() => setEmailFocus(false)}
        aria-invalid={validEmail ? "false" : "true"}
        aria-describedby="uidnote"
      />
      <div className="instructionPopUp">
        <span className={validEmail ? "valid" : "hide"}>
          <FontAwesomeIcon icon={faCheck} />
        </span>
        <span className={validEmail || !email ? "hide" : "invalid"}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
        {/* aria-describedby chama uma tooltip, definida no parágrafo abaixo */}
        <p
          id="uinote"
          className={
            emailFocus && email && !validEmail ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Informe um e-mail válido
        </p>
      </div>

      <InputField
        type="password"
        placeholder="Senha"
        value={password}
        onChange={handlePasswordChange}
        required
        onFocus={() => setPasswordFocus(true)}
        onBlur={() => setPasswordFocus(false)}
        aria-invalid={validPassword ? "false" : "true"}
        aria-describedby="pwdnote"
      />
      <div className="instructionPopUp">
        <span className={validPassword ? "valid" : "hide"}>
          <FontAwesomeIcon icon={faCheck} />
        </span>
        <span className={validPassword || !password ? "hide" : "invalid"}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
        {/* aria-describedby chama uma tooltip, definida no parágrafo abaixo */}
        <p
          id="uinote"
          className={passwordFocus && !validPassword ? "instructions" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          8 a 24 caracteres.
          <br />
          Precisa incluir pelo menos
          <br />
          1 letra maíuscula
          <br />
          1 letra minúscula
          <br />
          1 número
          <br />1 caractere especial (! @ # $ %)
        </p>
      </div>

      <CheckboxContainer>
        <p>Ao continuar, você concorda com o nosso Contrato de usuário e nossa Política de Privacidade</p>
        <CheckboxLabel>
          <CheckboxInput
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          Eu concordo em receber emails sobre coisas legais no Labeddit
        </CheckboxLabel>
      </CheckboxContainer>
      <ButtonLogin onClick={handleSignup}>Cadastrar</ButtonLogin>
    </FormContainer>
  )
}

export default SignupForm