import React from "react";
import { useParams } from "react-router-dom";
import Logo from "../../../assets/Asset 1.png";
import BaseSidebar, { type SidebarItem } from "../../../components/layout/BaseSidebar";

interface SidebarProps {
  title: string;
}

const SidebarAssistant: React.FC<SidebarProps> = ({ title }) => {
  //  On récupère dynamiquement l’ID de l’assistant depuis l’URL
  const { id } = useParams<{ id: string }>();

  // On construit dynamiquement les liens selon l’assistant actif
  const items: SidebarItem[] = [
    {
      to: `/assistant/${id}`,
      label: "Home",
      exact: true,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-house"
        >
          <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
          <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </svg>
      ),
    },
    {
      to: `/assistant/${id}/playground`,
      label: "Chat",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-message-square"
        >
          <path d="M22 17a2 2 0 0 1-2 2H6.83a2 2 0 0 0-1.41.59L3.22 21.8A.7.7 0 0 1 2 21.28V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      to: `/assistant/${id}/sources`,
      label: "Sources",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-folder"
        >
          <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
        </svg>
      ),
    },
    {
      to: `/assistant/${id}/settings`,
      label: "Settings",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-settings"
        >
          <path d="M9.67 4.14a2.34 2.34 0 0 1 4.66 0 2.34 2.34 0 0 0 3.32 1.92 2.34 2.34 0 0 1 2.33 4.03 2.34 2.34 0 0 0 0 3.83 2.34 2.34 0 0 1-2.33 4.03 2.34 2.34 0 0 0-3.32 1.92 2.34 2.34 0 0 1-4.66 0 2.34 2.34 0 0 0-3.32-1.92 2.34 2.34 0 0 1-2.33-4.03 2.34 2.34 0 0 0 0-3.83A2.34 2.34 0 0 1 6.35 6.05a2.34 2.34 0 0 0 3.32-1.91" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
  ];

  // 🔹 Footer avec infos utilisateur
  const footer = (
    <div className="shrink-0 group block">
      <div className="flex items-center">
        <img
          className="inline-block shrink-0 size-[35px] rounded-full"
          src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
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

  // 🔹 Sidebar
  return (
    <BaseSidebar
      title={title}
      logo={{ src: Logo, alt: "Prosperify Logo", href: `/assistant/${id}` }}
      items={items}
      footer={footer}
    />
  );
};

export default SidebarAssistant;
