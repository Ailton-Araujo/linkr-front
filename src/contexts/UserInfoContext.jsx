import { createContext, useState, useEffect, useContext } from "react";
import AuthContext from "./AuthContext";
import { getUser } from "../services/Api";

const UserInfoContext = createContext();

export function UserInfoProvider({ children }) {
  const [userInfo, setUserInfo] = useState({
    image: "loading",
    username: "loading",
  });
  const { auth } = useContext(AuthContext);

  function userInfoSignOut() {
    setUserInfo({});
  }

  useEffect(() => {
    const token = auth?.token;
    function success(data) {
      setUserInfo({ ...data });
    }
    if (token) getUser(token, success);
  }, [auth]);

  return (
    <UserInfoContext.Provider value={{ userInfo, userInfoSignOut }}>
      {children}
    </UserInfoContext.Provider>
  );
}

export default UserInfoContext;
