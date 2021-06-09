import axios from "axios";

// const API_URL =
//   "http://ec2-13-228-170-234.ap-southeast-1.compute.amazonaws.com/api";

const API_URL = "http://13.76.47.191:5000/api/";

const API = axios.create({
  baseURL: API_URL
});

API.defaults.headers.post["Content-Type"] = "application/json";
API.defaults.headers.post["Cache-Control"] = "no-cache";

export default API;
