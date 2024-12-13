"use client";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

export const Hearder = ({}) => {
  const { setTheme, theme } = useTheme();
  const router = useRouter();
  const lightIcon = () => {
    if (window) {
      return theme === "light" ? (
        <div
          className="border border-[#ccc] px-2 py-1 rounded-md"
          onClick={() => {
            setTheme("dark");
          }}
        >
          <Moon />
        </div>
      ) : (
        <div
          className="border border-white px-2 py-1 rounded-md"
          onClick={() => {
            setTheme("light");
          }}
        >
          <Sun />
        </div>
      );
    }
  };
  return (
    <div className=" flex justify-between items-center px-5 py-5 pb-3 border-b border-[#ccc]">
      <div className="flex gap-4">
        <p>Trang chủ</p>
        <p>Món ăn</p>
        <p>Đơn hàng</p>
      </div>
      <div className="flex gap-4 items-center">
        <div>{lightIcon()}</div>
        <div className="flex gap-4">
          <Button
            onClick={() => {
              router.push("/login");
            }}
          >
            Đăng Nhập
          </Button>
          <Button
            onClick={() => {
              router.push("/register");
            }}
          >
            Đăng ký
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hearder;
