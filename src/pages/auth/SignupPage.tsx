import { useNavigate } from "react-router-dom";
import { ReactComponent as CompanyLogo } from "@root/assets/up_logo_icon.svg";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { RegisterProps, useAuth } from "@root/providers/authProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "@root/components/common/Toaster";
import { useState } from "react";
import { Input, Button } from "@root/components/common";

// Regex
/* 
  Usernames can only have: 
  - Letters (a-z A-Z) 
  - Numbers (0-9)
  - Dots (.)
  - Underscores (_)
*/
const USERNAME_REGEX = /^[a-zA-Z0-9_.]+$/;

/* 
  Passwords cannot have any spaces within (simple)
  Passwords need 1 symbol, upper and lowercase and a digit (complex)
*/
const PASSWORD_REGEX = /^\S{8,}$/;
// const PASSWORD_REGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]){8,}$/;

const SignupPage = () => {
  const navigate = useNavigate();
  const { register: signup } = useAuth();
  const [signingUp, setSigningUp] = useState(false);
  //
  // Form
  const LoginSchema = z
    .object({
      username: z
        .string()
        .trim()
        .min(4, "Please enter an username with at least 4 characters")
        .regex(
          USERNAME_REGEX,
          "Valid characters are characters, digits, dots and underscores",
        )
        .toLowerCase(),
      email: z.string().email(),
      // email: z.union([z.string().email().nullish(), z.literal("")]),
      password: z
        .string()
        .regex(PASSWORD_REGEX, "Please enter a valid password")
        .min(8, "Please enter a password with at least 8 characters"),
      passwordConfirm: z
        .string()
        .min(8, "Please enter a password with at least 8 characters"),
    })
    .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
      message: "Passwords do not match",
      path: ["passwordConfirm"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterProps>({
    resolver: zodResolver(LoginSchema),
    // defaultValues: {
    //   username: `admin${new Date().getTime() % 10000}`,
    //   email: `admin${new Date().getTime() % 10000}@email.com`,
    //   password: "password",
    //   passwordConfirm: "password",
    // },
  });

  const onSignup = async (data: RegisterProps) => {
    setSigningUp(true);
    try {
      await signup(data);
      toast.success("Signup Successful");
    } catch (error) {
      toast.error("Failed to register account, please try again later");
    }
    setSigningUp(false);
  };

  return (
    <div className="flex min-h-full flex-1">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <CompanyLogo className="mx-auto h-24 w-auto" />
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create a new account
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Already have an account?{" "}
              <a
                onClick={() => navigate("/login")}
                className="cursor-pointer font-semibold leading-6 text-primary-600 hover:text-primary-500"
              >
                Log in now
              </a>
            </p>
          </div>

          <div className="mt-6">
            <div>
              <form className="space-y-4" onSubmit={handleSubmit(onSignup)}>
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
                    className="bg-primary text-on-primary"
                    type="submit"
                    disabled={signingUp}
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
