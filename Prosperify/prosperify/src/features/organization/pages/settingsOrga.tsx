import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileOrganization from '../components/profile.organization';
import SettingsContentOrganization from '../components/settings.organization';
import DeleteContentOrganization from '../components/delete.organization';
import AlertError from '@/components/ui/base/Alert/alertError';

const SettingsOrganization: React.FC = () => {
  const { id: organizationId } = useParams<{ id: string }>();

  const [selectedOption, setSelectedOption] = useState('Informations Générales');
  const [error, setError] = useState<string | null>(null);

  const options = ['Informations Générales', 'Paramètres', 'Supprimer'];

  if (!organizationId) {
    return (
      <div className="p-4 text-center text-red-500">
        Organization ID is missing. Please select a valid organization.
      </div>
    );
  }

  return (
    <div>
      <div className="p-4 bg-white">
        <h2 className="text-base font-semibold mb-2">Organization Settings</h2>
        <p className="text-sm text-gray-600">
          Manage your organization configuration and preferences.
        </p>
      </div>

      <div className="p-4">
        {error && (
          <div className="fixed top-4 right-4 z-50">
            <AlertError message={error} onClose={() => setError(null)} description="" />
          </div>
        )}

        <div className="flex gap-4 mb-4 border border-gray-200 p-1 rounded-lg justify-around w-1/2">
          {options.map((option) => (
            <button
              key={option}
              className={`py-1 px-2 rounded font-semibold text-sm transition-all duration-200 flex-1 ${
                selectedOption === option
                  ? 'bg-[#f1f5f9] text-[rgb(15,23,42)]'
                  : 'text-[rgb(100,116,139)] hover:text-[rgb(15,23,42)]'
              }`}
              onClick={() => setSelectedOption(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="p-4 border border-gray-200 rounded-lg bg-white transition-all duration-200 w-1/2">
          {selectedOption === 'Informations Générales' && (
            <ProfileOrganization organizationId={organizationId} />
          )}
          {selectedOption === 'Paramètres' && (
            <SettingsContentOrganization organizationId={organizationId} />
          )}
          {selectedOption === 'Supprimer' && (
            <DeleteContentOrganization organizationId={organizationId} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsOrganization;
