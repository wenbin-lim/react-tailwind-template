// Icons
import { HomeIcon } from "@heroicons/react/24/outline";
import { GlobeAltIcon } from "@heroicons/react/24/outline";

type NavigationItem = {
  path: string;
  name: string;
  icon?: React.ReactElement | JSX.Element;
};

const navigationItems: NavigationItem[] = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <HomeIcon />,
  },
  {
    path: "/crud-example",
    name: "CRUD Example",
    icon: <GlobeAltIcon />,
  },
];

export default navigationItems;
