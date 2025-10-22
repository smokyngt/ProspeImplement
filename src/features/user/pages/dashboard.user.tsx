import React, { useState } from 'react';
import { useOutlet } from 'react-router-dom';
import SidebarUser from '../components/sidebar.user';
import GridAssistantUser from '../components/gridAssistant.user';
import DashboardLayout from '@/components/layout/DashboardLayout';


const DashboardUser: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  // Simulate an error for demonstration
  // const simulateError = () => {
  //   setError('An error occurred while loading the dashboard.');
  //   setTimeout(() => setError(null), 5000); // Clear error after 5 seconds
  // }

  const outlet = useOutlet();

  return (
    <DashboardLayout
      sidebar={<SidebarUser title={'home'} />}
      center
      maxWidthClassName="max-w-5xl"
      paddingClassName="p-4 sm:p-6 space-y-4 sm:space-y-6 flex flex-col items-center w-full"
      error={error}
      onCloseError={() => setError(null)}
    >
      {outlet ?? (
        <>
          {/* Section de bienvenue */}
          <div className="flex flex-col items-center w-full max-w-md mb-8 text-center">
            <img
              className="inline-block size-[42px] rounded-full transition-transform duration-300 transform hover:scale-110"
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
              alt="Avatar"
            />
            <h2 className="mt-2 text-xl font-medium text-gray-800">Hello, Bassem</h2>
            <p className="text-sm text-gray-400 font-semibold mt-1">
              Select an assistant to start a new conversation and get the support you need for your projects.
            </p>
          </div>

          {/* Grille des assistants */}
          <GridAssistantUser />
        </>
      )}
    </DashboardLayout>
  );
};

export default DashboardUser;
