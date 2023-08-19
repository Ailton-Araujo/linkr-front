import { createContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const persist = JSON.parse(localStorage.getItem("auth"));
  const [auth, setAuth] = useState(persist);

  function loginAuth(auth) {
    setAuth(auth);
    localStorage.setItem("auth", JSON.stringify(auth));
  }
  function logoutAuth() {
    localStorage.removeItem("auth");
    setAuth("");
  }

  return (
    <AuthContext.Provider value={{ auth, loginAuth, logoutAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
