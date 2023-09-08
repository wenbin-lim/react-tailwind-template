import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";

import { AuthContext } from "../provider";
import {
  signup,
  SignupProps,
  login,
  LoginProps,
  requestPasswordChange,
  RequestPasswordChangeProps,
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

// useRequestPasswordChange hook
export const useRequestPasswordChange = () => {
  return useMutation({
    mutationFn: (data: RequestPasswordChangeProps) =>
      requestPasswordChange(data),
  });
};
