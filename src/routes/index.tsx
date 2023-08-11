import {
  createBrowserRouter,
  RouterProvider as BrowserRouterProvider,
  RouteObject,
  // Navigate
} from "react-router-dom";
import { PageLoader } from "@src/components/loaders";

import App from "@src/App";

// Routes
import publicRoutes from "./publicRoutes";
import errorRoutes from "./errorRoutes";
import * as customRoutes from "./customRoutes";

/* 
  Full routes of application
  Used to generate the router
  !! errorRoutes must be destructured last to catch all routes
*/
const appRoutes = [
  ...publicRoutes,
  ...Object.values(customRoutes),
  ...errorRoutes,
];

const routes: RouteObject[] = [
  {
    // entry point
    path: "",
    children: appRoutes,
    // errorElement: <Navigate to="/server-error" />,
    element: <App />,
  },
];

const router = createBrowserRouter(routes);
const RouterProvider = () => (
  <BrowserRouterProvider router={router} fallbackElement={<PageLoader />} />
);

export default RouterProvider;
