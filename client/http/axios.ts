import axios from "axios";

const axiosCustom = axios.create({
  baseURL: process.env.HTTP_SERVER,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
});
export default axiosCustom;
