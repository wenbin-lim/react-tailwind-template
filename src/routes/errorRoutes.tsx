/* 
  Error routes
  These routes are used to display error pages
*/
import { RouteObject } from "react-router-dom";
import {
  UnauthorisedPage,
  ForbiddenPage,
  NotFoundPage,
  ApplicationErrorPage,
} from "@src/pages/errors";

const errorRoutes: RouteObject[] = [
  {
    path: "/access-denied",
    element: <UnauthorisedPage redirectTo="/login" />,
  },
  {
    path: "/access-forbidden",
    element: <ForbiddenPage redirectTo="/login" />,
  },
  {
    path: "/server-error",
    element: <ApplicationErrorPage redirectTo="/" />,
  },
  // 404 should always be the last route of the array
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default errorRoutes;
