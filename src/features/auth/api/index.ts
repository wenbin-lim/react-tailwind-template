import { z } from "zod";
import {
  getAuth,
  ApplicationVerifier,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { getGenericToastMessage } from "@src/utils/common";

/* 
	Regex

  Usernames can only have: 
  - Letters (a-z A-Z) 
  - Numbers (0-9)
  - Dots (.)
  - Underscores (_)

	Passwords cannot have any spaces (simple)
  Passwords need 1 symbol, upper and lowercase and a digit (complex)
*/
// const USERNAME_REGEX = /^[a-zA-Z0-9_.]+$/;
const PASSWORD_REGEX = /^\S{8,}$/;
// const PASSWORD_REGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]){8,}$/;

/* 
  Sign up user
*/
export const SignupSchema = z
  .object({
    email: z.string().email(),
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

export type SignupProps = z.infer<typeof SignupSchema>;

export const signup = async ({ email, password }: SignupProps) => {
  const auth = getAuth();

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    return res;
  } catch (error) {
    console.error(error);

    if (error instanceof FirebaseError) {
      if (error.code === "auth/email-already-in-use") {
        throw new Error("Email already in use");
      }
    }
  }
};

/* 
  Login user
*/
export const LoginSchema = z.object({
  email: z.string().min(1, "Please enter your email"),
  password: z.string().min(1, "Please enter your password"),
});

export type LoginProps = z.infer<typeof LoginSchema>;

export const login = async ({ email, password }: LoginProps) => {
  const auth = getAuth();

  try {
    const res = await signInWithEmailAndPassword(auth, email, password);

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Login with phone
 */
export const LoginWithPhoneSchema = z.object({
  phoneNumber: z.string().min(1, "Please enter a phone number"),
});

export type LoginWithPhoneProps = z.infer<typeof LoginWithPhoneSchema> & {
  appVerifier: ApplicationVerifier;
};

export const loginWithPhone = async ({
  phoneNumber,
  appVerifier,
}: LoginWithPhoneProps) => {
  const auth = getAuth();

  try {
    const res = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);

    return res;
  } catch (error) {
    console.error(error);

    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/invalid-phone-number":
          throw new Error("Invalid phone number");
        case "auth/too-many-requests":
          throw new Error("Too many login attempts, please try again later");
        default:
          throw new Error(getGenericToastMessage("error"));
      }
    }
  }
};

/**
 * Request password change for user
 */
export const RequestPasswordChangeSchema = z.object({
  email: z.string().trim().min(1, "Please enter your email"),
});

export type RequestPasswordChangeProps = z.infer<
  typeof RequestPasswordChangeSchema
>;

export const requestPasswordChange = async ({
  email,
}: RequestPasswordChangeProps) => {
  const auth = getAuth();

  try {
    const res = await sendPasswordResetEmail(auth, email);

    return res;
  } catch (error) {
    console.error(error);

    if (error instanceof FirebaseError) {
      if (error.code === "auth/user-not-found") {
        throw new Error("No user found with this email");
      }
    }
  }
};

/**
 * Confirm password reset
 */
export const PasswordResetSchema = z
  .object({
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

export type PasswordResetProps = z.infer<typeof PasswordResetSchema> & {
  code: string;
};

export const passwordReset = async ({ code, password }: PasswordResetProps) => {
  const auth = getAuth();

  try {
    const res = await confirmPasswordReset(auth, code, password);

    return res;
  } catch (error) {
    console.error(error);

    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/expired-action-code":
          throw new Error(
            "Password reset link has expired, please request a new one",
          );
        case "auth/invalid-action-code":
          throw new Error(
            "Password reset link is either invalid or has been used, please request a new one",
          );
        default:
          throw new Error(getGenericToastMessage("error"));
      }
    }
  }
};
