import { createContext, useState, useEffect, useContext } from "react";
import AuthContext from "./AuthContext";
import { getAnyFollower } from "../services/Api";

const FollowersContext = createContext();

export function FollowersProvider({ children }) {
  const [followers, setFollowers] = useState([]);
  const [followedIds, setFollowedIds] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    function success(data) {
      setFollowers(data.rows);
      setFollowedIds(data.rows.map((e) => e.followedId));
    }
    function failure(err) {
      setFollowers("error");
      console.log(err);
    }
    getAnyFollower(auth?.token, success, failure);
  }, []);
  console.log(followedIds);
  return (
    <FollowersContext.Provider
      value={{ followers, followedIds, setFollowedIds }}
    >
      {children}
    </FollowersContext.Provider>
  );
}

export default FollowersContext;
