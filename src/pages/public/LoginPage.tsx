import { Navigate, NavLink } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema, LoginProps } from "@src/features/auth/api";
import { useAuth, useLogin } from "@src/features/auth/hooks";

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

const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  // Form
  const form = useForm<LoginProps>({
    resolver: zodResolver(LoginSchema),
  });

  // login logic
  const loginFn = useLogin();

  const onLogin = (credentials: LoginProps) => {
    loginFn.mutate(credentials, {
      onSuccess: () =>
        toast({
          description: "Login Successful",
        }),
      onError: () => {
        toast({
          variant: "destructive",
          description: "Invalid Credentials",
        });
        form.resetField("password");
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

      <Form {...form}>
        <form
          id="login-form"
          className="flex w-full flex-col gap-y-6 sm:max-w-sm"
          onSubmit={form.handleSubmit(onLogin)}
        >
          <FormField
            control={form.control}
            name="username"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    autoFocus
                    autoComplete="username"
                    disabled={loginFn.isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <Button
                    asChild
                    className="h-auto p-0 text-secondary"
                    variant="link"
                  >
                    <NavLink to="/forgot-password">Forgot password?</NavLink>
                  </Button>
                </div>
                <FormControl>
                  <Input
                    type="password"
                    autoComplete="current-password"
                    disabled={loginFn.isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="mt-6" type="submit" disabled={loginFn.isPending}>
            Sign in
          </Button>
        </form>
      </Form>

      <p className="text-center text-sm">
        Not a member?{" "}
        <Button asChild className="h-auto p-0 text-secondary" variant="link">
          <NavLink to="/signup">Sign up now</NavLink>
        </Button>
      </p>
    </main>
  );
};

export default LoginPage;
