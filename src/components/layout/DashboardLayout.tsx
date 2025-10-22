import React from 'react';
import { Outlet } from 'react-router-dom';
import AlertError from '../ui/base/Alert/alertError';

type DashboardLayoutProps = {
  sidebar: React.ReactNode;
  children?: React.ReactNode;
  useOutlet?: boolean; // when true, renders <Outlet /> if no children provided
  center?: boolean; // center inner content and constrain width
  maxWidthClassName?: string; // e.g., 'max-w-5xl' | 'max-w-6xl'
  paddingClassName?: string; // inner padding classes; default 'p-4 sm:p-6'
  error?: string | null;
  onCloseError?: () => void;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  sidebar,
  children,
  useOutlet,
  center,
  maxWidthClassName,
  paddingClassName,
  error,
  onCloseError,
}) => {
  const content = children ?? (useOutlet ? <Outlet /> : null);

  return (
    <>
      {sidebar}
      <div className={`w-full lg:ps-64 ${center ? '' : ''}`}>
        <div className={`${paddingClassName ?? 'p-4 sm:p-6'} ${center ? `w-full mx-auto ${maxWidthClassName ?? 'max-w-6xl'}` : ''}`}>
          {error && (
            <div className="fixed top-4 right-4 z-50">
              <AlertError message={error} onClose={onCloseError ?? (() => {})} description={''} />
            </div>
          )}
          {content}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
