import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { prosperify } from '@/core/ProsperifyClient';
import AlertSuccess from '@/components/ui/base/Alert/alertSuccess';
import AlertError from '@/components/ui/base/Alert/alertError';

interface CreateAssistantModalProps {
  onSuccess?: (assistantId: string) => void;
  variant?: 'primary' | 'secondary' | 'gradient';
  className?: string;
}

const CreateAssistantModal: React.FC<CreateAssistantModalProps> = ({
  onSuccess,
  variant = 'gradient',
  className = '',
}) => {
  const queryClient = useQueryClient();

  // -------------------------------------------------------------
  // 🧠 États locaux
  // -------------------------------------------------------------
  const [name, setName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // -------------------------------------------------------------
  // 💾 React Query mutation
  // -------------------------------------------------------------
  const createAssistant = useMutation({
    mutationFn: async (assistantName: string) => {
      const res = await prosperify.assistants.postV1AssistantsNew({
        name: assistantName.trim(),
      });

      const newAssistantId = res?.data?.assistant?.id;

      if (!newAssistantId) {
        throw new Error("ID de l'assistant non retourné par l'API.");
      }

      return { id: newAssistantId, response: res };
    },
    onSuccess: (data) => {
      setSuccess('Assistant créé avec succès !');

      // ✅ Invalider le cache des assistants pour rafraîchir la liste
      queryClient.invalidateQueries({ queryKey: ['assistants'] });

      setTimeout(() => {
        setName('');
        setSuccess(null);
        setIsOpen(false);
        onSuccess?.(data.id);
      }, 1500);
    },
  });

  // -------------------------------------------------------------
  // 💾 Création d'un assistant
  // -------------------------------------------------------------
  const handleSave = async () => {
    if (!name.trim()) {
      setValidationError("Le nom de l'assistant est requis.");
      return;
    }

    setValidationError(null);
    await createAssistant.mutateAsync(name);
  };

  // -------------------------------------------------------------
  // ❌ Fermeture du modal
  // -------------------------------------------------------------
  const handleClose = () => {
    if (!createAssistant.isPending) {
      setIsOpen(false);
      setName('');
      setValidationError(null);
      setSuccess(null);
      createAssistant.reset();
    }
  };

  // -------------------------------------------------------------
  // 🎨 Styles variants
  // -------------------------------------------------------------
  const buttonStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    gradient: 'bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl text-white',
  };

  // -------------------------------------------------------------
  // 🧱 Rendu du composant
  // -------------------------------------------------------------
  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`${buttonStyles[variant]} font-medium rounded-lg text-sm px-5 py-2.5 focus:ring-4 focus:outline-none transition ${className}`}
      >
        Create Assistant
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[80] overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center"
          onClick={handleClose}
        >
          <div
            className="w-full max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg dark:bg-neutral-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Create New Assistant
              </h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500"
                onClick={handleClose}
                disabled={createAssistant.isPending}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {success && (
              <div className="mt-4">
                <AlertSuccess message={success} onClose={() => setSuccess(null)} />
              </div>
            )}

            {validationError && (
              <div className="mt-4">
                <AlertError message={validationError} onClose={() => setValidationError(null)} description="" />
              </div>
            )}

            {createAssistant.error && (
              <div className="mt-4">
                <AlertError 
                  message={(createAssistant.error as any)?.message || "Erreur lors de la création de l'assistant."} 
                  onClose={() => createAssistant.reset()} 
                  description="" 
                />
              </div>
            )}

            <div className="p-4">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Assistant Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Customer Support Bot"
                  disabled={createAssistant.isPending}
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50"
                />
              </div>
            </div>

            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
              <button
                type="button"
                onClick={handleClose}
                disabled={createAssistant.isPending}
                className="py-2 px-3 text-sm font-medium rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={createAssistant.isPending || !name.trim()}
                className="py-2 px-3 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
              >
                {createAssistant.isPending && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                )}
                {createAssistant.isPending ? 'Creating...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateAssistantModal;