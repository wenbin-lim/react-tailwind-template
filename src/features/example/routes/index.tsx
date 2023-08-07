import { Outlet } from "react-router-dom";
import { RouteObject } from "@src/types/routes";
import { RequireAuth } from "@src/features/auth/components";

// Icons
import { GlobeAltIcon } from "@heroicons/react/24/outline";

// Layout
import { Layout } from "@src/layout/admin";

// Pages
import List from "../pages/List";
import Show from "../pages/Show";
import Create from "../pages/Create";
import Edit from "../pages/Edit";

// Routes
const childrenRoutes: RouteObject[] = [
  {
    path: "",
    element: <List />,
  },
  {
    path: ":id",
    element: <Show />,
  },
  {
    path: "new",
    element: <Create />,
  },
  {
    path: ":id/edit",
    element: <Edit />,
  },
];

const route: RouteObject = {
  path: "/examples",
  name: "Examples",
  icon: <GlobeAltIcon />,
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
