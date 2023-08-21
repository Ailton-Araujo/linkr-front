import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import Linkr from "../../components/Linkr";
import Trending from "../../components/Trending";

export default function HashtagPage() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { token } = JSON.parse(localStorage.getItem("auth"));
  const { hashtag } = useParams();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${apiUrl}/hashtag/${hashtag}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data: arrayPost }) => {
        setPosts(arrayPost);
        setError(false);
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  }, [hashtag]);

  return (
    <SCContainer>
      <SCTitle data-test="hashtag-title"># {hashtag}</SCTitle>
      <div>
        <SCContent>
          {loading ? (
            <SCLoading>Loading...</SCLoading>
          ) : (
            posts.map((post) => <Linkr key={post.id} post={post} />)
          )}

          {error && (
            <SCErrorMessage>
              There was an error loading the posts!
            </SCErrorMessage>
          )}
        </SCContent>
        <Trending />
      </div>
    </SCContainer>
  );
}

const SCContainer = styled.div`
  font-family: "Oswald", sans-serif;
  width: 80%;
  background: #333333;
  color: #ffffff;
  margin: 30px auto 15px;
  > div {
    width: 100%;
    display: flex;
    gap: 15px;
    align-items: start;
    justify-content: center;
    div {
      margin-top: 0px;
    }
  }
  @media (max-width: 800px) {
    width: 90%;
    margin: 0px auto 15px;
  }
  @media (max-width: 520px) {
    width: 100%;
  }
`;

const SCContent = styled.div`
  width: 60%;
  height: auto;
  @media (max-width: 800px) {
    width: 90%;
    margin: auto;
  }
  @media (max-width: 520px) {
    width: 100%;
    article {
      border-radius: 0px;
    }
  }
`;

const SCTitle = styled.h1`
  margin-top: 130px;
  margin-bottom: 45px;
  color: #fff;
  font-size: 43px;
  font-weight: 700;
  @media (max-width: 800px) {
    width: 90%;
    margin: 145px auto 45px;
    padding-left: 15px;
  }
`;

const SCErrorMessage = styled.div`
  color: #d8334a;
  font-size: 20px;
  font-weight: 400;
`;

const SCLoading = styled.div`
  margin-top: 60px;
  color: #fff;
  font-family: "Oswald", sans-serif;
  font-size: 26px;
  font-weight: 700;
`;
