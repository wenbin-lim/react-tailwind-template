import {
  createBrowserRouter,
  RouterProvider as BrowserRouterProvider,
  Navigate,
} from "react-router-dom";
import { RouteObject } from "@root/types/routes";

// Pages
import LoginPage from "@root/pages/LoginPage";
import SignupPage from "@root/pages/SignupPage";
import NotFound from "@root/pages/NotFound";

// Routes
import exampleRoute from "@root/features/example/routes";

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

const notFoundRoute: RouteObject = {
  path: "*",
  element: <NotFound />,
};

// Add new routes here
const routes = [...publicRoutes, exampleRoute];

// notFoundRoute (catch all) should be the last route
const router = createBrowserRouter([...routes, notFoundRoute]);
const RouterProvider = () => <BrowserRouterProvider router={router} />;
export { RouterProvider, router, routes };
