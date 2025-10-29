import React from "react";
import SidebarOrga from "../components/sidebar.orga";
import DashboardLayout from "@/components/layout/DashboardLayout";

const DashboardOrga: React.FC = () => {
  return (
    <DashboardLayout
      sidebar={<SidebarOrga title={"Dashboard"} />}
      useOutlet
      paddingClassName="sm:p-6 space-y-4"
    />
  );
};

export default DashboardOrga;
