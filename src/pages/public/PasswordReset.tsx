import { NavLink, useParams, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PasswordResetSchema,
  PasswordResetProps,
} from "@src/features/auth/api";
import { usePasswordReset } from "@src/features/auth/hooks";

import { Button } from "@src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@src/components/ui/form";
import { Input } from "@src/components/ui/input";

import { useToast } from "@src/components/toast/use-toast";

const PasswordReset = () => {
  const navigate = useNavigate();
  const { code } = useParams();
  const { toast } = useToast();

  // Form
  const form = useForm<PasswordResetProps>({
    resolver: zodResolver(PasswordResetSchema),
  });

  // password reset logic
  const resetPasswordFn = usePasswordReset();

  const onPasswordReset = (data: PasswordResetProps) => {
    if (!code) {
      return toast({
        variant: "destructive",
        description: "Invalid password reset link, please request a new one!",
      });
    }

    resetPasswordFn.mutate(
      {
        ...data,
        code,
      },
      {
        onSuccess: () => {
          toast({
            description: "Password has been successfully changed!",
          });
          navigate("/login");
        },
        onError: (error) => {
          form.reset();
          toast({
            variant: "destructive",
            description: error.message,
          });
        },
      },
    );
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
          Resetting your password
        </h2>
      </section>

      <Form {...form}>
        <form
          id="password-reset-form"
          className="flex w-full flex-col gap-y-6 sm:max-w-sm"
          onSubmit={form.handleSubmit(onPasswordReset)}
        >
          <input type="text" name="username" hidden />

          <FormField
            control={form.control}
            name="password"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    autoComplete="current-password"
                    disabled={resetPasswordFn.isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordConfirm"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    autoComplete="current-password"
                    disabled={resetPasswordFn.isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="mt-6"
            type="submit"
            disabled={resetPasswordFn.isPending}
          >
            Submit
          </Button>
        </form>
      </Form>

      <p className="text-center text-sm">
        Password changed?{" "}
        <Button asChild className="h-auto p-0 text-secondary" variant="link">
          <NavLink to="/login">Try login</NavLink>
        </Button>
      </p>
    </main>
  );
};
export default PasswordReset;
