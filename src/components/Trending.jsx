import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useWindowSize } from "@uidotdev/usehooks";
import axios from "axios";

export default function Trending() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { token } = JSON.parse(localStorage.getItem("auth"));
  const size = useWindowSize();
  const [trending, setTrending] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`${apiUrl}/trending`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data: arrayTrending }) => {
        setTrending(arrayTrending);
        setError(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, []);

  return (
    <>
      {size.width <= 800 ? (
        ""
      ) : (
        <SCContainer data-test="trending">
          <h1>trending</h1>
          <hr />

          <div>
            {trending.map(({ hashtag }) => (
              <Link to={`/hashtag/${hashtag}`}>
                <SCHashtag data-test="hashtag">#{hashtag}</SCHashtag>
              </Link>
            ))}

            {error && <div>error when looking for trending</div>}
          </div>
        </SCContainer>
      )}
    </>
  );
}

const SCContainer = styled.div`
  width: 300px;
  height: auto;
  background: #171717;
  border-radius: 16px;
  padding-top: 15px;
  padding-bottom: 30px;
  margin-top: 188px;
  h1 {
    margin-left: 16px;
    font-size: 27px;
    font-weight: 700;
    color: #fff;
    font-family: "Oswald", sans-serif;
    font-size: 27px;
    font-weight: 700;
  }

  hr {
    width: 100%;
    height: 1px;
    border: none;
    background: #484848;
    margin-top: 15px;
    margin-bottom: 15px;
  }

  > div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    margin-right: 16px;
    gap: 12px;
    font-family: "Lato", sans-serif;
    letter-spacing: 0.95px;
  }
`;

const SCHashtag = styled.span`
  cursor: pointer;
  text-decoration: none;
  color: #fff;
  font-family: "Lato", sans-serif;
  font-size: 19px;
  font-weight: 700;
  letter-spacing: 0.95px;
`;
