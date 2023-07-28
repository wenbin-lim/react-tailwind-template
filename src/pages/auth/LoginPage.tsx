import { useNavigate } from "react-router-dom";
import { ReactComponent as CompanyLogo } from "@root/assets/up_logo_icon.svg";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth, LoginProps } from "@root/providers/authProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "@root/components/common/Toaster";
import { useState } from "react";
import clsx from "clsx";

interface Props {}
const LoginPage = ({}: Props) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loggingIn, setLoggingIn] = useState(false);

  // Form
  const LoginSchema = z.object({
    username: z.string().min(2),
    password: z.string().min(2),
  });

  const { register, handleSubmit } = useForm<LoginProps>({
    resolver: zodResolver(LoginSchema),
    // defaultValues: {
    //   username: "admin",
    //   password: "password",
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
          <div>
            <label htmlFor="username" className="input-label">
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                className="input"
                type="text"
                autoComplete="username"
                {...register("username")}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <div className="text-sm">
                <a className="cursor-pointer font-semibold text-primary-600 hover:text-primary-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                className="input"
                type="password"
                autoComplete="current-password"
                {...register("password")}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={clsx(
                "btn flex w-full justify-center bg-primary text-on-primary",
                { "btn-disabled": loggingIn },
              )}
              disabled={loggingIn}
            >
              Sign in
            </button>
          </div>
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
