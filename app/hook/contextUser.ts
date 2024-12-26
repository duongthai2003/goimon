import { type userType } from "@/lib/interface";

interface UserState {
  currentUser: userType | null; // Thay đổi kiểu dữ liệu nếu cần
  fetchUser: () => void;
}

import { create } from "zustand";
import { GetCurrentApi } from "./useUser";

// Tạo zustand store
const getCurentUser = create<UserState>((set) => {
  const fetchUser = async () => {
    const res = await GetCurrentApi();

    set({ currentUser: res?.data }); // Cập nhật trạng thái
  };

  const cookies =
    typeof document !== "undefined" &&
    Object.fromEntries(
      document.cookie
        .split("; ")
        .map((cookie) => cookie.split("=").map(decodeURIComponent))
    );

  const token = cookies["sessionToken"];
  // Gọi hàm fetchUser ngay lập tức
  if (token) {
    fetchUser();
  }
  return {
    currentUser: null, // Dữ liệu người dùng
    fetchUser, // Giữ fetchUser như một hàm để có thể gọi lại
  };
});

export { getCurentUser };
