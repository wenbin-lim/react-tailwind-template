import { Navigate } from "react-router-dom";
import { RouteObject } from "@root/types/routes";

// Public Pages
import { LoginPage, SignupPage } from "@root/pages/public";

// Routes
import dashboardRoute from "@root/features/dashboard/routes";
import exampleRoute from "@root/features/example/routes";

// Error Pages
import {
  UnauthorisedPage,
  ForbiddenPage,
  NotFoundPage,
} from "@root/pages/errors";

/*
  Public routes
  These routes are accessible by everyone
*/
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
  Menu routes
  These routes are usually accessible by authenticated users
  These routes are also used to generate the sidebar menu
  Please note that order is important here
  The first in array will be displayed first in the sidebar
*/
const menuRoutes = [dashboardRoute, exampleRoute];

/* 
  Error routes
  These routes are used to display error pages
*/
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

/* 
  Full routes of application
  Used to generate the router
  Order is important here as errorRoutes must be destructured last to catch all routes
*/
const routes = [...publicRoutes, ...menuRoutes, ...errorRoutes];

export { routes, publicRoutes, menuRoutes, errorRoutes };
