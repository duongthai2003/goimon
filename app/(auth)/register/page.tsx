"use client";
import { Input } from "@/components/ui/input";
import { ErrorMessage } from "../_components/ErrorMessage";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { getToastBody } from "@/app/(root)/_components/ToastBody";
import { useToast } from "@/hooks/use-toast";
import { RegisterApi } from "@/app/hook/useUser";
import { getCurentUser } from "@/app/hook/contextUser";
const regidterFormSchema = z
  .object({
    name: z.string().min(1, { message: "Vui lòng nhập tên" }),
    email: z.string().min(1, { message: "Vui lòng nhập email" }),
    password: z.string().min(1, { message: "Vui lòng nhập mật khẩu" }),
    confirmPassword: z.string().min(1, { message: "Nhập lại mật khẩu" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "mật khẩu chua khớp",
    path: ["confirmPassword"],
  });

const Register = ({}) => {
  const { fetchUser } = getCurentUser();
  const router = useRouter();
  const { toast } = useToast();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<z.infer<typeof regidterFormSchema>>({
    resolver: zodResolver(regidterFormSchema),
  });

  const onSubmit = async (data: z.infer<typeof regidterFormSchema>) => {
    try {
      await RegisterApi(data);
      fetchUser();
      toast({
        description: getToastBody("success", "Đăng ký thành công"),
        duration: 1000,
      });
      router.push("/");
    } catch (err) {
      console.log(err);
      toast({
        description: getToastBody("success", "Đăng ký thất bại"),
        duration: 1000,
      });
    }
  };
  return (
    <div>
      <form
        className="max-w-[400px] m-auto border border-[#ccc] px-6 py-5 rounded-[15px] mt-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-[25px] font-medium text-center">Đăng ký</p>
        <div>
          <label htmlFor="name">
            <p className="mb-3">Tên</p>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <ErrorMessage title={errors.name?.message} className="mt-3" />
            )}
          </label>
          <label htmlFor="email">
            <p className="my-3">Email</p>
            <Input type="email" id="email" {...register("email")} />
            {errors.email && (
              <ErrorMessage title={errors.email?.message} className="mt-3" />
            )}
          </label>
          <label htmlFor="Password">
            <p className="my-3">Nhập mật khẩu</p>
            <Input type="password" id="password" {...register("password")} />
            {errors.password && (
              <ErrorMessage title={errors.password?.message} className="mt-3" />
            )}
          </label>
          <label htmlFor="rePassword">
            <p className="my-3">Nhập lại mật khẩu</p>
            <Input
              type="password"
              id="rePassword"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <ErrorMessage
                title={errors.confirmPassword?.message}
                className="mt-3"
              />
            )}
          </label>
        </div>
        <div className="mt-5 text-center">
          <Button>Đăng ký</Button>
        </div>
      </form>
    </div>
  );
};
export default Register;
