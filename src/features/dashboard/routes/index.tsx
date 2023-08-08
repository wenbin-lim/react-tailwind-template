import { Outlet, RouteObject } from "react-router-dom";
import { RequireAuth } from "@src/features/auth/components";

// Layout
import { Layout } from "@src/layout/admin";

// Pages
import Dashboard from "../pages/Dashboard";

// Routes
const childrenRoutes: RouteObject[] = [
  {
    path: "",
    element: <Dashboard />,
  },
];

const route: RouteObject = {
  path: "/dashboard",
  children: childrenRoutes,
  element: (
    <RequireAuth>
      <Layout>
        <Outlet />
      </Layout>
    </RequireAuth>
  ),
};

export default route;
