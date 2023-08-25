import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import AuthContext from "../contexts/AuthContext";
import useUserInfo from "../hooks/useUserInfo";
import HashTagsCard from "./HashtagsCard";
import { postLike, editPost } from "../services/Api";
import { getMeta } from "../services/MetaApi";
import DeleteModal from "./DeleteModal";
import RepostedBy from "./RepostedBy";
import RepostModal from "./RepostModal";
import ShareBox from "./ShareBox";

export default function Linkr({ post, setPostList }) {
  if (!post.postLikes[0]) post.postLikes.length = 0;
  const { auth } = useContext(AuthContext);
  const { userInfo } = useUserInfo();
  const [tryLike, setTryLike] = useState(false);
  const [userLiked, setUserLiked] = useState(
    post.postLikes.includes(userInfo.username)
  );
  const [message, setMessage] = useState("");
  const [meta, setMeta] = useState({
    title: "",
    description: "",
    image: "",
    url: post.link,
  });
  const [editor, setEditor] = useState(false);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState(post.description);
  const [original, setOriginal] = useState(post.description);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [repostModalIsOpen, setRepostModalIsOpen] = useState(false);
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
        break;
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

    function success(res) {
      setMeta({
        title: res.data?.title,
        description: res.data?.description,
        image: res.data?.images[0],
        url: res.data?.url,
      });
    }
    // function success(data) {
    //   setMeta({
    //     title: data?.title,
    //     description: data?.description,
    //     image: data?.topImage,
    //     url: data?.url,
    //   });
    // }
    function failure(error) {
      console.log(error);
    }

    getMeta(post.link, success, failure);
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

  function toggleEditMode() {
    handleCancelChanges();
    setEditor(!editor);
  }

  function openDeleteModal() {
    setDeleteModalIsOpen(true);
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

  function handleSubmit(e, id) {
    e.preventDefault();
    setLoading(true);

    function success(data) {
      setOriginal(text);
      setEditor(false);
      setLoading(false);
    }

    function failure(error) {
      alert("It was not possible to perform the edition. Try again.");
      setLoading(false);
    }

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
    <PostContainer>
      <RepostedBy repost={post.repostedBy} />

      <PostStyled data-test="post" bg={post.user.image} bgspan={meta.image}>
        <section>
          <div></div>
          <button
            data-test="like-btn"
            disabled={tryLike}
            onClick={handleLike}
            type="button"
          >
            {userLiked ? <Liked /> : <NotLiked />}
          </button>
          <p
            data-test="counter"
            data-tooltip-id={post.id}
            data-tooltip-content={message}
          >
            {post.postLikes.length} likes
          </p>

          <ShareBox
            setModalIsOpen={setRepostModalIsOpen}
            repostCount={post.repostCount}
          />
        </section>
        <div>
          <form onSubmit={(e) => handleSubmit(e, post.id)}>
            <PostHeader>
              <h3 data-test="username">
                <Link to={`/user/${post.user.id}`}>{post.user.username}</Link>
              </h3>
              {post.user.id === userInfo.id ? (
                <SCButtonGroup>
                  <button
                    type="button"
                    data-test="edit-btn"
                    onClick={toggleEditMode}
                  >
                    <FaPencilAlt className="icon" />
                  </button>
                  <button
                    type="button"
                    data-test="delete-btn"
                    onClick={() => openDeleteModal()}
                  >
                    <FaTrash className="icon" />
                  </button>
                </SCButtonGroup>
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
          <Link data-test="link" to={post.link} target="_blank">
            <section>
              <h3>{meta.title}</h3>
              <h4>{meta.description}</h4>
              <h5>{meta.url}</h5>
            </section>
            <div></div>
          </Link>
        </div>
      </PostStyled>

      <Tooltip
        id={post.id}
        render={({ content }) => <p data-test="tooltip">{content}</p>}
        place="bottom"
        className="styleToolTip"
      />

      <RepostModal
        isOpen={repostModalIsOpen}
        setModalIsOpen={setRepostModalIsOpen}
        idPost={post.id}
        userToken={auth.token}
      />

      <DeleteModal
        isOpen={deleteModalIsOpen}
        setModalIsOpen={setDeleteModalIsOpen}
        idPost={post.id}
        userToken={auth.token}
        updatePostList={setPostList}
      />
    </PostContainer>
  );
}

const PostContainer = styled.span`
  width: 100%;
  .styleToolTip {
    background-color: rgba(255, 255, 255, 0.9);
    color: #505050;
    font-size: 11px;
    font-weight: 700;
  }
`;

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
  width: 100%;
  padding: 20px;
  margin-bottom: 18px;
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

  > section {
    position: relative;
    font-family: "Lato", sans-serif;
    word-break: break-all;
    > div:first-child {
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

  .icon {
    color: white;
    width: 23px;
    cursor: pointer;
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

    a:nth-child(2) {
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
        h5 {
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

const SCButtonGroup = styled.fieldset`
  display: flex;
  gap: 10px;
`;
