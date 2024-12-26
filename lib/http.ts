import axios from "axios";

const HTTP = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ROOT_Api,
  withCredentials: true,
});

HTTP.interceptors.request.use(async (req) => {
  const cookieString = document.cookie;
  const cookies = Object.fromEntries(
    cookieString
      .split("; ")
      .map((cookie) => cookie.split("=").map(decodeURIComponent))
  );
  // const token = localStorage.getItem("accessToken");
  const token = cookies["sessionToken"];
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
