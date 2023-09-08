import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RequestPasswordChangeSchema,
  RequestPasswordChangeProps,
} from "@src/features/auth/api";
import { useRequestPasswordChange } from "@src/features/auth/hooks";

import {
  InputWrapper,
  Label,
  Input,
  HelperErrorText,
} from "@src/components/form";

import toast from "react-hot-toast";
import { getGenericToastMessage } from "@src/utils/common";

const ForgotPassword = () => {
  const navigate = useNavigate();

  // Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RequestPasswordChangeProps>({
    resolver: zodResolver(RequestPasswordChangeSchema),
  });

  // request password change logic
  const requestPasswordChangeFn = useRequestPasswordChange();

  const onRequestPasswordChange = (data: RequestPasswordChangeProps) => {
    requestPasswordChangeFn.mutate(data, {
      onSuccess: () =>
        toast.success("Password reset link has been sent to your email"),
      onError: () => {
        reset();
        toast.error(getGenericToastMessage("error"));
      },
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-y-10 p-6 lg:px-8">
      <section className="flex flex-col items-center gap-y-2">
        <img
          className="h-24 w-auto"
          src="/brand/logo.svg"
          alt="Company Brand"
        />
        <h2 className="text-2xl font-bold leading-9 tracking-tight">
          Forgot your password?
        </h2>
      </section>

      <form
        id="forgot-password-form"
        className="flex w-full flex-col gap-y-6 sm:max-w-sm"
        onSubmit={handleSubmit(onRequestPasswordChange)}
      >
        <InputWrapper>
          <Label htmlFor="email">Your Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            autoFocus
            disabled={requestPasswordChangeFn.isPending}
            invalid={!!errors.email}
            {...register("email")}
          />
          <HelperErrorText isError={true}>
            {errors.email?.message}
          </HelperErrorText>
        </InputWrapper>
        <button
          className="btn mt-12 w-full bg-primary text-on-primary"
          type="submit"
          disabled={requestPasswordChangeFn.isPending}
        >
          Request Password Link
        </button>

        <p className="text-center text-sm text-gray-500">
          Password changed?{" "}
          <a
            onClick={() => navigate("/login")}
            className="cursor-pointer font-semibold leading-6 text-secondary-600 hover:text-secondary-500"
          >
            Try login
          </a>
        </p>
      </form>
    </main>
  );
};
export default ForgotPassword;
