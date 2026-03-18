import { NavSection } from "@/types/dashboard.type";

import { DashboardSidebarContent } from "./DashboardSidebarContent";
import { getCommonNavItems } from "@/lib/navItems";

const DashboardSidebar = async () => {
  const navItems: NavSection[] = getCommonNavItems();
  const dashboardHome = "/";

  return (
    <DashboardSidebarContent
      dashboardHome={dashboardHome}
      navItems={navItems}
    />
  );
};

export default DashboardSidebar;
