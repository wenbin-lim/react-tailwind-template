import { cloneElement } from "react";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

import navigationItems from "./navigationItems";

import { useGetMe, useSwitchLastLocation } from "@src/features/me/data";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@src/components/ui/select";

import { useToast } from "@src/components/toast/use-toast";

const Sidebar = () => {
  const { toast } = useToast();

  const { data: me } = useGetMe();
  const switchLocationFn = useSwitchLastLocation();

  // selecting location logic
  const onSwitchLocation = (value: string) => {
    switchLocationFn.mutate(parseInt(value), {
      onSuccess: () => {
        console.log("success");
      },
      onError: () =>
        toast({
          description: "Failed to switch location, please try again later",
        }),
    });
  };

  return (
    <aside className="flex grow flex-col gap-y-5 overflow-y-auto bg-primary px-6 py-4 text-primary-foreground">
      {/* company brand / logo */}
      <img className="h-16 w-auto" src="/brand/logo.svg" alt="Company Brand" />

      {/* Select location */}
      {me && (
        <Select
          value={me.last_location === 0 ? "" : `${me.last_location}`}
          onValueChange={onSwitchLocation}
        >
          <SelectTrigger className="text-foreground">
            <SelectValue placeholder="Select a location" />
          </SelectTrigger>
          {me?.locations && me.locations.length > 0 && (
            <SelectContent className="z-tooltip">
              {me.locations.map((location) => (
                <SelectItem key={location.id} value={`${location.id}`}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectContent>
          )}
        </Select>
      )}

      {/* nav items */}
      <nav className="flex flex-col">
        <ul role="list" className="-mx-2 space-y-1">
          {navigationItems.map(({ path, name, icon }) => (
            <li key={path}>
              <NavLink
                to={path || "#"}
                className={({ isActive }) =>
                  clsx(
                    "flex w-full gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400",
                    isActive
                      ? "bg-primary-hover text-primary-foreground"
                      : "hover:text-primary-foreground",
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
