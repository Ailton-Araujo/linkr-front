import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import Linkr from "./TimeLine/LInkr";

export default function HashtagPage() {
  const apiUrl = "http://localhost:5000";
  const jwt = localStorage.getItem("auth");
  const { hashtag } = useParams();

  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`${apiUrl}/hashtag/${hashtag}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then(({ data: arrayPost }) => {
        setPosts(arrayPost);
        setError(false);
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
  });

  return (
    <SCContainer>
      <SCTitle># {hashtag}</SCTitle>
      <div>
        <SCContent>
          {posts.map((post) => (
            <Linkr key={post.post.id} dataPost={post} />
          ))}

          {error && (
            <SCErrorMessage>
              There was an error loading the posts!
            </SCErrorMessage>
          )}
        </SCContent>
        <SCTrendingArea />
      </div>
    </SCContainer>
  );
}

const SCContainer = styled.div`
  font-family: Oswald;
  width: 100vw;
  background: #333333;
  height: auto;
  color: #ffffff;
  padding-left: 250px;
  padding-right: 250px;
  padding-top: 125px;

  > div {
    width: 100%;
    display: flex;
    gap: 25px;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
  }
`;

const SCContent = styled.div`
  width: 600px;
  height: auto;
`;

const SCTrendingArea = styled.div`
  width: 300px;
  height: auto;
`;

const SCTitle = styled.h1`
  color: #fff;
  font-size: 43px;
  font-weight: 700;
`;

const SCErrorMessage = styled.div`
  color: #d8334a;
  font-size: 20px;
  font-weight: 400;
`;
