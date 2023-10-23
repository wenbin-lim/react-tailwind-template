import { NavLink } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RequestPasswordChangeSchema,
  RequestPasswordChangeProps,
} from "@src/features/auth/api";
import { useRequestPasswordChange } from "@src/features/auth/hooks";

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

const ForgotPassword = () => {
  const { toast } = useToast();

  // Form
  const form = useForm<RequestPasswordChangeProps>({
    resolver: zodResolver(RequestPasswordChangeSchema),
  });

  // request password change logic
  const requestPasswordChangeFn = useRequestPasswordChange();

  const onRequestPasswordChange = (data: RequestPasswordChangeProps) => {
    requestPasswordChangeFn.mutate(data, {
      onSuccess: () =>
        toast({
          description: "Password reset link has been sent to your email",
        }),
      onError: (error) => {
        form.reset();
        toast({
          variant: "destructive",
          description: error.message,
        });
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

      <Form {...form}>
        <form
          id="forgot-password-form"
          className="flex w-full flex-col gap-y-6 sm:max-w-sm"
          onSubmit={form.handleSubmit(onRequestPasswordChange)}
        >
          <FormField
            control={form.control}
            name="email"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Email</FormLabel>
                <FormControl>
                  <Input
                    autoFocus
                    type="email"
                    autoComplete="email"
                    disabled={requestPasswordChangeFn.isPending}
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
            disabled={requestPasswordChangeFn.isPending}
          >
            Request Password Link
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
export default ForgotPassword;
