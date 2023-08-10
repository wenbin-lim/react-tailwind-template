import { cloneElement } from "react";
import clsx from "clsx";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "@src/features/auth/hooks";
import toast from "react-hot-toast";

import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";

import navigationItems from "./navigationItems";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const onLogout = () => {
    logout();
    navigate("/login");
    toast.success("You have successfully logged out!");
  };

  /* 
    Sidebar CSS properties
    - color: bg-primary-500 text-on-primary/50
    - navlink active: bg-primary-300 text-on-primary
    - navlink hover: bg-primary-400 text-on-primary
    - icons: h-6 w-6 (24px 24px)
  */
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-primary-500 px-6 pb-4">
      <div className="flex h-16 shrink-0 items-center justify-center">
        <img
          className="h-16 w-auto"
          src="/brand/logo.svg"
          alt="Company Brand"
        />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigationItems.map(({ path, name, icon }, index) => (
                <li key={index}>
                  <NavLink
                    to={path || "#"}
                    className={({ isActive }) =>
                      clsx(
                        "flex w-full gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                        isActive
                          ? "bg-primary-300 text-on-primary"
                          : "text-on-primary/50 hover:bg-primary-400 hover:text-on-primary",
                      )
                    }
                  >
                    {!!icon &&
                      cloneElement(icon, {
                        className: "h-6 w-6 shrink-0",
                        "aria-hidden": true,
                      })}
                    {name || "No name"}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
          <li className="mt-auto">
            <ul role="list" className="-mx-2 space-y-1">
              <li>
                <button
                  onClick={onLogout}
                  className="flex w-full gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-on-primary hover:bg-primary-400"
                >
                  <ArrowLeftOnRectangleIcon
                    className="h-6 w-6 shrink-0"
                    aria-hidden="true"
                  />
                  Logout
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Sidebar;
