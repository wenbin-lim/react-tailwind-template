import { RouteObject as ReactRouterRouteObject } from "react-router-dom";

export type RouteObject = ReactRouterRouteObject & {
  /** Display name of path */
  name?: string;
  /** JSX Element */
  icon?: JSX.Element;
  /** To show on sidebar menu */
  showOnSidebar?: boolean;
};
