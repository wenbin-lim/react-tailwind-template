import { useNavigate, Navigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema, LoginProps } from "@src/features/auth/api";
import { useAuth, useLogin } from "@src/features/auth/hooks";

import { Button } from "@src/components/ui/button";
import {
  InputWrapper,
  Label,
  Input,
  HelperErrorText,
} from "@src/components/form";
import toast from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Form
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<LoginProps>({
    resolver: zodResolver(LoginSchema),
  });

  // login logic
  const loginFn = useLogin();

  const onLogin = (credentials: LoginProps) => {
    loginFn.mutate(credentials, {
      onSuccess: () => toast.success("Login Successful"),
      onError: () => {
        toast.error("Invalid Credentials");
        resetField("password");
      },
    });
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-y-10 p-6 lg:px-8">
      <section className="flex flex-col items-center gap-y-2">
        <img
          className="h-24 w-auto"
          src="/brand/logo.svg"
          alt="Company Brand"
        />
        <h2 className="text-2xl font-bold leading-9 tracking-tight">
          Sign in to your account
        </h2>
      </section>

      <form
        id="login-form"
        className="flex w-full flex-col gap-y-6 sm:max-w-sm"
        onSubmit={handleSubmit(onLogin)}
      >
        <InputWrapper>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            autoComplete="username"
            autoFocus
            disabled={loginFn.isPending}
            invalid={!!errors.username}
            {...register("username")}
          />
          <HelperErrorText isError={true}>
            {errors.username?.message}
          </HelperErrorText>
        </InputWrapper>

        <InputWrapper>
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <a
              className="text-secondary-500 hover:text-secondary-600 cursor-pointer text-sm font-semibold"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            disabled={loginFn.isPending}
            invalid={!!errors.password}
            {...register("password")}
          />
          <HelperErrorText isError={true}>
            {errors.password?.message}
          </HelperErrorText>
        </InputWrapper>

        <Button className="mt-6" type="submit" disabled={loginFn.isPending}>
          Sign in
        </Button>

        <p className="text-center text-sm text-gray-500">
          Not a member?{" "}
          <a
            onClick={() => navigate("/signup")}
            className="text-secondary-600 hover:text-secondary-500 cursor-pointer font-semibold leading-6"
          >
            Sign up now
          </a>
        </p>
      </form>
    </main>
  );
};

export default LoginPage;
