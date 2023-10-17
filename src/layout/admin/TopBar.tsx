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

import { useToast } from "@src/components/toast/use-toast";

interface TopBarProps {
  sticky?: boolean;
  showMenuToggle?: boolean;
  openMenu?: () => void;
}

const TopBar = ({
  sticky = true,
  showMenuToggle = true,
  openMenu,
}: TopBarProps) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { toast } = useToast();

  const onLogout = async () => {
    logout();
    navigate("/login");
    toast({
      description: "Logout Successful",
    });
  };

  return (
    <nav
      className={clsx(
        "px-container z-appbar flex h-topbar shrink-0 items-center gap-x-4 border-b border-border bg-background text-foreground shadow-sm sm:gap-x-6",
        {
          "sticky top-0": sticky,
        },
      )}
    >
      {showMenuToggle ? (
        <button type="button" className="-m-3 p-3 lg:hidden" onClick={openMenu}>
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
            className="icon-color -m-3 p-3"
            onClick={() => alert("settings icon clicked")}
          >
            <span className="sr-only">Settings</span>
            <Cog6ToothIcon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div
            className="hidden bg-border lg:block lg:h-6 lg:w-px"
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
                  <UserCircleIcon className="icon-color h-8 w-8 rounded-full" />
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
