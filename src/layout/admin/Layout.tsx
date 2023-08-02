import { useState } from "react";

import StickyHeader from "./StickyHeader";
import Sidebar from "./Sidebar";
import MobileSidebarWrapper from "./MobileSidebarWrapper";

import { menuRoutes } from "@root/routes";

type AdminLayoutProps = {
  children?: React.ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  return (
    <>
      <MobileSidebarWrapper
        showSidebar={showMobileSidebar}
        onSidebarClose={() => setShowMobileSidebar(false)}
      >
        <Sidebar navItems={menuRoutes} />
      </MobileSidebarWrapper>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <Sidebar navItems={menuRoutes} />
      </div>

      <div className="flex min-h-full flex-col lg:pl-72">
        {/* Sticky search header */}
        <StickyHeader openMobileSidebar={() => setShowMobileSidebar(true)} />

        {/* Outlet */}
        <main className="flex-1">{children}</main>
      </div>
    </>
  );
};

export default AdminLayout;