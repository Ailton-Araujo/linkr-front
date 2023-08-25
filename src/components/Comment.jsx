import { styled } from "styled-components";
import useUserInfo from "../hooks/useUserInfo";

export default function Comment({ comment }) {
  const { userInfo } = useUserInfo();
  return (
    <CommentBox data-test="comment" userbg={comment.image}>
      <div></div>
      <div>
        <h4>
          {comment.username}{" "}
          {comment.id === userInfo.id ? <span>• post’s author</span> : ""}
        </h4>
        <p>{comment.comment}</p>
      </div>
    </CommentBox>
  );
}

const CommentBox = styled.div`
  padding: 10px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #353535;
  div:nth-child(1) {
    width: 40px;
    height: 40px;
    margin-right: 15px;
    border-radius: 26.5px;
    background: ${({ userbg }) => `url(${userbg})`},
      lightgray -2.896px -0.135px / 109.434% 100.538% no-repeat;
    background-size: 48px 48px;
    background-position: center center;
  }
  div:nth-child(2) {
    width: calc(100% - 15%);
    font-family: "Lato", sans-serif;
    font-size: 14px;
    h4 {
      color: #f3f3f3;
      font-weight: 700;
      margin-bottom: 5px;
      span {
        color: #565656;
        font-weight: 400;
      }
    }
    p {
      padding: 0px;
      border: none;
      color: #acacac;
      font-weight: 400;
    }
  }
`;
