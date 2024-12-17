import HTTP from "@/lib/http";

interface UserState {
  user: string; // Thay đổi kiểu dữ liệu nếu cần
  fetchUser: () => Promise<void>;
}

import { create } from "zustand";

// Tạo zustand store
const getCurentUser = create<UserState>((set) => {
  const fetchUser = async () => {
    try {
      const res = await HTTP.get("/account/me");
      set({ user: res.data.data }); // Cập nhật trạng thái
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Gọi hàm fetchUser ngay lập tức
  if (localStorage.getItem("accessToken")) {
    fetchUser();
  }

  return {
    user: "", // Dữ liệu người dùng
    fetchUser, // Giữ fetchUser như một hàm để có thể gọi lại
  };
});

export { getCurentUser };
