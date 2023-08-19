import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "../../contexts/AuthContext";

import CreateLinkr from "./CreateLinkr";
import Linkr from "./LInkr";
import { getTimeLine } from "../../services/Api";

export default function TimeLine() {
  const { auth } = useContext(AuthContext);
  const [postList, setPostList] = useState([]);
  const [tryGetList, setTryGetList] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth || !auth?.token) {
      navigate("/");
    }
    setTryGetList(true);

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
    getTimeLine(auth?.token, success, failure);
  }, [auth]);

  return (
    <TimeLineStyled>
      <h1>timeline</h1>
      <CreateLinkr token={auth?.token} setPostList={setPostList} />
      {tryGetList ? (
        <h2 data-test="message">Loading</h2>
      ) : postList.length === 0 ? (
        <h2 data-test="message">{message}</h2>
      ) : (
        postList.map((post) => <Linkr key={post.post.id} dataPost={post} />)
      )}
    </TimeLineStyled>
  );
}

export const TimeLineStyled = styled.main`
  margin-top: 30px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  h1 {
    margin-top: 100px;
    margin-bottom: 45px;
    color: #fff;
    font-family: "Oswald", sans-serif;
    font-size: 43px;
    font-weight: 700;
  }
  h2 {
    margin-top: 60px;
    color: #fff;
    font-family: "Oswald", sans-serif;
    font-size: 26px;
    font-weight: 700;
  }
  @media (max-width: 800px) {
    margin-top: 60px;
  }
`;
