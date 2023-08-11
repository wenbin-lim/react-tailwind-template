import { Fragment } from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@src/features/auth/hooks";
import toast from "react-hot-toast";

import { Bars3Icon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Cog6ToothIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";

import { getPbImageUrl } from "@src/utils/pocketbase";
interface TopBarProps {
  sticky?: boolean;
  showMobileSidebarToggle?: boolean;
  openMobileSidebar?: () => void;
}
const TopBar = ({
  sticky = true,
  showMobileSidebarToggle = true,
  openMobileSidebar,
}: TopBarProps) => {
  const navigate = useNavigate();

  const { logout, user } = useAuth();

  const onLogout = () => {
    logout();
    navigate("/login");
    toast.success("You have successfully logged out!");
  };

  return (
    <div
      className={clsx(
        "z-appbar flex h-topbar shrink-0 items-center gap-x-4 border-b border-gray-200 px-4 shadow-sm dark:border-gray-700 sm:gap-x-6 sm:px-6 lg:px-8",
        {
          "sticky top-0 bg-background text-on-background dark:bg-background-dark dark:text-on-background-dark":
            sticky,
        },
      )}
    >
      {showMobileSidebarToggle ? (
        <button
          type="button"
          className="-m-2.5 p-2.5 lg:hidden"
          onClick={openMobileSidebar}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      ) : (
        <img
          className="mx-auto h-6 w-auto cursor-pointer"
          src="/brand/logo_long.svg"
          alt="Company Brand"
          onClick={() => navigate("/dashboard")}
        />
      )}

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="ml-auto flex items-center gap-x-4 lg:gap-x-6">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
            onClick={() => navigate("/settings")}
          >
            <span className="sr-only">Settings</span>
            <Cog6ToothIcon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div
            className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10 lg:dark:bg-gray-100/10"
            aria-hidden="true"
          />

          {/* Profile dropdown */}
          <Menu as="div" className="relative">
            <Menu.Button className="-m-1.5 flex items-center p-1.5">
              <span className="sr-only">Open user menu</span>
              {user ? (
                <img
                  className="h-8 w-8 rounded-full"
                  src={getPbImageUrl({
                    collection: "users",
                    recordId: user.id,
                    fileName: user.avatar,
                  })}
                  alt="user profile picture"
                />
              ) : (
                <UserCircleIcon className="h-8 w-8 rounded-full text-gray-500" />
              )}
              <span className="hidden lg:flex lg:items-center">
                <span
                  className="ml-4 text-sm font-semibold leading-6"
                  aria-hidden="true"
                >
                  {user ? user.email : ""}
                </span>
                <ChevronDownIcon className="ml-2 h-5 w-5" aria-hidden="true" />
              </span>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-background py-2 text-on-background shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={onLogout}
                      className={clsx(
                        "block w-full px-3 py-1 text-left text-sm leading-6",
                        { "hover:bg-neutral-200": active },
                      )}
                    >
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
};
export default TopBar;
