import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';
import SmallLogo from '../../assets/Asset 8.png';

export type SidebarItem = {
  to: string;
  label: string;
  icon?: React.ReactNode;
  exact?: boolean;
  separatorAbove?: boolean;
};

type LogoConfig = {
  src: string;
  alt?: string;
  href?: string;
};

export interface BaseSidebarProps {
  title: string;
  logo?: LogoConfig | null;
  items: SidebarItem[];
  footer?: React.ReactNode;
  collapsedLogoSrc?: string;
}

// Utilitaire : remplace ":id" si nécessaire
function resolvePathTemplate(template: string, pathname: string): string {
  if (!template.includes(":")) return template;
  const idMatch = pathname.match(/^\/assistant\/([^/]+)/);
  if (idMatch && idMatch[1]) {
    return template.replace(":id", idMatch[1]);
  }
  return template;
}

export const BaseSidebar: React.FC<BaseSidebarProps> = ({
  title,
  logo,
  items,
  footer,
  collapsedLogoSrc,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    try {
      const v = localStorage.getItem('sidebar:collapsed');
      return v ? JSON.parse(v) : false;
    } catch {
      return false;
    }
  });

  const location = useLocation();

  // 🔹 Fonction pour détecter si un lien est actif
  const isActive = (to: string, exact?: boolean) => {
    const resolvedPath = useResolvedPath(to);
    return exact
      ? location.pathname === resolvedPath.pathname
      : location.pathname.startsWith(resolvedPath.pathname);
  };

  useEffect(() => {
    try {
      localStorage.setItem('sidebar:collapsed', JSON.stringify(isCollapsed));
    } catch {}
    if (typeof document !== 'undefined') {
      document.body.dataset['sidebarCollapsed'] = String(isCollapsed);
    }
  }, [isCollapsed]);

  const headerPadClass = useMemo(
    () => (isCollapsed ? 'lg:ps-20' : 'lg:ps-64'),
    [isCollapsed]
  );
  const asideWidthClass = useMemo(
    () => (isCollapsed ? 'w-20' : 'w-64'),
    [isCollapsed]
  );

  return (
    <>
      {/* Header */}
      <header
        className={`sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-[0] w-full bg-white text-sm py-2.5 sm:py-4 ${headerPadClass} dark:bg-neutral-800 md:block border border-gray-200 dark:border-neutral-700 transition-[padding] duration-300 ease-in-out`}
      >
        <nav
          className="flex basis-full items-center w-full mx-auto px-4 sm:px-6"
          aria-label="Global"
        >
         <div className="w-full flex items-center justify-end ms-auto md:justify-between gap-x-1 md:gap-x-3">
            {/* Mobile toggle */}
            <button
              type="button"
              className="md:hidden text-gray-500 hover:text-gray-700 dark:text-neutral-300 dark:hover:text-white"
              onClick={() => setIsOpen((v) => !v)}
              aria-label="Toggle navigation"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
         
            <div className="text-xl font-semibold text-gray-800 dark:text-white">
              {title}
            </div>
          </div>
            <div className="hs-dropdown [--placement:bottom-right] relative inline-flex">
          <button id="hs-dropdown-account" type="button" className="size-10 inline-flex justify-center items-center gap-x-3 text-sm font-semibold rounded-full border border-transparent text-gray-800 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none dark:text-white" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
            <img className="shrink-0 size-9.5 rounded-full" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80" alt="Avatar"/>
          </button>

          <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full" role="menu" aria-orientation="vertical" aria-labelledby="hs-dropdown-account">
            <div className="py-3 px-5 bg-gray-100 rounded-t-lg dark:bg-neutral-700">
              <p className="text-sm text-gray-500 dark:text-neutral-500">Signed in as</p>
              <p className="text-sm font-medium text-gray-800 dark:text-neutral-200">james@site.com</p>
            </div>
            <div className="p-1.5 space-y-0.5">
              <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300" href="#">
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
                Newsletter
              </a>
              <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300" href="#">
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                Purchases
              </a>
              <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300" href="#">
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m8 17 4 4 4-4"/></svg>
                Downloads
              </a>
              <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300" href="#">
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                Team Account
              </a>
            </div>
          </div>
        </div>
        </nav>

      </header>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 ${asideWidthClass} bg-white border-r border-gray-200 flex flex-col justify-between overflow-hidden transition-[width,transform] duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isCollapsed ? 'md:-translate-x-0' : 'md:translate-x-0'} dark:bg-neutral-900 dark:border-neutral-800`}
        style={{ width: isCollapsed ? 80 : 256 }}
      >
        {/* Logo */}
        {logo ? (
          <div
            className={`p-4 ${
              isCollapsed
                ? 'flex flex-col items-center justify-center gap-3'
                : 'flex items-center justify-between'
            } cursor-pointer`}
          >
            {logo.href ? (
              <a
                href={logo.href}
                aria-label={logo.alt || 'Logo'}
                className={`${isCollapsed ? '' : 'mx-auto'}`}
              >
                <img
                  src={isCollapsed ? (collapsedLogoSrc ?? SmallLogo) : logo.src}
                  alt={logo.alt || 'Logo'}
                  className={`${
                    isCollapsed ? 'h-8' : 'h-12'
                  } w-auto transition-all duration-300 ease-in-out`}
                />
              </a>
            ) : (
              <img
                src={isCollapsed ? (collapsedLogoSrc ?? SmallLogo) : logo.src}
                alt={logo.alt || 'Logo'}
                className={`${
                  isCollapsed ? 'h-8' : 'h-12'
                } w-auto ${isCollapsed ? '' : 'mx-auto'} transition-all duration-300 ease-in-out`}
              />
            )}
            <button
              type="button"
              onClick={() => setIsCollapsed((v) => !v)}
              className="hidden md:inline-flex items-center justify-center w-8 h-8 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              title={isCollapsed ? 'Expand' : 'Collapse'}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        ) : (
          <div className="p-4" />
        )}

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1 text-sm font-medium text-gray-700 dark:text-neutral-200">
          {items.map((item, idx) => {
            const resolvedTo = resolvePathTemplate(item.to, location.pathname);
            const active = isActive(resolvedTo, item.exact);
            return (
              <React.Fragment key={`${item.label}-${idx}`}>
                {item.separatorAbove && (
                  <div className="mt-3 px-2">
                    <hr className="border-t-2 border-gray-100 dark:border-neutral-700" />
                  </div>
                )}
                <Link
                  to={resolvedTo}
                  relative="path" // ✅ lien relatif
                  title={item.label}
                  className={`flex items-center ${
                    isCollapsed ? 'justify-center' : 'gap-3'
                  } p-3 rounded-lg transition-colors duration-200 ${
                    active
                      ? 'text-orange-400'
                      : 'hover:bg-gray-100 text-gray-700 dark:text-neutral-200'
                  }`}
                >
                  {item.icon}
                  <span
                    className={`${
                      isCollapsed
                        ? 'max-w-0 opacity-0 scale-95 ml-0'
                        : 'max-w-[160px] opacity-100 scale-100 ml-2'
                    } overflow-hidden whitespace-nowrap transition-all duration-200`}
                    aria-hidden={isCollapsed}
                  >
                    {item.label}
                  </span>
                </Link>
              </React.Fragment>
            );
          })}
        </nav>

        {/* Footer */}
        {footer && (
          <div
            className={`border-t border-gray-200 dark:border-neutral-800 p-4 flex flex-col gap-3 transition-all duration-200 ${
              isCollapsed
                ? 'opacity-0 max-h-0 overflow-hidden p-0'
                : 'opacity-100 max-h-40'
            }`}
          >
            {footer}
          </div>
        )}
      </aside>
    </>
  );
};

export default BaseSidebar;
