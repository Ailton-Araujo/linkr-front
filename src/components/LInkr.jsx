import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaPencilAlt } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import AuthContext from "../contexts/AuthContext";
import useUserInfo from "../hooks/useUserInfo";
import HashTagsCard from "./HashtagsCard";
import { postLike, editPost } from "../services/Api";

export default function Linkr({ dataPost }) {
  const { post, meta } = dataPost;
  if (!post.postLikes[0]) post.postLikes.length = 0;
  const { auth } = useContext(AuthContext);
  const { userInfo } = useUserInfo();
  const [tryLike, setTryLike] = useState(false);
  const [userLiked, setUserLiked] = useState(
    post.postLikes.includes(userInfo.username)
  );
  const [message, setMessage] = useState("");
  const [editor, setEditor] = useState(false);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState(post.description);
  const [original, setOriginal] = useState(post.description);
  const inputReference = useRef(null);

  useEffect(() => {
    if (editor) inputReference.current.focus();

    switch (post.postLikes.length) {
      case 0:
        setMessage("Seja o primeiro a curtir esse Post");
        break;
      case 1:
        if (userLiked) return setMessage("Você");
        setMessage(post.postLikes[0]);
        break;
      case 2:
        if (userLiked)
          return setMessage(
            `Você, ${post.postLikes.find((e) => e !== userInfo.username)}`
          );
        setMessage(`${post.postLikes[0]}, ${post.postLikes[1]}`);
      case 3:
        if (userLiked)
          return setMessage(
            `Você, ${post.postLikes.find(
              (e) => e !== userInfo.username
            )} e outra ${post.postLikes.length - 2} pessoa`
          );
        setMessage(
          `${post.postLikes[0]}, ${post.postLikes[1]} e outra ${
            post.postLikes.length - 2
          } pessoa`
        );
        break;
      default:
        if (userLiked)
          return setMessage(
            `Você, ${post.postLikes.find(
              (e) => e !== userInfo.username
            )} e outras ${post.postLikes.length - 2} pessoas`
          );
        setMessage(
          `${post.postLikes[0]}, ${post.postLikes[1]} e outras ${
            post.postLikes.length - 2
          } pessoas`
        );
        break;
    }
  }, [editor, post.postLikes.length]);

  function handleLike() {
    setTryLike(true);
    const newLike = {
      userId: userInfo.id,
      postId: post.id,
      type: "",
    };
    if (!userLiked) newLike.type = "like";
    if (userLiked) newLike.type = "dislike";

    function success(data) {
      setUserLiked(data);
      data
        ? post.postLikes.push(userInfo.username)
        : post.postLikes.splice(post.postLikes.indexOf(userInfo.username), 1);
      setTryLike(false);
    }
    function failure(error) {
      if (error.response) {
        alert(error.response.data);
      } else {
        alert(error.message);
      }
      setTryLike(false);
    }
    postLike(newLike, auth.token, success, failure);
  }

  function handleLink() {
    window.open(post.link, "_blank").focus();
  }

  function toggleEditMode() {
    handleCancelChanges();
    setEditor(!editor);
  }

  function handleChange(e) {
    setText(e.target.value);
  }

  function handleCancelChanges() {
    setText(original);
    setEditor(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Escape") {
      handleCancelChanges();
    }
  }

  function success(data) {
    setOriginal(text);
    setEditor(false);
    setLoading(false);
  }

  function failure(error) {
    alert("Não foi possível realizar a edição. Tente novamente.");
    setLoading(false);
  }

  function handleSubmit(e, id) {
    e.preventDefault();
    setLoading(true);
    editPost(
      id,
      {
        description: text,
        hashtags: text
          .split(/([#|＃][^\s]+)/g)
          .filter((e) => e.match(/([#|＃][^\s]+)/g))
          .map((e) => e.replace("#", "")),
      },
      auth.token,
      success,
      failure
    );
  }

  return (
    <PostStyled data-test="post" bg={post.user.image} bgspan={meta.image}>
      <section>
        <div></div>
        <button
          data-test="like-btn"
          data-tooltip-id={post.id}
          disabled={tryLike}
          onClick={handleLike}
          type="button"
        >
          {userLiked ? <Liked /> : <NotLiked />}
        </button>
        <p data-test="counter">{post.postLikes.length} likes</p>
      </section>
      <div>
        <form onSubmit={(e) => handleSubmit(e, post.id)}>
          <PostHeader>
            <h3 data-test="username">
              <Link to={`/user/${post.user.id}`}>{post.user.username}</Link>
            </h3>
            {post.user.id === userInfo.id ? (
              <button
                type="button"
                data-test="edit-btn"
                onClick={toggleEditMode}
              >
                <FaPencilAlt className="icon" />
              </button>
            ) : (
              ""
            )}
          </PostHeader>
          {!editor ? (
            <h4 data-test="description">
              <HashTagsCard>{original}</HashTagsCard>
            </h4>
          ) : (
            <EditInput
              type="text"
              value={text}
              onChange={handleChange}
              ref={inputReference}
              onKeyDown={handleKeyDown}
              disabled={loading}
              data-test="edit-input"
            />
          )}
        </form>
        <div data-test="link" onClick={handleLink}>
          <section>
            <h3>{meta.title}</h3>
            <h4>{meta.description}</h4>
            <a>{post.link}</a>
          </section>
          <div></div>
        </div>
      </div>

      <Tooltip
        data-test="tooltip"
        id={post.id}
        content={message}
        place="bottom"
        className="styleToolTip"
      />
    </PostStyled>
  );
}

const PostHeader = styled.header`
  display: flex;
  justify-content: space-between;
  border: none;
`;

const EditInput = styled.input`
  color: #b7b7b7;
  font-family: "Lato", sans-serif;
  font-size: 17px;
  font-weight: 400;
  background-color: inherit;
  border: none;
  width: 100%;
  padding: 8px 0px;
`;

const PostStyled = styled.article`
  width: 620px;
  padding: 20px;
  margin-top: 18px;
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  border: none;
  border-radius: 16px;
  background: #171717;

  a:-webkit-any-link {
    text-decoration: none;
    color: inherit;
  }

  input:focus {
    outline: none;
  }

  section {
    position: relative;
    font-family: "Lato", sans-serif;

    div {
      width: 50px;
      height: 50px;
      border-radius: 26.5px;
      background: ${({ bg }) => `url(${bg})`},
        lightgray -2.896px -0.135px / 109.434% 100.538% no-repeat;
      background-size: 50px 50px;
      background-position: center center;
    }
    button {
      padding: 0px;
      border: none;
      background: none;
      position: absolute;
      top: 65px;
      left: 12.5px;
      cursor: pointer;
      &:disabled {
        cursor: not-allowed;
      }
    }
    p {
      margin-top: 43px;
      color: #fff;
      text-align: center;
      font-size: 11px;
      font-weight: 400;
    }
  }

  .styleToolTip {
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.9);
    color: #505050;
    font-size: 11px;
    font-weight: 700;
  }
  .icon {
    color: white;
    width: 23px;
  }

  button {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    outline: inherit;
  }

  div:nth-child(2) {
    width: calc(100% - 50px);
    font-family: "Lato", sans-serif;
    font-weight: 400;
    h3 {
      color: #fff;
      font-size: 19px;
      line-height: 25px;
      display: flex;
      justify-content: space-between;
    }

    h4 {
      padding: 10px 0px;
      color: #b7b7b7;
      font-size: 17px;
      input {
        padding: 0;
        color: #b7b7b7;
        font-size: 17px;
        background-color: inherit;
        border: none;
        width: 100%;
      }
      input:focus {
        outline: none;
      }
    }

    div {
      width: 100%;
      border-radius: 11px;
      border: 1px solid #4d4d4d;
      background: rgba(196, 196, 196, 0);
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      section {
        width: calc(100% - 31%);
        height: 100%;
        padding: 15px;
        cursor: pointer;
        h3 {
          color: #cecece;
          font-size: 16px;
        }
        h4 {
          color: #9b9595;
          font-size: 11px;
        }
        a {
          color: #cecece;
          font-size: 11px;
        }
      }

      div {
        width: 31%;
        height: 150px;
        border: none;
        border-radius: 0px 12px 13px 0px;
        background: ${({ bgspan }) => `url(${bgspan})`}, #171717 50% / cover;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
      }
    }
  }
`;

const Liked = styled(AiFillHeart)`
  width: 25px;
  height: 25px;
  color: #ac0000;
`;
const NotLiked = styled(AiOutlineHeart)`
  width: 25px;
  height: 25px;
  color: #fff;
`;
