import React from "react";
import Logo from "../../../assets/Asset 1.png";
import BaseSidebar, { type SidebarItem } from "@/components/layout/BaseSidebar";

interface SidebarProps {
  title: string;
}

const SidebarUser: React.FC<SidebarProps> = ({ title }) => {
  // 🔹 Les routes sont relatives (pas besoin de répéter /dashboard-user)
  const items: SidebarItem[] = [
    {
      to: ".", // correspond à /dashboard-user
      label: "Home",
      exact: true,
      icon: (
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      ),
    },
    {
      to: "settings-user", // correspond à /dashboard-user/settings-user
      label: "Settings",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.67 4.14a2.34 2.34 0 0 1 4.66 0 2.34 2.34 0 0 0 3.32 1.92 2.34 2.34 0 0 1 2.33 4.03 2.34 2.34 0 0 0 0 3.83 2.34 2.34 0 0 1-2.33 4.03 2.34 2.34 0 0 0-3.32 1.92 2.34 2.34 0 0 1-4.66 0 2.34 2.34 0 0 0-3.32-1.92 2.34 2.34 0 0 1-2.33-4.03 2.34 2.34 0 0 0 0-3.83A2.34 2.34 0 0 1 6.35 6.05a2.34 2.34 0 0 0 3.32-1.91"
          />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
    {
      to: "stats", // correspond à /dashboard-user/stats
      label: "Stats",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
          />
        </svg>
      ),
    },
  ];

  // 🔹 Pied de barre latérale (profil utilisateur)
  const footer = (
    <div className="shrink-0 group block">
      <div className="flex items-center">
        <img
          className="inline-block shrink-0 size-[35px] rounded-full"
          src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
          alt="Avatar"
        />
        <div className="ms-3">
          <h3 className="font-semibold text-gray-800 dark:text-white">
            Mark Wanner
          </h3>
          <p className="text-sm font-medium text-gray-400 dark:text-neutral-500">
            mark@gmail.com
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <BaseSidebar
      title={title}
      logo={{
        src: Logo,
        alt: "Prosperify Logo",
        href: "/dashboard-user", // lien vers la page principale
      }}
      items={items}
      footer={footer}
    />
  );
};

export default SidebarUser;
