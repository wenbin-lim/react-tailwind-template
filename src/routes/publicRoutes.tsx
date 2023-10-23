/*
  Public routes
  These routes are accessible by everyone
*/
import { RouteObject, Navigate } from "react-router-dom";
import {
  LoginPage,
  // LoginWithPhonePage,
  SignupPage,
  ForgotPassword,
  PasswordReset,
} from "@src/pages/public";

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/password-reset/:code",
    element: <PasswordReset />,
  },
];

export default publicRoutes;
