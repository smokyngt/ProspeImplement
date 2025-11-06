import React from 'react';
import CreateAssistantModal from '../components/createAssistantModal';
import AssistantsList from '../components/assistantList';

const AssistantsPage: React.FC = () => {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Dashboard</h1>
          <p className="text-sm text-gray-600">
            View all the assistants in your organization. You can manage their settings and create new ones.
          </p>
        </div>

        <CreateAssistantModal />
      </div>

      {/* ✅ Liste automatiquement synchronisée via React Query */}
      <AssistantsList />
    </div>
  );
};

export default AssistantsPage;