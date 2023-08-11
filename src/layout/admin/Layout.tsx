import { useState } from "react";
import clsx from "clsx";

import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import MobileSidebarWrapper from "./MobileSidebarWrapper";

type AdminLayoutProps = {
  showTopbar?: boolean;
  showSidebar?: boolean;
  children?: React.ReactNode;
};

const AdminLayout = ({ showSidebar = false, children }: AdminLayoutProps) => {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  return (
    <>
      {showSidebar && (
        <>
          <MobileSidebarWrapper
            showSidebar={showMobileSidebar}
            onSidebarClose={() => setShowMobileSidebar(false)}
          >
            <Sidebar />
          </MobileSidebarWrapper>

          {/* Static sidebar for desktop */}
          <div className="hidden lg:fixed lg:inset-y-0 lg:z-appbar lg:flex lg:w-sidebar lg:flex-col">
            <Sidebar />
          </div>
        </>
      )}

      <div
        className={clsx("grid min-h-screen grid-rows-[auto_1fr] flex-col", {
          "lg:pl-sidebar": showSidebar,
        })}
      >
        <TopBar
          showMobileSidebarToggle={false}
          openMobileSidebar={() => setShowMobileSidebar(true)}
        />

        {/* Outlet */}
        {children}
      </div>
    </>
  );
};

export default AdminLayout;
