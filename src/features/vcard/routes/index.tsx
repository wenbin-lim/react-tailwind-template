import { Outlet, RouteObject } from "react-router-dom";
// import { RequireAuth } from "@src/features/auth/components";

// Layouts import

// Pages import
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
    element: <Form type="edit" />,
  },
];

// // use this if you want to require authentication for this feature
// const route: RouteObject = {
//   path: "/vcard",
//   children: childrenRoutes,
//   element: (
//     <RequireAuth>
//       <Outlet />
//     </RequireAuth>
//   ),
// };

const route: RouteObject = {
  path: "/vcard",
  children: childrenRoutes,
  element: <Outlet />,
};

export default route;
