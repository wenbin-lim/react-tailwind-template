import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";

import { AuthContext } from "../provider";
import {
  signup,
  SignupProps,
  login,
  LoginProps,
  loginWithPhone,
  LoginWithPhoneProps,
  requestPasswordChange,
  RequestPasswordChangeProps,
  passwordReset,
  PasswordResetProps,
} from "../api";

// useAuth hook to get the auth context
export const useAuth = () => useContext(AuthContext);

// useSignup hook to sign up a user
export const useSignup = () => {
  return useMutation({
    mutationFn: (newUser: SignupProps) => signup(newUser),
  });
};

// useLogin hook to login a user
export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials: LoginProps) => login(credentials),
  });
};

// useLogin hook to login a user through phone number
export const useLoginWithPhone = () => {
  return useMutation({
    mutationFn: (params: LoginWithPhoneProps) => loginWithPhone(params),
  });
};

// useRequestPasswordChange hook
export const useRequestPasswordChange = () => {
  return useMutation({
    mutationFn: (data: RequestPasswordChangeProps) =>
      requestPasswordChange(data),
  });
};

// useRequestPasswordChange hook
export const usePasswordReset = () => {
  return useMutation({
    mutationFn: (data: PasswordResetProps) => passwordReset(data),
  });
};
