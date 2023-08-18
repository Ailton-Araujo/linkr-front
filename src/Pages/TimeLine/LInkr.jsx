import styled from "styled-components";
import HashTagsCard from "../../components/HashtagsCard";
import { Link } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa"
import { useContext, useEffect, useRef, useState } from "react";
import UserInfoContext from "../../contexts/UserInfoContext";
import axios from "axios";
import { editPost } from "../../services/Api";
import AuthContext from "../../contexts/AuthContext";

export default function Linkr({ dataPost }) {
  const { post, meta } = dataPost;
  const { auth } = useContext(AuthContext);
  const { userInfo } = useContext(UserInfoContext);
  const [editor, setEditor] = useState(false);
  const [text, setText] = useState(post.description);
  const [original, setOriginal] = useState(post.description);
  const inputReference = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editor)
        inputReference.current.focus();
  }, [editor]);

  function handleClick() {
    window.open(post.link, "_blank").focus();
  }

  function toggleEditMode(){
    setEditor(!editor);
}

function handleChange(e){
    setText(e.target.value);
}

function handleCancelChanges(){
  setText(original);
  setEditor(false);
}

function handleKeyDown(e) {
  if (e.key === 'Escape'){
      handleCancelChanges();
  }
}

function success(data){
  console.log(data)
  setOriginal(text);
  setLoading(false);
}

function failure(error){
  console.log(error)
  setLoading(false);
}

function handleSubmit(e, id){
    e.preventDefault();
    if(editor){
      setLoading(true);
      editPost(id, {description: text}, auth.token, success, failure)
    }
    else
      toggleEditMode();
}

  return (
    <PostStyled bg={post.user.image} bgspan={meta.image} data-test="post">
      <div></div>
      <div>
        <form onSubmit={e => handleSubmit(e, post.id)}>
          <h3>
            <Link to={`/user/${post.user.id}`}>{post.user.username}</Link>
            {post.user.id === userInfo.id ? 
           <button type="submit" data-test="edit-btn"><FaPencilAlt className="icon"/></button> : ""
            }
          </h3>
          <h4>
              { !editor ? 
              <HashTagsCard>{post.description}</HashTagsCard> 
              : <input type="text" value={text} onChange={handleChange} ref={inputReference} onKeyDown={handleKeyDown} disabled={loading}/> }
          </h4>
        </form>
        <div onClick={handleClick}>
          <section>
            <h3>{meta.title}</h3>
            <h4>{meta.description}</h4>
            <a href={post.link}>{post.link}</a>
          </section>
          <div></div>
        </div>
      </div>
    </PostStyled>
  );
}

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

  .icon{
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

  div:nth-child(1) {
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    background: ${({ bg }) => `url(${bg})`},
      lightgray -2.896px -0.135px / 109.434% 100.538% no-repeat;
    background-size: 50px 50px;
    background-position: center center;
  }
  div:nth-child(2) {
    width: calc(100% - 50px);
    h3 {
      color: #fff;
      font-family: "Lato", sans-serif;
      font-size: 19px;
      line-height: 25px;
      font-weight: 400;
      display: flex;
      justify-content: space-between;
    }
    h4 {
      padding: 10px 0px;
      color: #b7b7b7;
      font-family: "Lato", sans-serif;
      font-size: 17px;
      font-weight: 400;
      input {
        padding: 0;
        color: #b7b7b7;
        font-family: "Lato", sans-serif;
        font-size: 17px;
        font-weight: 400;
        background-color: inherit;
        border: none;
        width: 100%;
      }
      input:focus{
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
      section {
        width: calc(100% - 31%);
        padding: 15px;
        cursor: pointer;
        h3 {
          color: #cecece;
          font-family: "Lato", sans-serif;
          font-size: 16px;
          font-weight: 400;
        }
        h4 {
          color: #9b9595;
          font-family: "Lato", sans-serif;
          font-size: 11px;
          font-weight: 400;
        }
        a {
          color: #cecece;
          font-family: "Lato", sans-serif;
          font-size: 11px;
          font-weight: 400;
          text-decoration: none;
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
