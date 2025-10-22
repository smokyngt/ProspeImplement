import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  collapsedLogoSrc?: string; // optional override for collapsed state logo
}

// Replace dynamic ":id" in route templates when we can infer it from current path (e.g. /assistant/:id/*)
function resolvePathTemplate(template: string, pathname: string): string {
  if (!template.includes(":")) return template;
  // Currently we only need :id for /assistant/:id/*; extend as needed
  const idMatch = pathname.match(/^\/assistant\/([^/]+)/);
  if (idMatch && idMatch[1]) {
    return template.replace(":id", idMatch[1]);
  }
  return template; // fallback; may not match isActive but still navigates to template
}

export const BaseSidebar: React.FC<BaseSidebarProps> = ({ title, logo, items, footer, collapsedLogoSrc }) => {
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

  const isActive = (to: string, exact?: boolean) => {
    const resolved = resolvePathTemplate(to, location.pathname);
    return exact ? location.pathname === resolved : location.pathname.startsWith(resolved);
  };

  useEffect(() => {
    try {
      localStorage.setItem('sidebar:collapsed', JSON.stringify(isCollapsed));
    } catch {}
    if (typeof document !== 'undefined') {
      document.body.dataset['sidebarCollapsed'] = String(isCollapsed);
    }
  }, [isCollapsed]);

  const headerPadClass = useMemo(() => (isCollapsed ? 'lg:ps-20' : 'lg:ps-64'), [isCollapsed]);
  const asideWidthClass = useMemo(() => (isCollapsed ? 'w-20' : 'w-64'), [isCollapsed]);

  return (
    <>
      {/* Header with title and mobile toggle to maintain layout push (lg:ps-64) */}
      <header className={`sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-[0] w-full bg-white text-sm py-2.5 sm:py-4 ${headerPadClass} dark:bg-neutral-800 md:block border border-gray-200 dark:border-neutral-700 transition-[padding] duration-300 ease-in-out`}>
        <nav className="flex basis-full items-center w-full mx-auto px-4 sm:px-6" aria-label="Global">
          <div className="w-full flex items-center justify-between sm:gap-x-3 sm:order-3">
            <button
              type="button"
              className="md:hidden text-gray-500 hover:text-gray-700 dark:text-neutral-300 dark:hover:text-white"
              onClick={() => setIsOpen((v) => !v)}
              aria-label="Toggle navigation"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
            <div className="text-xl font-semibold text-gray-800 dark:text-white">{title}</div>
            <div className="hidden md:flex items-center">
              {/* Desktop collapse/expand toggle */}
            
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
        {/* Logo + Toggle (toggle below logo when collapsed) */}
        {logo ? (
          <div className={`p-4 ${isCollapsed ? 'flex flex-col items-center justify-center gap-3' : 'flex items-center justify-between'} cursor-pointer`}>
            {logo.href ? (
              <a href={logo.href} aria-label={logo.alt || 'Logo'} className={`${isCollapsed ? '' : 'mx-auto'}`}>
                <img
                  src={isCollapsed ? (collapsedLogoSrc ?? SmallLogo) : logo.src}
                  alt={logo.alt || 'Logo'}
                  className={`${isCollapsed ? 'h-8' : 'h-12'} w-auto transition-all duration-300 ease-in-out`}
                />
              </a>
            ) : (
              <img
                src={isCollapsed ? (collapsedLogoSrc ?? SmallLogo) : logo.src}
                alt={logo.alt || 'Logo'}
                className={`${isCollapsed ? 'h-8' : 'h-12'} w-auto ${isCollapsed ? '' : 'mx-auto'} transition-all duration-300 ease-in-out`}
              />
            )}
            {isCollapsed ? (
              <button
                type="button"
                onClick={() => setIsCollapsed((v) => !v)}
                className="inline-flex items-center justify-center w-9 h-9 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                title={isCollapsed ? 'Expand' : 'Collapse'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsCollapsed((v) => !v)}
                className="hidden md:inline-flex items-center justify-center w-8 h-8 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                title={isCollapsed ? 'Expand' : 'Collapse'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            )}
          </div>
        ) : (
          <div className="p-4" />
        )}

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1 text-sm font-medium text-gray-700 dark:text-neutral-200">
          {items.map((item, idx) => {
            const resolvedTo = resolvePathTemplate(item.to, location.pathname);
            const active = isActive(item.to, item.exact);
            return (
              <React.Fragment key={`${item.label}-${idx}`}>
                {item.separatorAbove && (
                  <div className="mt-3 px-2">
                    <hr className="border-t-2 border-gray-100 dark:border-neutral-700" />
                  </div>
                )}
                <Link
                  to={resolvedTo}
                  title={item.label}
                  className={`flex items-center  ${isCollapsed ? 'justify-center' : 'gap-3'} p-3 rounded-lg transition-colors duration-200 ${
                    active ? 'text-orange-400' : 'hover:bg-gray-100 text-gray-700 dark:text-neutral-200'
                  }`}
                >
                  {item.icon}
                  <span
                    className={`${
                      isCollapsed
                        ? 'max-w-0 opacity-0 scale-95 ml-0'
                        : 'max-w-[160px] opacity-100 scale-100 ml-2 '
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

        {footer && (
          <div className={`border-t border-gray-200 dark:border-neutral-800 p-4 flex flex-col gap-3 transition-all duration-200 ${
            isCollapsed ? 'opacity-0 max-h-0 overflow-hidden p-0' : 'opacity-100 max-h-40'
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