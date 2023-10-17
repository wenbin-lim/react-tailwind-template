import { useState } from "react";
import clsx from "clsx";

import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import { Sheet, SheetContent } from "@src/components/ui/sheet";

type AdminLayoutProps = {
  showTopbar?: boolean;
  showSidebar?: boolean;
  children?: React.ReactNode;
};

const AdminLayout = ({ showSidebar = true, children }: AdminLayoutProps) => {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  return (
    <>
      {/* Mobile sidebar */}
      {showSidebar && (
        <Sheet open={showMobileSidebar} onOpenChange={setShowMobileSidebar}>
          <SheetContent className="flex p-0" side="left">
            <Sidebar />
          </SheetContent>
        </Sheet>
      )}

      {/* Static sidebar for desktop */}
      {showSidebar && (
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-appbar lg:flex lg:w-sidebar">
          <Sidebar />
        </div>
      )}

      <div
        className={clsx("grid min-h-screen grid-rows-[auto_1fr]", {
          "lg:pl-sidebar": showSidebar,
        })}
      >
        <TopBar
          sticky={true}
          showMenuToggle={true}
          openMenu={() => setShowMobileSidebar(true)}
        />

        {/* Outlet */}
        <main>{children}</main>
      </div>
    </>
  );
};

export default AdminLayout;
