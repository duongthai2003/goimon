"use client";
import { getCurentUser } from "@/app/hook/contextUser";
import { LogoutApi } from "@/app/hook/useUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MenuUser = () => {
  const { currentUser, fetchUser } = getCurentUser();
  const shortName = currentUser?.name
    .split(" ") // Tách chuỗi thành mảng dựa trên dấu cách
    .map((word) => word[0]) // Lấy ký tự đầu tiên của mỗi từ
    .join("");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className=" flex justify-center items-center size-10 border border-black rounded-full">
          <p className="text-[14px] uppercase">{shortName}</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={async () => {
            await LogoutApi();
            fetchUser();
          }}
        >
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuUser;
