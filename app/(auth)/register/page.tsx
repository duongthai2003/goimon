import { Input } from "@/components/ui/input";
import { ErrorMessage } from "../_components/ErrorMessage";
import { z } from "zod";
const regidterFormSchema = z.object({
  email: z.string().min(1, { message: "Vui lòng nhập email" }),
  password,
});

const Register = ({}) => {
  return (
    <div>
      <form>
        <p>Đăng ký</p>
        <div>
          <label htmlFor="email">
            <p className="mb-3">Email</p>
            <Input id="email" {...register("email")} />
            {errors.email && (
              <ErrorMessage title={errors.email?.message} className="mt-3" />
            )}
          </label>
          <label htmlFor="Password">
            <p className="mb-3">Password</p>
            <Input id="password" {...register("password")} />
            {errors.password && (
              <ErrorMessage title={errors.password?.message} className="mt-3" />
            )}
          </label>
        </div>
      </form>
    </div>
  );
};
export default Register;
