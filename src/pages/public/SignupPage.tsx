import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupProps, SignupSchema } from "@src/features/auth/api";
import { useSignup } from "@src/features/auth/hooks";

import {
  InputWrapper,
  Label,
  Input,
  HelperErrorText,
} from "@src/components/form";

import toast from "react-hot-toast";
import {
  setServerValidationError,
  getGenericToastMessage,
} from "@src/utils/common";

const SignupPage = () => {
  const navigate = useNavigate();

  // Form
  const {
    register,
    handleSubmit,
    resetField,
    setError,
    formState: { errors },
  } = useForm<SignupProps>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      username: `admin${new Date().getTime() % 10000}`,
      email: `admin${new Date().getTime() % 10000}@email.com`,
      password: "password",
      passwordConfirm: "password",
    },
  });

  // signup logic
  const signupFn = useSignup();

  const onSignup = (newUser: SignupProps) => {
    signupFn.mutate(newUser, {
      onSuccess: () => {
        navigate("/login");
        toast.success("Signup Successful");
      },
      onError: (error) => {
        resetField("password");
        resetField("passwordConfirm");

        if (!setServerValidationError(error, setError)) {
          toast.error(getGenericToastMessage("error"));
        }
      },
    });
  };

  return (
    <main className="flex min-h-screen">
      <article className="flex flex-1 flex-col items-center justify-center gap-y-8 p-6 lg:flex-none lg:px-20">
        <section className="flex flex-col items-center gap-y-2">
          <img
            className="h-24 w-auto"
            src="/brand/logo.svg"
            alt="Company Brand"
          />
          <h2 className="text-2xl font-bold leading-9 tracking-tight">
            Create a new account
          </h2>
          <p className="text-sm leading-6 text-gray-500">
            Already have an account?{" "}
            <a
              className="cursor-pointer font-semibold leading-6 text-secondary-600 hover:text-secondary-500"
              onClick={() => navigate("/login")}
            >
              Log in now
            </a>
          </p>
        </section>

        <form
          id="sign-up-form"
          className="flex w-full max-w-sm flex-col gap-y-4 lg:w-96"
          onSubmit={handleSubmit(onSignup)}
        >
          <InputWrapper>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              autoComplete="username"
              autoFocus
              disabled={signupFn.isPending}
              invalid={!!errors.username}
              {...register("username")}
            />
            <HelperErrorText isError={true}>
              {errors.username?.message}
            </HelperErrorText>
          </InputWrapper>

          <InputWrapper>
            <Label htmlFor="email" required>
              Email
            </Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              disabled={signupFn.isPending}
              invalid={!!errors.email}
              {...register("email")}
            />
            <HelperErrorText isError={true}>
              {errors.email?.message}
            </HelperErrorText>
          </InputWrapper>

          <InputWrapper>
            <Label htmlFor="password" required>
              Password
            </Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              disabled={signupFn.isPending}
              invalid={!!errors.password}
              {...register("password")}
            />
            <HelperErrorText isError={true}>
              {errors.password?.message}
            </HelperErrorText>
          </InputWrapper>

          <InputWrapper>
            <Label htmlFor="passwordConfirm" required>
              Confirm Password
            </Label>
            <Input
              id="passwordConfirm"
              type="password"
              autoComplete="current-password"
              required
              disabled={signupFn.isPending}
              invalid={!!errors.password || !!errors.passwordConfirm}
              {...register("passwordConfirm")}
            />
            <HelperErrorText isError={true}>
              {errors.password?.message || errors.passwordConfirm?.message}
            </HelperErrorText>
          </InputWrapper>

          <button
            className="btn mt-6 w-full bg-primary text-on-primary"
            type="submit"
            disabled={signupFn.isPending}
          >
            Sign up
          </button>
        </form>
      </article>

      <figure className="relative hidden w-0 flex-1 lg:block">
        <figcaption>Sign up page image</figcaption>
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
        />
      </figure>
    </main>
  );
};
export default SignupPage;
