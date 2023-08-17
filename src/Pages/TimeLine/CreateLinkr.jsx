import { useRef, useState } from "react";
import styled from "styled-components";
import urlMetadata from "url-metadata";
import useUserInfo from "../../hooks/useUserInfo";
import { postLink } from "../../services/Api";

export default function CreateLinkr({ token, postList, setPostList }) {
  const { userInfo } = useUserInfo();
  const [tryPublish, setTryPublish] = useState(false);
  const refLink = useRef("");
  const refText = useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    setTryPublish(true);

    const newPost = {
      link: refLink.current?.value,
      description: refText.current?.value,
      hashtags: refText.current?.value
        .split(/([#|＃][^\s]+)/g)
        .filter((e) => e.match(/([#|＃][^\s]+)/g))
        .map((e) => e.replace("#", "")),
    };

    // newPost = [
    //   {
    //     post: { description: data.description, id: response, link: data.link },
    //     meta: {
    //       title: metadata["og:title"],
    //       description: metadata["og:description"],
    //       image: metadata["og:image"],
    //     },
    //   },
    // ];

    if (newPost.link === "") {
      alert("O link é obrigatório");
      setTryPublish(false);
      return;
    }

    function success(data, newPost) {
      refLink.current.value = "";
      refText.current.value = "";
      console.log(data);
      urlMetadata(newPost.link).then((metadata) =>
        setPostList((prevState) => [
          {
            post: {
              description: newPost.description,
              id: data.id,
              link: newPost.link,
              user: {
                username: userInfo.username,
                image: userInfo.image,
              },
            },
            meta: {
              title: metadata["og:title"],
              description: metadata["og:description"],
              image: metadata["og:image"],
            },
          },
          ...prevState,
        ])
      );
      setTryPublish(false);
    }
    console.log(postList);
    function failure(error) {
      refLink.current.value = "";
      refText.current.value = "";
      if (error.response) {
        alert(error.response.data);
      } else {
        alert(error.message);
      }

      setTryPublish(false);
    }
    postLink(newPost, token, success, failure);
  }
  return (
    <CreateLinkrStyled bg={userInfo.image}>
      <div></div>
      <form onSubmit={handleSubmit}>
        <h2>What are you going to share today?</h2>
        <input
          disabled={tryPublish}
          type="url"
          placeholder="http://..."
          ref={refLink}
        />
        <textarea
          disabled={tryPublish}
          placeholder="Awesome article about #javascript"
          ref={refText}
        />
        <button disabled={tryPublish} type="submit">
          {!tryPublish ? "Publish" : "Publishing..."}
        </button>
      </form>
    </CreateLinkrStyled>
  );
}

const CreateLinkrStyled = styled.article`
  width: 620px;
  border-radius: 16px;
  padding: 20px 20px 55px;
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  div {
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    background: ${({ bg }) => `url(${bg})`},
      lightgray -2.896px -0.135px / 109.434% 100.538% no-repeat;
    background-size: 48px 48px;
    background-position: center center;
  }
  form {
    width: calc(100% - 50px);
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: flex-start;
    gap: 5px;
    h2 {
      margin: 0px;
      color: #707070;
      font-family: "Lato", sans-serif;
      font-size: 20px;
      font-weight: 300;
      line-height: 35px;
    }
    input {
      width: 100%;
      height: 30px;
      border: none;
      border-radius: 5px;
      background: #efefef;
      &::placeholder {
        color: #949494;
        font-family: "Lato", sans-serif;
        font-size: 15px;
        font-weight: 300;
      }
    }
    textarea {
      width: 100%;
      height: 66px;
      resize: none;
      border: none;
      border-radius: 5px;
      background: #efefef;
      &::placeholder {
        color: #949494;
        font-family: "Lato", sans-serif;
        font-size: 15px;
        font-weight: 300;
      }
    }
    button {
      width: 112px;
      height: 31px;
      border-radius: 5px;
      border: none;
      background: #1877f2;
      position: absolute;
      bottom: 15px;
      right: 20px;
      color: #fff;
      font-family: "Lato", sans-serif;
      font-size: 14px;
      font-weight: 700;
    }
  }
`;
