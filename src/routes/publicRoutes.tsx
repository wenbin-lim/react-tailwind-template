/*
  Public routes
  These routes are accessible by everyone
*/
import { RouteObject, Navigate } from "react-router-dom";
import { LoginPage, SignupPage } from "@src/pages/public";

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
];

export default publicRoutes;
