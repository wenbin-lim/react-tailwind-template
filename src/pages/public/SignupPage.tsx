import { useNavigate, NavLink } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupProps, SignupSchema } from "@src/features/auth/api";
import { useSignup } from "@src/features/auth/hooks";

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

const SignupPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Form
  const form = useForm<SignupProps>({
    resolver: zodResolver(SignupSchema),
  });

  // signup logic
  const signupFn = useSignup();

  const onSignup = (newUser: SignupProps) => {
    signupFn.mutate(newUser, {
      onSuccess: () => {
        navigate("/login");
        toast({
          description: "Signup Successful",
        });
      },
      onError: (error) => {
        form.resetField("password");
        form.resetField("passwordConfirm");
        toast({
          variant: "destructive",
          description: error.message,
        });
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
          <p className="text-center text-sm">
            Already have an account?{" "}
            <Button
              asChild
              className="h-auto p-0 text-secondary"
              variant="link"
            >
              <NavLink to="/login">Log in now</NavLink>
            </Button>
          </p>
        </section>

        <Form {...form}>
          <form
            id="sign-up-form"
            className="flex w-full max-w-sm flex-col gap-y-4 lg:w-96"
            onSubmit={form.handleSubmit(onSignup)}
          >
            <FormField
              control={form.control}
              name="email"
              defaultValue=""
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="email"
                      disabled={signupFn.isPending}
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="current-password"
                      disabled={signupFn.isPending}
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
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="current-password"
                      disabled={signupFn.isPending}
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
              disabled={signupFn.isPending}
            >
              Sign up
            </Button>
          </form>
        </Form>
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
