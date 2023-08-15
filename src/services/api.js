import axios from "axios";
axios.defaults.baseURL = `${process.env.API_URL}`;

function tokenProvider(auth) {
  return {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };
}
