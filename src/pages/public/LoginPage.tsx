import { useNavigate, Navigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginProps, login } from "@src/features/auth/api";
import { useMutation } from "@tanstack/react-query";

import { useAuth } from "@src/features/auth/hooks";

import { Input } from "@src/components/form";
import { Button } from "@src/components/buttons";
import toast from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isValidToken } = useAuth();

  // Form
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<LoginProps>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "wenbin",
      password: "password",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success("Login Successful");
    },
    onError: () => {
      toast.error("Invalid Credentials");
      resetField("password");
    },
  });

  if (isValidToken) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-24 w-auto"
          src="/brand/logo.svg"
          alt="Company Brand"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          onSubmit={handleSubmit((data) => mutate(data))}
        >
          <Input
            id="username"
            label="Username"
            type="text"
            autoFocus
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
              <a className="cursor-pointer font-semibold text-secondary-600 hover:text-secondary-500">
                Forgot password?
              </a>
            }
          />

          <Button
            className="w-full bg-primary text-on-primary"
            type="submit"
            disabled={isPending}
          >
            Sign in
          </Button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <a
            onClick={() => navigate("/signup")}
            className="cursor-pointer font-semibold leading-6 text-secondary-600 hover:text-secondary-500"
          >
            Sign up now
          </a>
        </p>
      </div>
    </div>
  );
};
export default LoginPage;
