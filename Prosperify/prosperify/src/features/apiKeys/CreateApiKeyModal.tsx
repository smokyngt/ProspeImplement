import React, { useRef, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { prosperify } from '@/core/ProsperifyClient';
import AlertError from '@/components/ui/base/Alert/alertError';
import AlertSuccess from '@/components/ui/base/Alert/alertSuccess';
import type { ApiKeyScope, AssistantScope } from '@/features/apiKeys/types';
import { apiKeyKeys } from './hooks/useApiKeys';

interface CreateApiKeyModalProps {
  onSuccess?: () => void;
}

const CreateApiKeyModal: React.FC<CreateApiKeyModalProps> = ({ onSuccess }) => {
  const closeModalRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();

  const [name, setName] = useState('');
  const [selectedScopes, setSelectedScopes] = useState<ApiKeyScope[]>([]);
  const [selectedAssistants, setSelectedAssistants] = useState<
    Array<{ id: string; name: string; scopes: AssistantScope[] }>
  >([]);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Charger les assistants pour pouvoir donner un accès assistant-level (optionnel)
  const { data: assistants = [], isLoading: assistantsLoading } = useQuery({
    queryKey: ['assistants', 'list'],
    queryFn: async () => {
      const response = await prosperify.assistants.postV1AssistantsList(); // ✅ updated: direct SDK call
      return (response.data?.assistants ?? []) as Array<{ id: string; name: string }>;
    },
    staleTime: 5 * 60 * 1000,
  });

  const scopeOptions: Array<{ label: string; value: ApiKeyScope }> = [
    { label: 'Manage Assistants', value: 'assistants' },
    { label: 'View Logs', value: 'logs' },
  ];

  const assistantScopeOptions: AssistantScope[] = ['files', 'messages'];

  const handleScopeChange = (scope: ApiKeyScope) => {
    setSelectedScopes((prev) => (prev.includes(scope) ? prev.filter((s) => s !== scope) : [...prev, scope]));
  };

  const handleAssistantToggle = (assistantId: string, assistantName: string) => {
    const exists = selectedAssistants.find((a) => a.id === assistantId);
    if (exists) setSelectedAssistants((prev) => prev.filter((a) => a.id !== assistantId));
    else setSelectedAssistants((prev) => [...prev, { id: assistantId, name: assistantName, scopes: ['files', 'messages'] }]);
  };

  const handleAssistantScopeToggle = (assistantId: string, scope: AssistantScope) => {
    setSelectedAssistants((prev) =>
      prev.map((a) =>
        a.id === assistantId
          ? { ...a, scopes: a.scopes.includes(scope) ? a.scopes.filter((s) => s !== scope) : [...a.scopes, scope] }
          : a
      )
    );
  };

  const handleSubmit = async () => {
    setError(null);
    setCreating(true);

    const assistantsPayload = selectedAssistants.map((a) => ({ id: a.id, scopes: a.scopes }));

    try {
      const response = await prosperify.apiKeys.postV1KeysNew({ // ✅ updated: direct SDK call
        name,
        scopes: selectedScopes,
        assistants: assistantsPayload,
      });

      const created = response.data?.apiKey;
      if (!created) {
        throw new Error('Prosperify API did not return the created API key.');
      }

      queryClient.invalidateQueries({ queryKey: apiKeyKeys.all });
      queryClient.setQueryData(apiKeyKeys.detail(created.id), created);

      setSuccess('API key créée avec succès');
      setTimeout(() => setSuccess(null), 3000);

      // reset
      setName('');
      setSelectedScopes([]);
      setSelectedAssistants([]);

      onSuccess?.();

      if (closeModalRef.current) closeModalRef.current.click();
    } catch (err: any) {
      setError(err?.message || 'Erreur lors de la création de la clé');
    } finally {
      setCreating(false);
    }
  };

  const isFormValid = name.trim() !== '' && selectedScopes.length > 0;

  return (
    <>
    <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-scale-animation-modal" data-hs-overlay="#hs-scale-animation-modal">
  Open modal
</button>
    <div id="create-api-key-modal" className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto">
      <div className="sm:max-w-2xl sm:w-full m-3 sm:mx-auto">
        <div className="flex flex-col bg-white border shadow-sm rounded-xl">
          {error && (
            <div className="fixed top-4 right-4 z-50">
              <AlertError message={error} onClose={() => setError(null)} description={''} />
            </div>
          )}
          {success && (
            <div className="fixed top-4 right-4 z-50">
              <AlertSuccess message={success} onClose={() => setSuccess(null)} />
            </div>
          )}

          {/* Header */}
          <div className="flex justify-between items-center py-3 px-4 border-b">
            <h3 className="font-bold text-gray-800">Create API Key</h3>
            <button
              type="button"
              className="size-8 inline-flex justify-center items-center rounded-full bg-gray-100 hover:bg-gray-200"
              data-hs-overlay="#create-api-key-modal"
              ref={closeModalRef}
            >
              <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="p-4 overflow-y-auto max-h-[70vh] space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">API Key Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm" placeholder="Production API Key" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Permissions</label>
              <div className="grid grid-cols-2 gap-3">
                {scopeOptions.map(({ label, value }) => (
                  <div key={value} className="flex items-center">
                    <input type="checkbox" id={`scope-${value}`} checked={selectedScopes.includes(value)} onChange={() => handleScopeChange(value)} className="border-gray-200 rounded text-blue-600" />
                    <label htmlFor={`scope-${value}`} className="ml-3 text-sm">{label}</label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Assistant Access (optionnel)</label>
              {assistantsLoading ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto" />
                </div>
              ) : (
                <div className="space-y-3">
                  {assistants.map((assistant: any) => {
                    const isSelected = selectedAssistants.find((a) => a.id === assistant.id);
                    return (
                      <div key={assistant.id} className="border rounded-lg p-3">
                        <div className="flex items-center">
                          <input type="checkbox" id={`assistant-${assistant.id}`} checked={!!isSelected} onChange={() => handleAssistantToggle(assistant.id, assistant.name)} className="border-gray-200 rounded text-blue-600" />
                          <label htmlFor={`assistant-${assistant.id}`} className="ml-3 text-sm font-medium">{assistant.name}</label>
                        </div>

                        {isSelected && (
                          <div className="ml-7 mt-2 flex gap-2">
                            {assistantScopeOptions.map((scope) => (
                              <label key={scope} className="inline-flex items-center">
                                <input type="checkbox" checked={isSelected.scopes.includes(scope)} onChange={() => handleAssistantScopeToggle(assistant.id, scope)} className="border-gray-200 rounded text-blue-600 text-xs" />
                                <span className="ml-2 text-xs capitalize">{scope}</span>
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-x-2 py-3 px-4 border-t">
            <button type="button" className="py-2 px-3 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-50" data-hs-overlay="#create-api-key-modal">
              Close
            </button>
            <button type="button" onClick={handleSubmit} disabled={!isFormValid || creating} className="py-2 px-3 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50">
              {creating ? 'Creating...' : 'Create API Key'}
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CreateApiKeyModal;
