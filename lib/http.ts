import axios from "axios";

const HTTP = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ROOT_Api,
});

HTTP.interceptors.request.use((req) => {
  const token = localStorage.getItem("accessToken");
  if (token && req.headers) {
    req.headers["Authorization"] = `Bearer ${token}`;
  }
  return req;
});
HTTP.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response?.status === 401) {
      window.location.href = "/login";
    } else if (err.response?.status === 403) {
      alert("Truy cập bị từ chối");
    }
    throw err;
  }
);

export default HTTP;
