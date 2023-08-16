import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import reactStringReplace from "react-string-replace";

export default function HashTagsCard({ children }) {
  const navigate = useNavigate();

  function redirectToHashtag(hashtag) {
    navigate(`/hashtag/${hashtag}`);
  }

  return reactStringReplace(children, /#(\w+)/g, (hashtag, i) => {
    return (
      <SCHashtag onClick={() => redirectToHashtag(hashtag)} key={i}>
        #{hashtag}
      </SCHashtag>
    );
  });
}

const SCHashtag = styled.span`
  color: #ffffff;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
`;
