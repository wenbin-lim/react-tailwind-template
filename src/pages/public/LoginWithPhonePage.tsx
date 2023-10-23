import { useState } from "react";
import { useEffectOnce } from "usehooks-ts";
import { Navigate, NavLink } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  LoginWithPhoneSchema,
  LoginWithPhoneProps,
} from "@src/features/auth/api";
import { useAuth, useLoginWithPhone } from "@src/features/auth/hooks";

import { Button } from "@src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@src/components/ui/form";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@src/components/ui/alert-dialog";
import { Input } from "@src/components/ui/input";

import { useToast } from "@src/components/toast/use-toast";

import {
  getAuth,
  ApplicationVerifier,
  RecaptchaVerifier,
  ConfirmationResult,
} from "firebase/auth";

const LoginWithPhonePage = () => {
  const auth = getAuth();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  // Form
  const form = useForm<LoginWithPhoneProps>({
    resolver: zodResolver(LoginWithPhoneSchema),
  });

  // recaptcha
  const [appVerifier, setAppVerifier] = useState<ApplicationVerifier>();
  const createRecaptcha = async () => {
    try {
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha-container", {});
      await recaptcha.render();
      setAppVerifier(recaptcha);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const destroyRecaptcha = () => {
    if (appVerifier instanceof RecaptchaVerifier) {
      appVerifier.clear();
    }
  };

  const recreateRecaptcha = async () => {
    destroyRecaptcha();
    return await createRecaptcha();
  };

  useEffectOnce(() => {
    createRecaptcha();

    return () => {
      destroyRecaptcha();
    };
  });

  // login logic
  const loginFn = useLoginWithPhone();
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult>();

  const [openOTPModal, setOpenOTPModal] = useState(false);
  const [OTP, setOTP] = useState("");
  const [otpSubmitLoading, setOtpSubmitLoading] = useState(false);

  const onLogin = async ({ phoneNumber }: LoginWithPhoneProps) => {
    if (!appVerifier) return;

    await appVerifier.verify();

    loginFn.mutate(
      {
        phoneNumber: `+65${phoneNumber}`,
        appVerifier,
      },
      {
        onSuccess: (data) => {
          setOpenOTPModal(true);
          setConfirmationResult(data);
        },
        onError: async (error) => {
          form.resetField("phoneNumber");
          await recreateRecaptcha();

          toast({
            variant: "destructive",
            description: error.message,
          });
        },
      },
    );
  };

  const onOTPSubmit = async () => {
    setOtpSubmitLoading(true);
    if (!confirmationResult) return;

    try {
      await confirmationResult.confirm(OTP);
      setOtpSubmitLoading(false);
    } catch (error) {
      console.error(error);
      setOtpSubmitLoading(false);
      toast({
        variant: "destructive",
        description: "Invalid OTP, please try again",
      });
    }
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
          Sign in with your phone
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
            name="phoneNumber"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <div className="relative">
                  <div className="absolute top-1/2 flex h-[17px] -translate-y-1/2 items-center px-3 text-sm font-bold">
                    +65
                  </div>
                  <FormControl className="pl-12">
                    <Input autoFocus disabled={loginFn.isPending} {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div id="recaptcha-container" className="self-center" />

          <Button disabled={loginFn.isPending}>Sign in</Button>
        </form>
      </Form>

      <p className="text-center text-sm">
        Not a member?{" "}
        <Button asChild className="h-auto p-0 text-secondary" variant="link">
          <NavLink to="/signup">Sign up now</NavLink>
        </Button>
      </p>

      <AlertDialog open={openOTPModal} onOpenChange={setOpenOTPModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              An OTP has been sent to your phone number
            </AlertDialogTitle>
            <AlertDialogDescription>
              <span>Please enter your OTP to continue</span>
              <Input
                className="mt-2"
                value={OTP}
                onChange={(e) => setOTP(e.target.value)}
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-y-2">
            <Button
              variant="outline"
              onClick={async () => {
                setConfirmationResult(undefined);
                await recreateRecaptcha();
                setOpenOTPModal(false);
              }}
            >
              Cancel
            </Button>
            <Button onClick={onOTPSubmit} disabled={otpSubmitLoading}>
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};

export default LoginWithPhonePage;
