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

function postLink(data, token, success, failure) {
  axios
    .post("/timeline", data, tokenProvider(token))
    .then(() => success())
    .catch((error) => failure(error));
}

function getTimeLine(token) {
  // axios.get("/timeline", tokenProvider(token)).then().catch();
}

export { getUser, postLink, getTimeLine };
