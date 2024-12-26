import HTTP from "@/lib/http";
import { userLoginType, userRegisterType } from "@/lib/interface";
import axios from "axios";
// import { cookies } from "next/headers";

const GetCurrentApi = async () => {
  try {
    const res = await HTTP.get("/account/me");

    return res.data;
  } catch (error) {
    console.log("Error fetching user data:", error);
  }
};
// const as = async () => {
//   return (await cookies()).delete("sessionToken");
// };

const LogoutApi = async () => {
  try {
    const res = await HTTP.post("/auth/logout");

    return res.data;
  } catch (error) {
    console.log("Error fetching user data:", error);
  }
};
const RegisterApi = async (data: userRegisterType) => {
  try {
    const res = await HTTP.post("/auth/register", {
      ...data,
    });
    localStorage.setItem("accessToken", res.data.data.token);

    return res.data;
  } catch (error) {
    console.log("Error fetching user data:", error);
  }
};
const LoginApi = async (data: userLoginType) => {
  try {
    const res = await HTTP.post("/auth/login", {
      ...data,
    });
    // localStorage.setItem("accessToken", res.data.data.token);
    console.log("22222", res.data);
    const af = await axios.post(
      "http://localhost:3000/api/auth",
      {
        ...res.data,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("22222", af);
    return res.data;
  } catch (error) {
    console.log("Error fetching user data:", error);
  }
};

export { GetCurrentApi, LogoutApi, RegisterApi, LoginApi };
