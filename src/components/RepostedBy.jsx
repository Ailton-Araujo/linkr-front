import { styled } from "styled-components";
import { TbRepeat } from "react-icons/tb";

export default function RepostedBy({ repost }) {
  return (
    <SCContainer isRepost={repost}>
      <SCContent>
        <TbRepeat size={"20px"} />
        <span>
          reposted by <strong>{repost?.username}</strong>
        </span>
      </SCContent>
    </SCContainer>
  );
}

const SCContainer = styled.div`
  display: ${({ isRepost }) => (isRepost ? "block" : "none")};
  width: 100%;
  height: 53px;
  border-radius: 16px 16px 0 0;
  background: #1e1e1e;
  margin-bottom: -20px;
`;

const SCContent = styled.div`
  width: 100%;
  height: 33px;
  display: flex;
  color: #fff;
  font-family: Lato;
  font-size: 11px;
  font-weight: 400;
  display: flex;
  align-items: center;
  padding-left: 13px;
  gap: 6px;

  > span > strong {
    font-weight: 700;
  }
`;
