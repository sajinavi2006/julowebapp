import axios from "axios";
import enums from "../enums";

const $axios = axios.create({
  baseURL: enums.url.API_BASE,
  timeout: 500000
  // headers: { "Content-Type": "multipart/form-data" }
});

$axios.interceptors.request.use(function(res) {
  if (localStorage.token) {
    res.headers.common["Authorization"] = `Token ${localStorage.token}`;
  }
  if (res.url == "api/v1/images/") {
    res.headers.post["Content-Type"] = "multipart/form-data";
    res.headers.common["Content-Type"] = "multipart/form-data";
  }
  return res;
});
export default $axios;
