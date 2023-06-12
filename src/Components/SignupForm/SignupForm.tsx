import { useEffect, useRef, useState } from "react";
import { ButtonLogin, CheckboxContainer, CheckboxInput, CheckboxLabel, FormContainer, InputField } from "./styles";
import axios from "../../Api/axios";
import { useNavigate } from "react-router-dom";
import {
    faCheck,
    faTimes,
    faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { goToLogin } from "../../Routes/coordinator";

// validar input de usuário:
// 1) ^ significa início, primeiro caractere deve ser uma letra minúscula ou maiúscula
// 2) segundo caractere em diante pode ser letra minúscula, maiúscula ou números (de 0 a 9)
// 3) precisa ter no mínimo 3 caracteres e no máximo 24 ({2,23} é para validar o último bloco,
// então temos 1 caractere do primeiro bloco + 2 a 23 caracteres do segundo bloco)
// $ significa fim
const NICKNAME_REGEX = /^[a-zA-Z][a-z0-9A-Z0-9]{2,23}$/;

// validar input de senha:
// 1) precisa ter de 8 a 24 caracteres
// 2) precisa incluir pelo menos 1 letra minuscula, 1 letra maiuscula, 1 numero e 1 caractere
// especial (! @ # $ %)
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const REGISTER_URL = "/users/signup/";


const SignupForm = () => {

    const nicknameRef = useRef<HTMLInputElement>(null);
    const errorRef = useRef<HTMLParagraphElement>(null);
    const emailRef = useRef<HTMLInputElement>(null)

    const navigate = useNavigate();
    // const location = useLocation();
    // const from = location.state?.from?.pathname || "/";

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
    const [passwordFocus, setPasswordFocus] = useState(false);

    // para o campo de repetir a senha
    // const [matchPassword, setMatchPassword] = useState("");
    // const [validMatch, setValidMatch] = useState(false);
    // const [matchFocus, setMatchFocus] = useState(false);

    // para o tooltip (eu acho)!!!!!
    const [errorMsg, setErrorMsg] = useState("");
    // const [success, setSuccess] = useState(false);

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
    // se o input for válido e for a senha correta, atualizar o estado match
    useEffect(() => {
        const result = PWD_REGEX.test(password);
        setValidPassword(result);
        // const match = password === matchPassword;
        // setValidMatch(match);
    }, [password]);
    // }, [password, matchPassword]);

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
    // após ser exibida uma msg de erro, o usuário começará a digitar novamente naquele campo, para corrigir a informação, nesse caso vamos limpar a mensagem de erro
    useEffect(() => {
        setErrorMsg("");
    }, [nickname, email, password]);
    // }, [nickname, email, password, matchPassword]);

    // validar o input do campo user com REGEX e salvar no estado validName
    useEffect(() => {
        const result = NICKNAME_REGEX.test(nickname);
        setValidNickname(result);
    }, [nickname]);

    // validar o input do campo email com REGEX e salvar no estado validEmail
    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email]);

    // validar o input do campo password com REGEX e salvar no estado validPwd, se o input for válido e for a senha correta, atualizar o estado match
    // useEffect(() => {
    //     const result = PWD_REGEX.test(password);
    //     setValidPassword(result);
    //     const match = password === matchPassword;
    //     setValidMatch(match);
    // }, [password, matchPassword]);

    const handleSignup = async () => {
        // se não tiver dados nos inputs mas o botão for habilitado por um JS Hack simples (tipo mudar o botão pra enable via devTools) então nada deve ser enviado no submit

     
        const v1 = EMAIL_REGEX.test(email);
        const v2 = PWD_REGEX.test(password);
        if (!v1 || !v2) {
            console.log(email, password)
            setErrorMsg("Entrada inválida");
            return;
        }

        try {
            await axios.post(
                REGISTER_URL,
                JSON.stringify({
                    nickname: nickname,
                    email: email,
                    password: password
                }),
            );

            // navigate(from, { replace: true });
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
                // aria-invalid={validEmail ? "true" : "false"}
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
                    //    !validEmail ? "instructions" : "offscreen"
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