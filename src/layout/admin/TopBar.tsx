import clsx from "clsx";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@src/features/auth/hooks";

import { Bars3Icon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Cog6ToothIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@src/components/ui/dropdown-menu";
import { getPbFileUrl } from "@src/utils/pocketbase";
import { RecordModel } from "pocketbase";

import toast from "react-hot-toast";

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

  const onLogout = async () => {
    logout();
    navigate("/login");
    toast.success("You have successfully logged out!");
  };

  return (
    <nav
      className={clsx(
        "z-appbar flex h-topbar shrink-0 items-center gap-x-4 border-b border-gray-200 px-4 shadow-sm dark:border-gray-700 sm:gap-x-6 sm:px-6 lg:px-8",
        {
          "text-on-background dark:bg-background-dark dark:text-on-background-dark sticky top-0 bg-background":
            sticky,
        },
      )}
    >
      {showMobileSidebarToggle ? (
        <button
          type="button"
          className="-m-3 p-3 lg:hidden"
          onClick={openMobileSidebar}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      ) : (
        <img
          className="mx-auto h-12 w-auto"
          src="/brand/logo.svg"
          alt="Company Brand"
        />
      )}

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="ml-auto flex items-center gap-x-4 lg:gap-x-6">
          {/* settings button */}
          <button
            type="button"
            className="-m-3 p-3 text-gray-400 hover:text-gray-500"
            onClick={() => alert("settings icon clicked")}
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
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="-m-1.5 flex items-center p-1.5">
                {user && !!user.avatar ? (
                  <img
                    className="h-8 w-8 rounded-full"
                    src={getPbFileUrl({
                      record: user as RecordModel,
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
                  <ChevronDownIcon
                    className="ml-2 h-5 w-5"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};
export default TopBar;
