import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import Linkr from "./TimeLine/LInkr";
import TopMenu from "../components/TopMenu/TopMenu";
import Trending from "../components/Trending";

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
    <>
      <TopMenu />
      <SCContainer>
        <SCTitle data-test="hashtag-title"># {hashtag}</SCTitle>
        <div>
          <SCContent>
            {loading ? (
              <SCLoading>Loading...</SCLoading>
            ) : (
              posts.map((post) => <Linkr key={post.post.id} dataPost={post} />)
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
    </>
  );
}

const SCContainer = styled.div`
  font-family: Oswald;
  width: 945px;
  background: #333333;
  height: auto;
  color: #ffffff;
  margin: auto;
  padding-top: 125px;
  padding-bottom: 125px;

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
  width: 360px;
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

const SCLoading = styled.div`
  margin-top: 60px;
  color: #fff;
  font-family: "Oswald", sans-serif;
  font-size: 26px;
  font-weight: 700;
`;
