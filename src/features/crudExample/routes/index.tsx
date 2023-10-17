import { Outlet, RouteObject } from "react-router-dom";
import { RequireAuth } from "@src/features/auth/components";

// Layouts import
import { Layout } from "@src/layout/admin";

// Components import
import { List } from "../components";
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

// authenticated route
const route: RouteObject = {
  path: "/crud-example",
  children: childrenRoutes,
  element: (
    <RequireAuth>
      <Layout>
        <Outlet />
      </Layout>
    </RequireAuth>
  ),
};

// // unauthenticated route
// const route: RouteObject = {
//   path: "/crud-example",
//   children: childrenRoutes,
//   element: <Outlet />,
// };

export default route;
