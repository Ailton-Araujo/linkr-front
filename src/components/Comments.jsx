import { useRef, useState } from "react";
import { styled } from "styled-components";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import useUserInfo from "../hooks/useUserInfo";
import { postComment } from "../services/Api";
import Comment from "./Comment";

export default function PostComments({ token, postId, comments, numComments }) {
  const { userInfo } = useUserInfo();
  const [tryComment, setTryComment] = useState(false);
  const refComment = useRef("");
  const temp = 0;

  function handleSubmit(e) {
    e.preventDefault();
    setTryComment(true);
    const newComment = {
      userId: userInfo.id,
      postId: postId,
      comment: refComment.current?.value,
    };

    function success(res) {
      console.log(res);
      setTryComment(false);
    }
    function failure(error) {
      console.log(error);
      setTryComment(false);
    }

    postComment(newComment, token, success, failure);
  }
  return (
    <CommentsBox data-test="comment-box">
      {numComments === 0 ? (
        <p>Be the first to comment</p>
      ) : (
        comments.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))
      )}
      <InputBox bg={userInfo.image}>
        <div></div>
        <form onSubmit={handleSubmit}>
          <textarea
            data-test="comment-input"
            disabled={tryComment}
            ref={refComment}
            placeholder="write a comment..."
          />
          <button data-test="comment-input" disabled={tryComment} type="submit">
            {<SendIcon />}
          </button>
        </form>
      </InputBox>
    </CommentsBox>
  );
}

const CommentsBox = styled.aside`
  width: 100%;
  padding: 10px 20px 20px;
  border-radius: 0 0 16px 16px;
  background: #1e1e1e;
  p {
    padding: 15px;
    color: #acacac;
    font-family: "Lato", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border-bottom: 2px solid #353535;
  }
`;

const InputBox = styled.div`
  padding-left: 10px;
  padding-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    width: 40px;
    height: 40px;
    border-radius: 26.5px;
    background: ${({ bg }) => `url(${bg})`},
      lightgray -2.896px -0.135px / 109.434% 100.538% no-repeat;
    background-size: 48px 48px;
    background-position: center center;
  }

  form {
    width: calc(100% - 15%);
    height: 40px;
    textarea {
      width: 90%;
      height: 45px;
      resize: none;
      word-break: break-all;
      vertical-align: middle;
      padding: 2px 0px 2px 15px;
      border: none;
      border-radius: 8px 0px 0px 8px;
      background: #252525;
      color: #acacac;
      font-family: "Lato", sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      &:focus {
        outline: none;
      }
      &::placeholder {
        padding-left: 18px;
        color: #575757;
        font-family: "Lato", sans-serif;
        font-size: 14px;
        font-style: italic;
        font-weight: 400;
        line-height: 40px;
        letter-spacing: 0.7px;
      }
    }
    button {
      width: 10%;
      height: 45px;
      padding: 0px;
      vertical-align: middle;
      border: none;
      border-radius: 0px 8px 8px 0px;
      background: #252525;
    }
  }
`;

const SendIcon = styled(PiPaperPlaneTiltBold)`
  width: 18px;
  height: 18px;
  color: #f3f3f3;
`;
