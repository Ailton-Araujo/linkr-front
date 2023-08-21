import { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import AuthContext from "../../contexts/AuthContext";
import CreateLinkr from "./CreateLinkr";
import Linkr from "../../components/Linkr";
import Trending from "../../components/Trending";
import { getTimeLine } from "../../services/Api";

export default function TimeLine() {
  const { auth } = useContext(AuthContext);
  const [postList, setPostList] = useState([]);
  const [tryGetList, setTryGetList] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setTryGetList(true);
    function success(data) {
      if (data.length === 0) setMessage("There are no posts yet");
      setPostList(data);
      setTryGetList(false);
    }
    function failure(error) {
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
      setMessage(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
      setTryGetList(false);
    }
    getTimeLine(auth?.token, success, failure);
  }, []);

  return (
    <TimeLineStyled>
      <PostList>
        <h1>timeline</h1>
        <CreateLinkr token={auth?.token} setPostList={setPostList} />
        {tryGetList ? (
          <h2 data-test="message">Loading</h2>
        ) : postList.length === 0 ? (
          <h2 data-test="message">{message}</h2>
        ) : (
          postList.map((post) => (
            <Linkr key={post.id} post={post} setPostList={setPostList} />
          ))
        )}
      </PostList>
      <Trending />
    </TimeLineStyled>
  );
}

const TimeLineStyled = styled.main`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: start;
  gap: 15px;
  margin: 30px auto 15px;
  @media (max-width: 800px) {
    width: 90%;
    margin: 45px auto 15px;
  }
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const PostList = styled.section`
  width: 60%;
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
    align-self: flex-start;
  }
  h2 {
    margin-top: 60px;
    color: #fff;
    font-family: "Oswald", sans-serif;
    font-size: 26px;
    font-weight: 700;
  }
  @media (max-width: 800px) {
    width: 90%;
    margin: auto;
    h1 {
      padding-left: 15px;
    }
  }
  @media (max-width: 500px) {
    width: 100%;
    article {
      border-radius: 0px;
    }
  }
`;

export { TimeLineStyled, PostList };
