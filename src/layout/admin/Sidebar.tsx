import { cloneElement } from "react";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

import navigationItems from "./navigationItems";

const Sidebar = () => {
  return (
    <aside className="flex grow flex-col gap-y-5 overflow-y-auto bg-primary px-6 py-4 text-primary-foreground">
      {/* company brand / logo */}
      <img className="h-16 w-auto" src="/brand/logo.svg" alt="Company Brand" />

      {/* nav items */}
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="-mx-2 space-y-1">
          {navigationItems.map(({ path, name, icon }) => (
            <li key={path}>
              <NavLink
                to={path || "#"}
                className={({ isActive }) =>
                  clsx(
                    "flex w-full gap-x-3 rounded-md p-2 text-sm leading-6",
                    isActive
                      ? "font-bold text-secondary hover:text-secondary/75"
                      : "font-semibold hover:text-primary-foreground/75",
                  )
                }
              >
                {icon &&
                  cloneElement(icon, {
                    className: "h-6 w-6 shrink-0",
                    "aria-hidden": true,
                  })}
                {name || path}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
export default Sidebar;
