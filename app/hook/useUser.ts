import HTTP from "@/lib/http";

interface UserState {
  user: string; // Thay đổi kiểu dữ liệu nếu cần
  fetchUser: () => void;
}

import { create } from "zustand";

// Tạo zustand store
const ad = async (set) => {
  try {
    const res = await HTTP.get("/account/me"); // Gọi API
    set({ user: res.data.data }); // Cập nhật trạng thái
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
const getuser = create<UserState>((set) => ({
  user: "", // Dữ liệu người dùng
  fetchUser: () => {
    ad(set); // Gọi hàm bất đồng bộ
  },
}));

export { getuser };
