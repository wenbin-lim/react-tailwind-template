import {
  createBrowserRouter,
  RouterProvider as BrowserRouterProvider,
  RouteObject,
  Outlet,
} from "react-router-dom";

// Routes
import publicRoutes from "./publicRoutes";
import errorRoutes from "./errorRoutes";
import * as customRoutes from "./customRoutes";

/* 
  Full routes of application
  Used to generate the router
  !! errorRoutes must be destructured last to catch all routes
*/
const routes: RouteObject[] = [
  {
    path: "",
    children: [...publicRoutes, ...Object.values(customRoutes), ...errorRoutes],
    // errorElement: <Navigate to="/server-error" />,
    element: <Outlet />,
  },
];

const router = createBrowserRouter(routes);
const RouterProvider = () => <BrowserRouterProvider router={router} />;

export default RouterProvider;
