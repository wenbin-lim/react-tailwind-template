// Icons
import { HomeIcon } from "@heroicons/react/24/outline";

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
    path: "/locations",
    name: "Locations",
    icon: <HomeIcon />,
  },
  {
    path: "/areas",
    name: "Areas",
    icon: <HomeIcon />,
  },
  {
    path: "/resources",
    name: "Resources",
    icon: <HomeIcon />,
  },
  {
    path: "/reservations",
    name: "Reservations",
    icon: <HomeIcon />,
  },
];

export default navigationItems;
