import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterProps,
  RegisterSchema,
  register as signup,
} from "@src/features/auth/api";
import { useMutation } from "@tanstack/react-query";

import { Input } from "@src/components/form";
import { Button } from "@src/components/buttons";

import toast from "react-hot-toast";
import { setPbServerErrors } from "@src/utils/pocketbase";

const SignupPage = () => {
  const navigate = useNavigate();

  // Form
  const {
    register,
    handleSubmit,
    resetField,
    setError,
    formState: { errors },
  } = useForm<RegisterProps>({
    resolver: zodResolver(RegisterSchema),
    // defaultValues: {
    //   username: `admin${new Date().getTime() % 10000}`,
    //   email: `admin${new Date().getTime() % 10000}@email.com`,
    //   password: "password",
    //   passwordConfirm: "password",
    // },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      navigate("/login");
      toast.success("Signup Successful");
    },
    onError: (error) => {
      resetField("password");
      resetField("passwordConfirm");
      if (setPbServerErrors(error, setError)) {
        toast.error("Please check form for invalid values");
      } else {
        toast.error("Failed to register account, please try again later");
      }
    },
  });

  return (
    <div className="flex min-h-full flex-1">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <img
              className="mx-auto h-24 w-auto"
              src="/brand/logo.svg"
              alt="Company Brand"
            />
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight">
              Create a new account
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Already have an account?{" "}
              <a
                onClick={() => navigate("/login")}
                className="cursor-pointer font-semibold leading-6 text-secondary-600 hover:text-secondary-500"
              >
                Log in now
              </a>
            </p>
          </div>

          <div className="mt-6">
            <div>
              <form
                className="space-y-4"
                onSubmit={handleSubmit((data) => mutate(data))}
              >
                <Input
                  id="username"
                  label="Username"
                  type="text"
                  autoComplete="username"
                  required
                  errorText={errors.username?.message}
                  {...register("username")}
                />

                <Input
                  id="email"
                  label="Email"
                  type="text"
                  autoComplete="email"
                  required
                  errorText={errors.email?.message}
                  {...register("email")}
                />

                <Input
                  id="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  required
                  errorText={errors.password?.message}
                  {...register("password")}
                />

                <Input
                  id="passwordConfirm"
                  label="Confirm Password"
                  type="password"
                  autoComplete="current-password"
                  required
                  errorText={errors.passwordConfirm?.message}
                  {...register("passwordConfirm")}
                />

                <div className="pt-6">
                  <Button
                    className="w-full bg-primary text-on-primary"
                    type="submit"
                    disabled={isPending}
                  >
                    Sign up
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt=""
        />
      </div>
    </div>
  );
};
export default SignupPage;
