import { createContext, useState, useEffect, useContext } from "react";
import AuthContext from "./AuthContext";
import { getUser } from "../services/Api";

const UserInfoContext = createContext();

export function UserInfoProvider({ children }) {
  const [userInfo, setUserInfo] = useState({
    image: "loading",
    username: "loading",
  });
  const { auth, logoutAuth } = useContext(AuthContext);

  function userInfoSignOut() {
    setUserInfo({});
  }

  useEffect(() => {
    const token = auth?.token;

    function success(data) {
      setUserInfo({ ...data });
    }

    function failure(error) {
      if (error.response) {
        alert(error.response.data);
        logoutAuth();
      } else {
        console.log(error.message);
        // alert(error.message);
      }
    }
    if (token) getUser(token, success, failure);
  }, [auth]);

  return (
    <UserInfoContext.Provider value={{ userInfo, userInfoSignOut }}>
      {children}
    </UserInfoContext.Provider>
  );
}

export default UserInfoContext;
