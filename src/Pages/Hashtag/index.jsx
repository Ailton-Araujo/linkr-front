import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import Linkr from "../../components/Linkr";
import Trending from "../../components/Trending";
import InfiniteScroll from 'react-infinite-scroller';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { getMoreHashtagPosts} from "../../services/Api";

export default function HashtagPage() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { token } = JSON.parse(localStorage.getItem("auth"));
  const { hashtag } = useParams();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadMorePosts, setLoadMorePosts] = useState(true);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${apiUrl}/hashtag/${hashtag}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data: arrayPost }) => {
        setPosts(arrayPost);
        setError(false);
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
        setLoadMorePosts(false);
      });
  }, [hashtag]);

  function loadMore() {
    function success(data){
      if(data.length > 0)
        setPosts([...posts, ...data]);
      else
        setLoadMorePosts(false);
    }
    function failure (error) {
      console.log(error);
    }
    setOffset(offset + 1);
    getMoreHashtagPosts(hashtag, offset + 1, token, success, failure);
  }

  return (
    <SCContainer>
      <SCTitle data-test="hashtag-title"># {hashtag}</SCTitle>
      <div>
        <SCContent>
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
          {loading ? (
            <SCLoading>Loading...</SCLoading>
          ) : (
            posts.map((post, id) => (
              <Linkr key={id} post={post} setPostList={setPosts} />
            ))
          )}
          {error && (
            <SCErrorMessage>
              There was an error loading the posts!
            </SCErrorMessage>
          )}
          </InfiniteScroll>
        </SCContent>
        <Trending />
      </div>
    </SCContainer>
  );
}

const SCContainer = styled.div`
  font-family: "Oswald", sans-serif;
  width: 80%;
  background: #333333;
  color: #ffffff;
  margin: 30px auto 15px;
  > div {
    width: 100%;
    display: flex;
    gap: 15px;
    align-items: start;
    justify-content: center;
    div {
      margin-top: 0px;
    }
  }
  @media (max-width: 800px) {
    width: 90%;
    margin: 0px auto 15px;
  }
  @media (max-width: 520px) {
    width: 100%;
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
`;

const SCContent = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  @media (max-width: 800px) {
    width: 90%;
    margin: auto;
  }
  @media (max-width: 520px) {
    width: 100%;
    article {
      border-radius: 0px;
    }
  }
`;

const SCTitle = styled.h1`
  margin-top: 130px;
  margin-bottom: 45px;
  color: #fff;
  font-size: 43px;
  font-weight: 700;
  @media (max-width: 800px) {
    width: 90%;
    margin: 155px auto 45px;
    padding-left: 15px;
  }
`;

const SCErrorMessage = styled.div`
  color: #d8334a;
  font-size: 20px;
  font-weight: 400;
`;

const SCLoading = styled.div`
  margin-top: 60px;
  color: #fff;
  font-family: "Oswald", sans-serif;
  font-size: 26px;
  font-weight: 700;
`;
