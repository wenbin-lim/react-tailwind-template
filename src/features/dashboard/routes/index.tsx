import { Outlet } from "react-router-dom";
import { RouteObject } from "@root/types/routes";
import { RequireAuth } from "@root/features/auth";

// Icons
import { HomeIcon } from "@heroicons/react/24/outline";

// Layout
import { Layout } from "@root/layout/admin";

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
  name: "Dashboard",
  path: "/dashboard",
  icon: <HomeIcon />,
  showOnSidebar: true,
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
