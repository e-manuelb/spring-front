import axios from "axios";

const baseAPI = axios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

console.log(baseAPI);

export default baseAPI;