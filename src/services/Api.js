import axios from "axios";
axios.defaults.baseURL = `${process.env.REACT_APP_API_URI}`;

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

export { getUser, postLink, getTimeLine };
