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
    .catch((error) => console.log(error));
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


function editPost(id, newDesc, token, success, failure){
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

export {
  getUser,
  postLink,
  getTimeLine,
  getUserPosts,
  getUsername,
  queryUsers,
  editPost,
  postLike,
};

