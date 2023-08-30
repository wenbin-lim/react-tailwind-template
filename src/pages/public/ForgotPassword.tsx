import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RequestPasswordChangeSchema,
  RequestPasswordChangeProps,
  requestPasswordChange,
} from "@src/features/auth/api";
import { useMutation } from "@tanstack/react-query";

import { Input } from "@src/components/form";
import { Button } from "@src/components/buttons";

import toast from "react-hot-toast";
import { getGenericToastMessage } from "@src/utils/toast";

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

  const { mutate, isPending } = useMutation({
    mutationFn: requestPasswordChange,
  });

  const onSubmit = async (data: RequestPasswordChangeProps) => {
    // console.log(data);

    mutate(data, {
      onSuccess: () => {
        toast.success("Password reset link has been sent to your email");
      },
      onError: () => {
        reset();
        toast.error(getGenericToastMessage("error"));
      },
    });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-24 w-auto"
          src="/brand/logo.svg"
          alt="Company Brand"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          Forgot your password?
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="email"
            label="Email"
            type="email"
            autoFocus
            errorText={errors.email?.message}
            disabled={isPending}
            {...register("email")}
          />

          <Button
            className="w-full bg-primary text-on-primary"
            type="submit"
            disabled={isPending}
          >
            Send password reset
          </Button>

          <p className="mt-10 text-center text-sm text-gray-500">
            Changed your password?{" "}
            <a
              onClick={() => navigate("/login")}
              className="cursor-pointer font-semibold leading-6 text-secondary-600 hover:text-secondary-500"
            >
              Login now
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};
export default ForgotPassword;
