import {
  createBrowserRouter,
  RouterProvider as BrowserRouterProvider,
} from "react-router-dom";
import { routes } from "./index";

const router = createBrowserRouter(routes);
const RouterProvider = () => <BrowserRouterProvider router={router} />;

export default RouterProvider;
