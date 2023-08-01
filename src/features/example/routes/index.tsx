import { Outlet } from "react-router-dom";
import { RouteObject } from "@root/types/routes";

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
  children: childrenRoutes,
  element: <Outlet />,
};

export default route;
