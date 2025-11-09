import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import GeneralInfoContent from '../components/settings/profile.assistant';
import SettingsContent from '../components/settings/settings.assistant';
import DeleteContent from '../components/settings/delete.assistant';
import AlertError from '@/components/ui/base/Alert/alertError';

const SettingsAssistant: React.FC = () => {
  // ✅ Récupération de l'ID depuis l'URL
  const { id: assistantId } = useParams<{ id: string }>();

  const [selectedOption, setSelectedOption] = useState('Basique');
  const [error, setError] = useState<string | null>(null);

  const handleButtonClick = (option: string) => {
    setSelectedOption(option);
  };

  const options = ['Informations Générales', 'Basique', 'Delete'];

  // ✅ Vérification de la présence de l'ID
  if (!assistantId) {
    return (
      <div className="p-4 text-center text-red-500">
        Assistant ID is missing. Please select a valid assistant.
      </div>
    );
  }

  return (
    <div>
      <div className="p-4 bg-white">
        <h2 className="text-base font-semibold mb-2">Assistant settings</h2>
        <p className="text-sm text-custom-gray-dark mb-4">
          Manage your assistant configuration and preferences.
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
              onClick={() => handleButtonClick(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="p-4 border border-gray-200 rounded-lg bg-white transition-all duration-200 w-1/2">
          {/* ✅ Passage de la vraie variable assistantId (sans guillemets) */}
          {selectedOption === 'Informations Générales' && (
            <GeneralInfoContent assistantId={assistantId} />
          )}
          {selectedOption === 'Basique' && (
            <SettingsContent assistantId={assistantId} />
          )}
          {selectedOption === 'Delete' && (
            <DeleteContent assistantId={assistantId} />
          )}
        </div>

        {/* Simulate error button (à retirer en production) */}
        <button
          onClick={() => setError('An error occurred while loading the content.')}
          className="mt-4 py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Simulate Error
        </button>
      </div>
    </div>
  );
};

export default SettingsAssistant;