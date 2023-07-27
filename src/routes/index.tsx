import {
  RouteObject,
  createBrowserRouter,
  RouterProvider as BrowserRouterProvider,
  Navigate,
} from "react-router-dom";

import { LoginPage, SignupPage } from "@root/pages/auth";
import { NotFound } from "@root/pages/common";

type CustomRouteObj = RouteObject & {};

const publicRoutes: CustomRouteObj[] = [
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

const errorRoutes: CustomRouteObj[] = [
  {
    path: "*",
    element: <NotFound />,
  },
];

// Destructure and add new routes here
const routes = [...publicRoutes, ...errorRoutes];

const router = createBrowserRouter(routes);
const RouterProvider = () => <BrowserRouterProvider router={router} />;
export { RouterProvider, router, routes };
