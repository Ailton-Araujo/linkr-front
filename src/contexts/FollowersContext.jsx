import { createContext, useState, useEffect, useContext } from "react";
import AuthContext from "./AuthContext";
import { getUser } from "../services/Api";

const FollowersContext = createContext();

export function FollowersProvider({ children }) {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    function success(data) {
      if (data.rowCount === 0) {
        setTryGetList(false);
        setLoadMorePosts(false);
        return setMessage(
          "You don't follow anyone yet. Search for new friends!"
        );
      }
      getTimeLine(auth?.token, success, failure);
    }

    function failureGetFollows() {
      setMessage("An error occured while trying to fetch your friend's posts");
      setLoadMorePosts(false);
    }

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
    <FollowersContext.Provider value={{ followers }}>
      {children}
    </FollowersContext.Provider>
  );
}

export default FollowersContext;
