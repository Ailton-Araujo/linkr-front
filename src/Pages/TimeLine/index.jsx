import { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import AuthContext from "../../contexts/AuthContext";
import CreateLinkr from "./CreateLinkr";
import Linkr from "../../components/Linkr";
import Trending from "../../components/Trending";
import { getAnyFollower, getTimeLine, getNewPosts } from "../../services/Api";
import { useInterval } from 'use-interval';
import InfiniteScroll from 'react-infinite-scroller';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function TimeLine() {
  const { auth } = useContext(AuthContext);
  const [postList, setPostList] = useState([]);
  const [tryGetList, setTryGetList] = useState(false);
  const [message, setMessage] = useState("");
  const [newPosts , setNewPosts] = useState([]);
  const [loadMorePosts, setLoadMorePosts] = useState(true);

  useEffect(() => {
    setTryGetList(true);
    getAnyFollower(auth?.token, successGetFollows, failureGetFollows);
    function successGetFollows (data) {
      if(data.rowCount === 0) {
          setTryGetList(false);
          setLoadMorePosts(false);
          return setMessage("You don't follow anyone yet. Search for new friends!")
      }
      getTimeLine(auth?.token, success, failure);
    };

    function failureGetFollows () {
        setMessage("An error occured while trying to fetch your friend's posts")
        setLoadMorePosts(false);
    };
    
    function success(data) {
      if (data.length === 0) {
        setMessage("No posts found from your friends");
        setLoadMorePosts(false);
      }
      setPostList(data);
      setTryGetList(false);
    }
    function failure(error) {
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
      setMessage(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
      setTryGetList(false);
      setLoadMorePosts(false);
    };
  }, []);

  useInterval(() => {
    function success(data){
      if (data.length > 0)
        data.pop();
      setNewPosts(data);
    }
    function failure (error) {
      console.log(error);
    }
    let ts = (new Date(Date.now())).toISOString();
    if (postList.length > 0 && postList[0].timestamp) {
      ts = postList[0].timestamp;
    }
    getNewPosts(ts, "after", auth.token, success, failure);
  }, 15000);

  function loadMore() {
    function success(data){
      if(data.length > 0)
        setPostList([...postList, ...data]);
      else
        setLoadMorePosts(false);
    }
    function failure (error) {
      console.log(error);
    }
    if (postList.length > 0 && postList[postList.length - 1]) {
      const ts = postList[postList.length - 1].timestamp;
      getNewPosts(ts, "before", auth.token, success, failure);
    }
  }

  function renderNew() {
    setPostList([...newPosts, ...postList]);
    setNewPosts([]);
  }

  return (
    <TimeLineStyled>
      <PostList>
        <h1>timeline</h1>
        <CreateLinkr token={auth?.token} setPostList={setPostList} />
        {newPosts.length ? 
          <LoadButton onClick={renderNew} data-test="load-btn">
            {newPosts.length} new posts, load more!
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="16" viewBox="0 0 22 16" fill="none">
              <path d="M11.2391 4.19004e-06C15.4598 4.19004e-06 18.9272 3.10714 19.513 7.14285H22L17.8152 11.9048L13.6304 7.14285H16.4043C16.1369 5.9775 15.4804 4.93688 14.5423 4.19091C13.6042 3.44495 12.4397 3.03771 11.2391 3.03571C9.50543 3.03571 7.975 3.88095 7.00652 5.15476L4.96196 2.83333C5.74453 1.94233 6.70962 1.22848 7.79235 0.739766C8.87507 0.251055 10.0503 -0.00118567 11.2391 4.19004e-06ZM10.7609 16C6.55217 16 3.07283 12.8928 2.48696 8.85714H0L4.18478 4.09524C5.5837 5.67857 6.97065 7.27381 8.36957 8.85714H5.59565C5.86314 10.0225 6.51955 11.0631 7.45769 11.8091C8.39583 12.555 9.56028 12.9623 10.7609 12.9643C12.4946 12.9643 14.025 12.119 14.9935 10.8452L17.038 13.1667C16.2562 14.0586 15.2913 14.773 14.2084 15.2618C13.1255 15.7506 11.9498 16.0023 10.7609 16Z" fill="white"/>
            </svg>
          </LoadButton>
           : ""}
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={loadMorePosts}
          initialLoad = {false}
          loader={
          <div className="loader" key={0}>
            <AiOutlineLoading3Quarters className="loadingIcon"/>
            <h4>Loading more posts...</h4>
          </div>}
          >
        {tryGetList ? (
          <h2 data-test="message"></h2>
        ) : postList.length === 0 ? (
          <h2 data-test="message">{message}</h2>
        ) : (
          postList.map((post, id) => (
            <Linkr key={id} post={post} setPostList={setPostList} />
          ))
        )}
        </InfiniteScroll>
      </PostList>
      <Trending />
    </TimeLineStyled>
  );
}

const TimeLineStyled = styled.main`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: start;
  gap: 15px;
  margin: 30px auto 15px;
  @media (max-width: 800px) {
    width: 90%;
    margin: 45px auto 15px;
  }
  @media (max-width: 520px) {
    width: 100%;
  }
`;

const PostList = styled.section`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  h1 {
    margin-top: 100px;
    margin-bottom: 45px;
    color: #fff;
    font-family: "Oswald", sans-serif;
    font-size: 43px;
    font-weight: 700;
    align-self: flex-start;
  }
  h2 {
    margin-top: 60px;
    color: #fff;
    font-family: "Oswald", sans-serif;
    font-size: 26px;
    font-weight: 700;
  }
  .loader{
    margin-top: 70px;
    display: flex;
    flex-direction: column;
    height: 70px;
    justify-content: space-between;
    align-items: center;
    color: #6D6D6D;
    font-family: Lato;
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 1.1px;
  }
  .loadingIcon{
    width: 36px;
    height: 36px;
    flex-shrink: 0;
    fill: rgba(109, 109, 109, 1)
  }
  @media (max-width: 800px) {
    width: 90%;
    margin: auto;
    h1 {
      margin-top: 110px;
      padding-left: 15px;
    }
  }
  @media (max-width: 520px) {
    width: 100%;
    article {
      border-radius: 0px;
    }
  }
`;

const LoadButton = styled.button`
  width: 611px;
  height: 61px;
  flex-shrink: 0;
  border-radius: 16px;
  background: #1877F2;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Lato;
  font-size: 16px;
  color: #FFFFFF;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 17px 0;
  svg {
    margin-left: 10px;
  }
  @media (max-width: 611px) {
    width: 320px;
  }
`;

export { TimeLineStyled, PostList };
