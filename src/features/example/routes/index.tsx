import { Outlet, RouteObject } from "react-router-dom";
import { RequireAuth } from "@src/features/auth/components";

// Layout
import { Layout } from "@src/layout/admin";

// Pages
import List from "../pages/List";
import Show from "../pages/Show";
import Form from "../pages/Form";

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
    element: <Form type="create" />,
  },
  {
    path: ":id/edit",
    element: <Form type="update" />,
  },
];

const route: RouteObject = {
  path: "/examples",
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
