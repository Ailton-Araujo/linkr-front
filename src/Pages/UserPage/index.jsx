import { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import Linkr from "../../components/Linkr";
import { getUserPosts, getUsername } from "../../services/Api";
import { TimeLineStyled } from "../TimeLine";

export default function UserPage() {
  const { auth } = useContext(AuthContext);
  const [postList, setPostList] = useState([]);
  const [tryGetList, setTryGetList] = useState(false);
  const [loadingName, setLoadingName] = useState(false);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setTryGetList(true);
    setLoadingName(true);
    getUsername(id, auth.token, successUsername, failure);
    function success(data) {
      if (data.length === 0) setMessage("There are no posts yet");
      setPostList(data);
      setTryGetList(false);
    }
    function failure(error) {
      setMessage(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
      setTryGetList(false);
    }
    function successUsername(data) {
      setUsername(data);
      setLoadingName(false);
    }
    function failureUsername(data) {
      setUsername("");
      setLoadingName(false);
    }
    getUserPosts(id, auth.token, success, failureUsername);
  }, []);

  return (
    <TimeLineStyled>
      <h1>{loadingName ? "" : `${username}'s posts`}</h1>
      {tryGetList ? (
        <h2>Loading</h2>
      ) : postList.length === 0 ? (
        <h2>{message}</h2>
      ) : (
        postList.map((post) => <Linkr key={post.post.id} dataPost={post} />)
      )}
    </TimeLineStyled>
  );
}
