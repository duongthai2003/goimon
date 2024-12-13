"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ErrorMessage } from "../_components/ErrorMessage";
import HTTP from "@/lib/http";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { getToastBody } from "@/app/(root)/_components/ToastBody";
import { getuser } from "@/app/hook/useUser";

const loginFormSchema = z.object({
  email: z.string().min(1, { message: "con mẹ mày nhập vào đây" }),
  password: z
    .string({ required_error: "Vui lòng nhập mật khẩu" })
    .min(1, { message: "Vui lòng nhập mật khẩu" }),
});

export const Login = ({}) => {
  // const { data, inc } = getuser();
  const { user } = getuser();

  console.log(user);

  const router = useRouter();
  const { toast } = useToast();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });
  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    try {
      const res = await HTTP.post("/auth/login", {
        ...data,
      });
      localStorage.setItem("accessToken", res.data.data.token);
      router.push("/");
      toast({
        description: getToastBody("success", "Đăng nhập thành công"),
      });
    } catch (err) {
      console.log(err);
      toast({
        description: getToastBody("error", "Đăng nhập thất bại"),
      });
      setErrorMessage("Email hoac mat khau khoong chinh xac");
    }
  };
  return (
    <div className="h-screen">
      <form
        className=" max-w-[400px] m-auto border border-[#ccc] px-6 py-5 rounded-[15px] mt-40"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-[25px] font-medium text-center">Đăng Nhập</p>
        {errorMessage !== "" && (
          <ErrorMessage title={errorMessage} className="my-3" />
        )}
        <div>
          <label htmlFor="email">
            <p className="mb-3">Email</p>
            <Input type="email" id="email" {...register("email")} />
            {errors.email && (
              <ErrorMessage title={errors.email?.message} className="mt-3" />
            )}
          </label>
          <label htmlFor="Password">
            <p className="mt-3">Password</p>
            <Input id="password" {...register("password")} />
            {errors.password && (
              <ErrorMessage title={errors.password?.message} className="mt-3" />
            )}
          </label>
        </div>
        <div className="mt-5 text-center">
          <Button>Đăng Nhập</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
