import axios from "axios";
axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}`;

function tokenProvider(auth) {
  return {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };
}

function getUser(token, success, failure) {
  axios
    .get("/userinfo", tokenProvider(token))
    .then(({ data }) => {
      success(data);
    })
    .catch((error) => failure(error));
}

function postLink(newPost, token, success, failure) {
  axios
    .post("/timeline", newPost, tokenProvider(token))
    .then(({ data }) => success(data, newPost))
    .catch((error) => failure(error));
}

function getTimeLine(token, success, failure) {
  axios
    .get("/timeline", tokenProvider(token))
    .then(({ data }) => {
      success(data);
    })
    .catch((error) => {
      failure(error);
      console.log(error);
    });
}

function getUserPosts(id, token, success, failure) {
  axios
    .get(`/posts/users/${id}`, tokenProvider(token))
    .then(({ data }) => {
      success(data);
    })
    .catch((error) => {
      failure(error);
      console.log(error);
    });
}

function getUsername(id, token, success, failure) {
  axios
    .get(`/users/${id}`, tokenProvider(token))
    .then(({ data }) => {
      success(data);
    })
    .catch((error) => {
      failure(error);
      console.log(error);
    });
}

function queryUsers(search, token, success, failure) {
  axios
    .get(`/users?username=${search}`, tokenProvider(token))
    .then(({ data }) => {
      success(data);
    })
    .catch((error) => {
      failure(error);
      console.log(error);
    });
}

function postLike(newLike, token, success, failure) {
  axios
    .post("/likes", newLike, tokenProvider(token))
    .then(({ data }) => {
      success(data);
    })
    .catch((error) => {
      console.log(error);
      failure(error);
    });
}

function editPost(id, newDesc, token, success, failure) {
  axios
    .patch(`/posts/${id}`, newDesc, tokenProvider(token))
    .then(({ data }) => {
      success(data);
    })
    .catch((error) => {
      failure(error);
      console.log(error);
    });
}

function deletePost(id, token) {
  return axios.delete(`/posts/${id}`, tokenProvider(token));
}

function repostPost(id, token) {
  return axios.post(`/posts/share/${id}`, {}, tokenProvider(token));
}

function getAnyFollower (token, successGetFollows, failureGetFollows) {
    axios.get("/allfollows", tokenProvider(token))
    .then((res) => {
      successGetFollows(res.data)
    })
    .catch((err) => {
      failureGetFollows();
    });
};

function isFollowing (id, token, sucessFollowCheck, errorFollowCheck) {
  axios.get(`/follow/${id}`, tokenProvider(token))
  .then((res) => {
    if(res?.data.rows.length === 0){
      return sucessFollowCheck("Follow")
    }
    sucessFollowCheck("Unfollow")
  })
  .catch((err) => {
    errorFollowCheck(err.response?.message)
  });
};

function followAndUnfollow (action, id, token, enableButton) {

  if(action === "Follow") {
    axios.post(`/follow/${id}`, {body: null},tokenProvider(token))
    .then((res) => {
      enableButton(action);
    })
    .catch((err) => {
      enableButton();
      alert(`Houve um erro ao executar a ação. ${err.response?.data}`);
    });
  } else {
    axios.delete(`/follow/${id}`, tokenProvider(token))
    .then((res) => {
      enableButton(action);
    })
    .catch((err) => {
        alert(`Houve um erro ao executar a ação. ${err.response?.data}`)
        enableButton();
    });
  };
};


export {
  getUser,
  postLink,
  getTimeLine,
  getUserPosts,
  getUsername,
  queryUsers,
  editPost,
  postLike,
  deletePost,
  repostPost,
  isFollowing,
  followAndUnfollow,
  getAnyFollower,
};
