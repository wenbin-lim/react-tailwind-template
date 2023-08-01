import {
  createBrowserRouter,
  RouterProvider as BrowserRouterProvider,
  Navigate,
} from "react-router-dom";
import { RouteObject } from "@root/types/routes";

// Pages
import UnauthorisedPage from "@root/pages/UnauthorisedPage";
import ForbiddenPage from "@root/pages/ForbiddenPage";
import NotFoundPage from "@root/pages/NotFoundPage";
import LoginPage from "@root/pages/LoginPage";
import SignupPage from "@root/pages/SignupPage";

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

/* 
  Add new routes here
*/
const routes = [...publicRoutes, exampleRoute];

// Error routes
const errorRoutes: RouteObject[] = [
  {
    path: "/access-denied",
    element: <UnauthorisedPage redirectTo="/login" />,
  },
  {
    path: "/access-forbidden",
    element: <ForbiddenPage redirectTo="/login" />,
  },
  // 404 should always be the last route of the array
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

const router = createBrowserRouter([...routes, ...errorRoutes]);
const RouterProvider = () => <BrowserRouterProvider router={router} />;
export { RouterProvider, router, routes };
