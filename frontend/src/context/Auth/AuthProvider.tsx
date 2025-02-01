import { FC, PropsWithChildren, useState } from "react";
import { AuthContext } from "./AuthContext.ts";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [username, setUserName] = useState<string | null>(
    localStorage.getItem("username")
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const login = (username:string, token:string) => {
    setUserName(username);
    setToken(token);
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);
  };
  return (  <AuthContext.Provider value={{ username, token, login }}>
    {children}
  </AuthContext.Provider>)

};

export default AuthProvider;