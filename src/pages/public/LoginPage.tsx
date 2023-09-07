import { useNavigate, Navigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginProps, login } from "@src/features/auth/api";
import { useMutation } from "@tanstack/react-query";

import { useAuth } from "@src/features/auth/hooks";

import {
  InputWrapper,
  Label,
  Input,
  HelperErrorText,
} from "@src/components/form";
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
    // defaultValues: {
    //   username: "wenbin",
    //   password: "password",
    // },
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
    <div className="grid h-screen grid-rows-[1fr_2fr] gap-y-10 p-6 lg:px-8">
      <div className="mx-auto self-end">
        <img
          className="mx-auto h-24 w-auto"
          src="/brand/logo.svg"
          alt="Company Brand"
        />
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight">
          Sign in to your account
        </h2>
      </div>

      <div className="mx-auto w-full sm:max-w-sm">
        <form
          className="space-y-6"
          onSubmit={handleSubmit((data) => mutate(data))}
        >
          <InputWrapper>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              autoComplete="username"
              autoFocus
              disabled={isPending}
              invalid={!!errors.username}
              {...register("username")}
            />
            <HelperErrorText>{errors.username?.message}</HelperErrorText>
          </InputWrapper>

          <InputWrapper>
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a
                className="cursor-pointer text-sm font-semibold text-secondary-500 hover:text-secondary-600"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              disabled={isPending}
              invalid={!!errors.password}
              {...register("password")}
            />
            <HelperErrorText>{errors.password?.message}</HelperErrorText>
          </InputWrapper>

          <button
            className="btn w-full bg-primary text-on-primary"
            type="submit"
            disabled={isPending}
          >
            Sign in
          </button>
        </form>

        <p className="my-10 text-center text-sm text-gray-500">
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
