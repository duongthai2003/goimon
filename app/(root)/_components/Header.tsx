"use client";

import { getCurentUser } from "@/app/hook/contextUser";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import MenuUser from "./MenuUser";
export const Hearder = ({}) => {
  const { setTheme, theme } = useTheme();
  const router = useRouter();
  const { currentUser } = getCurentUser();
  console.log("uerrrrr", currentUser);

  const lightIcon = () => {
    if (typeof window !== undefined) {
      return (
        <div
          className={
            "border border-black dark:border-[#ccc] px-2 py-1 rounded-md"
          }
          onClick={() => {
            if (theme === "light") {
              setTheme("dark");
            } else {
              setTheme("light");
            }
          }}
        >
          <Moon className="dark:hidden" />
          <Sun className=" hidden dark:block" />
        </div>
      );
    }
    return "";
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

        {currentUser ? (
          <MenuUser />
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default Hearder;
