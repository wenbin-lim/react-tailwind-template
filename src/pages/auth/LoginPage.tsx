import { useNavigate } from "react-router-dom";
import { ReactComponent as CompanyLogo } from "@root/assets/up_logo_icon.svg";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth, LoginProps } from "@root/providers/authProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "@root/components/common/Toaster";
import { useState } from "react";
import { Input, Button } from "@root/components/common";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loggingIn, setLoggingIn] = useState(false);

  // Form
  const LoginSchema = z.object({
    username: z.string().min(1, "Please enter your username"),
    password: z.string().min(1, "Please enter your password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>({
    resolver: zodResolver(LoginSchema),
    // defaultValues: {
    //   username: "admin",
    //   password: "password123",
    // },
  });

  const onLogin = async (data: LoginProps) => {
    setLoggingIn(true);

    try {
      await login(data);

      toast.success("Login Successful");
    } catch (error) {
      toast.error("Invalid Credentials");
    }

    setLoggingIn(false);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <CompanyLogo className="mx-auto h-24 w-auto" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onLogin)}>
          <Input
            id="username"
            label="Username"
            type="text"
            autoComplete="username"
            errorText={errors.username?.message}
            {...register("username")}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            errorText={errors.password?.message}
            {...register("password")}
            inputHint={
              <a className="cursor-pointer font-semibold text-primary-600 hover:text-primary-500">
                Forgot password?
              </a>
            }
          />

          <Button
            className="bg-primary text-on-primary"
            type="submit"
            disabled={loggingIn}
          >
            Sign in
          </Button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <a
            onClick={() => navigate("/signup")}
            className="cursor-pointer font-semibold leading-6 text-primary-600 hover:text-primary-500"
          >
            Sign up now
          </a>
        </p>
      </div>
    </div>
  );
};
export default LoginPage;
