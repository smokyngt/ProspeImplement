import React from "react";
import Logo from "../../../assets/Asset 1.png";
import BaseSidebar, { type SidebarItem } from "@/components/layout/BaseSidebar";
import {
  LayoutDashboard,
  Bot,
  Shield,
  Users,
  Mail,
  Key,
  BarChart3,
  FileText,
  Settings,
} from "lucide-react";

interface SidebarProps {
  title: string;
}

const SidebarOrga: React.FC<SidebarProps> = ({ title }) => {
  const items: SidebarItem[] = [
    {
      to: ".", // équivaut à /dashboard-orga
      label: "Dashboard",
      exact: true,
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      to: "create-assistant",
      label: "Assistant",
      icon: <Bot className="w-4 h-4" />,
    },
    {
      to: "role",
      label: "Roles",
      icon: <Shield className="w-4 h-4" />,
    },
    {
      to: "user",
      label: "Members",
      icon: <Users className="w-4 h-4" />,
    },
    {
      to: "invite",
      label: "Invites",
      icon: <Mail className="w-4 h-4" />,
    },
    {
      to: "apikeys",
      label: "API Keys",
      icon: <Key className="w-4 h-4" />,
    },
    {
      to: "statistics",
      label: "Statistics",
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      to: "logs",
      label: "Logs",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      to: "settings-orga",
      label: "Settings",
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  // (optionnel) même structure de footer que SidebarUser si tu veux ajouter un profil
  // const footer = (
  //   <div className="shrink-0 group block">
  //     <div className="flex items-center">
  //       <img
  //         className="inline-block shrink-0 size-[35px] rounded-full"
  //         src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
  //         alt="Avatar"
  //       />
  //       <div className="ms-3">
  //         <h3 className="font-semibold text-gray-800 dark:text-white">Sarah Collins</h3>
  //         <p className="text-sm font-medium text-gray-400 dark:text-neutral-500">sarah@orga.com</p>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <BaseSidebar
      title={title}
      logo={{
        src: Logo,
        alt: "Prosperify Logo",
        href: "/dashboard-orga",
      }}
      items={items}
      // footer={footer}
    />
  );
};

export default SidebarOrga;
