import backend from "@src/lib/backend";
import { z } from "zod";

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
const USERNAME_REGEX = /^[a-zA-Z0-9_.]+$/;
const PASSWORD_REGEX = /^\S{8,}$/;
// const PASSWORD_REGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]){8,}$/;

/* 
  Sign up user
*/
export const SignupSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(4, "Please enter an username with at least 4 characters")
      .regex(
        USERNAME_REGEX,
        "Only characters, digits, dots and underscores are allowed",
      )
      .toLowerCase(),
    email: z.string().email(),
    // email: z.union([z.string().email().nullish(), z.literal("")]), // if email is optional
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

export const signup = async ({
  username,
  email,
  password,
  passwordConfirm,
}: SignupProps) => {
  const res = await backend
    .collection("users")
    .create({ username, email, password, passwordConfirm });

  return res;
};

/* 
  Login user
*/
export const LoginSchema = z.object({
  username: z.string().min(1, "Please enter your username"),
  password: z.string().min(1, "Please enter your password"),
});

export type LoginProps = z.infer<typeof LoginSchema>;

export const login = async ({ username, password }: LoginProps) => {
  const res = await backend
    .collection("users")
    .authWithPassword(username, password);

  return res;
};

/* 
  Request password change for user
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
  const res = await backend.collection("users").requestPasswordReset(email);

  return res;
};
