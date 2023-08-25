import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import Linkr from "../../components/Linkr";
import Trending from "../../components/Trending";
import {
  followAndUnfollow,
  getUserPosts,
  getUsername,
  isFollowing,
  getMoreUserPosts,
} from "../../services/Api";
import { TimeLineStyled, PostList } from "../TimeLine";
import { styled } from "styled-components";
import FollowButton from "../../components/follow/FollowButton";
import useUserInfo from "../../hooks/useUserInfo";
import InfiniteScroll from "react-infinite-scroller";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useFollowers from "../../hooks/useFollowers";

export default function UserPage() {
  const { auth } = useContext(AuthContext);
  const { setFollowedIds } = useFollowers();
  const [postList, setPostList] = useState([]);
  const [tryGetList, setTryGetList] = useState(false);
  const [loadingName, setLoadingName] = useState(false);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const { id } = useParams();
  const { userInfo } = useUserInfo();
  const [buttonAction, setButtonAction] = useState("Follow");
  const [disabled, setDisabled] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [loadMorePosts, setLoadMorePosts] = useState(true);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (isFollowing(id, auth?.token, successFollowCheck, errorFollowCheck));
    function successFollowCheck(data) {
      setButtonAction(data);
    }
    function errorFollowCheck(data) {
      alert(`${data}`);
    }
    setTryGetList(true);
    setLoadingName(true);
    getUsername(id, auth.token, successUsername, failure);
    function success(data) {
      if (data.length === 0) setMessage("There are no posts yet");
      setPostList(data);
      setTryGetList(false);
    }
    function failure(error) {
      setMessage(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
      setTryGetList(false);
      setLoadMorePosts(false);
    }
    function successUsername(data) {
      setUsername(data);
      setLoadingName(false);
      setButtonVisible(true);
    }
    function failureUsername(data) {
      setUsername("");
      setLoadingName(false);
      setButtonVisible(true);
    }
    getUserPosts(id, auth.token, success, failureUsername);
  }, []);

  function followUnfollow(buttonAction) {
    setDisabled(true);
    followAndUnfollow(
      buttonAction,
      id,
      auth?.token,
      enableButton,
      setFollowedIds
    );
  }

  const enableButton = (buttonAction) => {
    if (buttonAction === "Follow") {
      setButtonAction("Unfollow");
      setDisabled(false);
    } else {
      setButtonAction("Follow");
      setDisabled(false);
    }
  };

  function loadMore() {
    function success(data) {
      if (data.length > 0) setPostList([...postList, ...data]);
      else setLoadMorePosts(false);
    }
    function failure(error) {
      console.log(error);
    }
    setOffset(offset + 1);
    getMoreUserPosts(id, offset + 1, auth.token, success, failure);
  }

  return (
    <Formatter>
      <TimeLineStyled>
        <PostList>
          <FlexUserName>
            <h1>{loadingName ? "" : `${username}'s posts`}</h1>
            <FollowButton
              visibility={buttonVisible}
              disabled={disabled}
              func={followUnfollow}
              paramid={id}
              authid={userInfo.id}
              action={buttonAction}
            ></FollowButton>
          </FlexUserName>
          <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={loadMorePosts}
            initialLoad={false}
            loader={
              <div className="loader" key={0}>
                <AiOutlineLoading3Quarters className="loadingIcon" />
                <h4>Loading more posts...</h4>
              </div>
            }
          >
            {tryGetList ? (
              <h2>Loading</h2>
            ) : postList.length === 0 ? (
              <h2>{message}</h2>
            ) : (
              postList.map((post, id) => (
                <Linkr key={id} post={post} setPostList={setPostList} />
              ))
            )}
          </InfiniteScroll>
        </PostList>
        <FlexTrending>
          <FollowButton
            visibility={buttonVisible}
            disabled={disabled}
            func={followUnfollow}
            paramid={id}
            authid={userInfo.id}
            action={buttonAction}
          ></FollowButton>
          <Spacer
            buttonVisible={buttonVisible}
            paramid={id}
            authid={userInfo.id}
          ></Spacer>
          <Trending />
        </FlexTrending>
      </TimeLineStyled>
    </Formatter>
  );
}

const Formatter = styled.div`
  section > div {
    align-self: flex-start;
  }
`;

const Spacer = styled.div`
  height: ${(props) =>
    props.paramid == props.authid || !props.buttonVisible ? "148px" : "0"};
`;

const FlexTrending = styled.div`
  display: flex;
  flex-direction: column;

  div:last-child {
    margin-top: 39px;
  }

  button {
    margin-top: 108px;
    align-self: flex-end;
  }

  @media (max-width: 800px) {
    button {
      display: none;
    }

    section {
      width: 100%;
    }
  }
`;

const FlexUserName = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    margin-top: 80px;
    margin-right: 15px;
  }

  @media (min-width: 800px) {
    button {
      display: none;
    }
  }
`;
