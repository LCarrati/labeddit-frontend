// import { createContext, useState } from "react";

// const GlobalContext = createContext({});

// export const TokenProvider = ({ children }: any) => {
//   const [token, setToken] = useState({});
//   // vamos checar se o usuário marcou a caixa "manter-se logado", se sim vamos salvar no localStorage essa informação
//   // se persist === false então toda a lógica do PersistLogin será desabilitada.
// //   const [persist, setPersist] = useState(
// //     JSON.parse(localStorage.getItem("persist")) || false
// //   );

//   return (
//     <GlobalContext.Provider value={{ token, setToken }}>
//       {children}
//     </GlobalContext.Provider>
//   );
// };

// export default GlobalContext;


import { createContext, useEffect, useState, ReactNode } from 'react';

interface AuthContextData {
  token: string | null;
  nickname: string | null;
  role: string | null;
  setNickname: (nickname: string | null) => void;
  setRole: (role: string | null) => void;
  setToken: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContextData>({
  token: null,
  nickname: null,
  role: null,
  setNickname: () => {},
  setRole: () => {},
  setToken: () => {},
});

// export function useAuth() {
//   return useContext(AuthContext);
// }

interface AuthProviderProps {
  children?: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const [role, setRole]= useState<string | null>(null);

  useEffect(() => {
    if (token === null) {
      const cookie = document.cookie;
      const cookieToken = cookie
        .split('; ')
        .find(row => row.startsWith('lctkn='))
        ?.split('=')[1];
  
      setToken(cookieToken || null);
    } else {
      console.log('já tem um token')
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, nickname, role, setNickname, setRole, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;