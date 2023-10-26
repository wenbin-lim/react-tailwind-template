import { Outlet, RouteObject } from "react-router-dom";
import { RequireAuth } from "@src/features/auth/components";

// Layouts import
import { Layout } from "@src/layout/admin";

// Components import
import List from "../components/List";
import Form from "../components/Form";
import Show from "../components/Show";

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

// authenticated route
const route: RouteObject = {
  path: "/resources",
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
