import axios from "axios";

export function getMeta(url, success, failure) {
  axios
    .get(`https://jsonlink.io/api/extract?url=${url}`)
    .then((res) => {
      success(res);
    })
    .catch((error) => {
      failure(error);
    });
}

// export async function getMeta(url, success, failure) {
//   const options = {
//     method: "POST",
//     url: "https://magicapi-article-extraction.p.rapidapi.com/extract",
//     headers: {
//       "content-type": "application/json",
//       "X-RapidAPI-Key": "d0b3b76a44msh30fb6ddca293996p176049jsn9f956660ee90",
//       "X-RapidAPI-Host": "magicapi-article-extraction.p.rapidapi.com",
//     },
//     data: {
//       url,
//     },
//   };
//   try {
//     const response = await axios.request(options);
//     success(response.data);
//   } catch (error) {
//     failure(error);
//   }
// }
