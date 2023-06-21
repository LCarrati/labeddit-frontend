import { createContext, useState } from 'react';
import { AuthContextData, AuthProviderProps } from '../Interfaces/interfaces';

export const AuthContext = createContext<AuthContextData>({
  token: null,
  nickname: null,
  role: null,
  setNickname: () => { },
  setRole: () => { },
  setToken: () => { },
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string | null>(localStorage.getItem("nickname") || null);
  const [role, setRole] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ token, nickname, role, setNickname, setRole, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;