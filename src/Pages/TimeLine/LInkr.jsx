import styled from "styled-components";
import HashTagsCard from "../../components/HashtagsCard";

export default function Linkr({ dataPost }) {
  const { post, meta } = dataPost;

  function handleClick() {
    window.open(post.link, "_blank").focus();
  }

  return (
    <PostStyled bg={post.user.image} bgspan={meta.image}>
      <div></div>
      <div>
        <h3>{post.user.username}</h3>
        <h4>
          <HashTagsCard>{post.description}</HashTagsCard>
        </h4>
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
    }
    h4 {
      padding: 10px 0px;
      color: #b7b7b7;
      font-family: "Lato", sans-serif;
      font-size: 17px;
      font-weight: 400;
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
