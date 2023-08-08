import { Navigate, RouteObject } from "react-router-dom";

// Public Pages
import { LoginPage, SignupPage } from "@src/pages/public";

// Routes
import dashboardRoute from "@src/features/dashboard/routes";
import exampleRoute from "@src/features/example/routes";

// Error Pages
import {
  UnauthorisedPage,
  ForbiddenPage,
  NotFoundPage,
} from "@src/pages/errors";

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
  !! errorRoutes must be destructured last to catch all routes

  Feel free to create your own routes and import here
*/
// routes that are protected by auth and wrapped inside admin layout
const adminRoutes = [dashboardRoute, exampleRoute];

const routes = [...publicRoutes, ...adminRoutes, ...errorRoutes];

export default routes;
