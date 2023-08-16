import { useParams } from "react-router-dom";
import { styled } from "styled-components";

export default function HashtagPage() {
  //const { hashtag } = useParams();
  const hashtag = "react";

  return (
    <SCContainer>
      <SCTitle># {hashtag}</SCTitle>
      <div>
        <SCContent></SCContent>
        <SCTrendingArea />
      </div>
    </SCContainer>
  );
}

const SCContainer = styled.div`
  width: 100vw;
  background: #333333;
  min-height: 100vh;
  color: #ffffff;
  padding-left: 250px;
  padding-right: 250px;

  > div {
    width: 100%;
    background: green;
    display: flex;
    gap: 25px;
    align-items: center;
    justify-content: center;
  }
`;

const SCContent = styled.div`
  width: 600px;
  min-height: 100vh;
  background-color: blue;
`;

const SCTrendingArea = styled.div`
  width: 300px;
  min-height: 100vh;
  background-color: red;
`;

const SCTitle = styled.h1``;
