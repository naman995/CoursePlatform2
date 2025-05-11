import axios from "redaxios";
import auth from "./auth";

function getAccessToken() {
  const accessToken = localStorage.getItem("token");
  // if (!accessToken) {
  //   return window.location.href = '/login'
  // }
  return accessToken;
}

 
const baseURL = "https://api.learnxtech.com/api/v1";
// const baseURL = "http://192.168.1.6:8000/api/v1";
// const baseURL = "http://localhost:8000/api/v1"

export const axiosPublic = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivate = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    'authorization': `Bearer ${getAccessToken()}`
  },
  // withCredentials: true,
})


// axiosPrivate.interceptors.request.use(async (config) => {
//   return {
//     ...config,
//     headers: {
//       ...config.headers,
//       "Content-Type": "application/json",
//     },
//   };
// });

// axiosPrivate.interceptors.response.use(
//   (response) => {
//     if (response && response.data) return response;
//     //check if the response is 401
//     if (response.status === 401) {
//       //if it is, then logout the user
//       auth.logout();
//     }
//     // return response;
//   },
//   (err) => {
//     //check if the error is 401
//     if (err.response.status === 401) {
//       //if it is, then logout the user
//       auth.logout();
//     }
//     throw new Error(err.response.data);
//   }
// );

