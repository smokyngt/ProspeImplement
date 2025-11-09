import React, { useRef, useState } from 'react';
import { useRoles } from '../roles/hooks/useRoles';
import { useAssistants } from '@/features/assistant/hook/useAssistants';
import type { AssistantScope, RoleScope } from '../roles/types/types';
import type { AssistantSummary } from '@/features/assistant/types/assistantTypes';

interface CreateRoleModalProps {
  onCreateRole: (
    roleName: string,
    scopes: RoleScope[],
    assistants: Array<{ id: string; scopes: AssistantScope[] }>
  ) => void;
}

const CreateRoleModal: React.FC<CreateRoleModalProps> = ({ onCreateRole }) => {
  const closeModalRef = useRef<HTMLButtonElement>(null);
  const roles = useRoles();
  const assistants = useAssistants();

  // États locaux
  const [roleName, setRoleName] = useState('');
  const [selectedScopes, setSelectedScopes] = useState<RoleScope[]>([]);
  const [selectedAssistants, setSelectedAssistants] = useState<
    Array<{ id: string; name: string; scopes: AssistantScope[] }>
  >([]);

  // ✅ On récupère la liste des assistants correctement typée
  const {
    data: assistantsResponse,
    isLoading: assistantsLoading,
  } = assistants.useList();

  // ✅ On extrait la liste typée (ou tableau vide)
  const assistantsList: AssistantSummary[] = assistantsResponse?.assistants ?? [];

  const scopeOptions: Array<{ label: string; value: RoleScope }> = [
    { label: 'Manage Organization', value: 'organization' },
    { label: 'Manage Assistants', value: 'assistants' },
    { label: 'Manage Roles', value: 'roles' },
    { label: 'Manage Members', value: 'members' },
    { label: 'View Logs', value: 'logs' },
    { label: 'Manage API Keys', value: 'apiKeys' },
    { label: 'Manage Invitations', value: 'invitations' },
  ];

  const assistantScopeOptions: AssistantScope[] = ['files', 'messages'];

  const handleScopeChange = (scope: RoleScope) => {
    setSelectedScopes((prev) =>
      prev.includes(scope) ? prev.filter((s) => s !== scope) : [...prev, scope]
    );
  };

  const handleAssistantToggle = (assistantId: string, assistantName: string) => {
    const exists = selectedAssistants.find((a) => a.id === assistantId);

    if (exists) {
      setSelectedAssistants((prev) => prev.filter((a) => a.id !== assistantId));
    } else {
      setSelectedAssistants((prev) => [
        ...prev,
        { id: assistantId, name: assistantName, scopes: ['files', 'messages'] },
      ]);
    }
  };

  const handleAssistantScopeToggle = (assistantId: string, scope: AssistantScope) => {
    setSelectedAssistants((prev) =>
      prev.map((a) =>
        a.id === assistantId
          ? {
              ...a,
              scopes: a.scopes.includes(scope)
                ? a.scopes.filter((s) => s !== scope)
                : [...a.scopes, scope],
            }
          : a
      )
    );
  };

  const createRole = () => {
    const assistantsPayload = selectedAssistants.map((a) => ({
      id: a.id,
      scopes: a.scopes,
    }));

    onCreateRole(roleName, selectedScopes, assistantsPayload);

    // Reset form
    setRoleName('');
    setSelectedScopes([]);
    setSelectedAssistants([]);

    if (closeModalRef.current) {
      closeModalRef.current.click();
    }
  };

  const isFormValid =
    roleName.trim() !== '' &&
    selectedScopes.length > 0 &&
    selectedAssistants.length > 0 &&
    selectedAssistants.every((a) => a.scopes.length > 0);

  return (
    <div
      id="hs-basic-modal"
      className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-[80] opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
      role="dialog"
      tabIndex={-1}
      aria-labelledby="hs-basic-modal-label"
    >
      <div className="sm:max-w-2xl sm:w-full m-3 sm:mx-auto">
        <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto">
          {/* Header */}
          <div className="flex justify-between items-center py-3 px-4 border-b">
            <h3 id="hs-basic-modal-label" className="font-bold text-gray-800">
              Create Role
            </h3>
            <button
              type="button"
              className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200"
              aria-label="Close"
              data-hs-overlay="#hs-basic-modal"
              ref={closeModalRef}
            >
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="p-4 overflow-y-auto max-h-[70vh]">
            <div className="space-y-4">
              {/* Role Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Role Name</label>
                <input
                  type="text"
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter role name"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                />
              </div>

              {/* Global Scopes */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Global Permissions
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {scopeOptions.map(({ label, value }) => (
                    <div key={value} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`scope-${value}`}
                        className="shrink-0 border-gray-200 rounded text-blue-600 focus:ring-blue-500"
                        checked={selectedScopes.includes(value)}
                        onChange={() => handleScopeChange(value)}
                        disabled={!roleName.trim()}
                      />
                      <label htmlFor={`scope-${value}`} className="text-sm text-gray-600 ml-3">
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assistants */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Assistant Permissions
                </label>
                {assistantsLoading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                  </div>
                ) : assistantsList.length === 0 ? (
                  <p className="text-sm text-gray-500">No assistants available</p>
                ) : (
                  <div className="space-y-3">
                    {assistantsList.map((assistant: AssistantSummary) => {
                      const isSelected = selectedAssistants.find((a) => a.id === assistant.id);

                      return (
                        <div key={assistant.id} className="border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id={`assistant-${assistant.id}`}
                                className="shrink-0 border-gray-200 rounded text-blue-600"
                                checked={!!isSelected}
                                onChange={() =>
                                  handleAssistantToggle(assistant.id, assistant.name)
                                }
                                disabled={selectedScopes.length === 0}
                              />
                              <label
                                htmlFor={`assistant-${assistant.id}`}
                                className="ml-3 text-sm font-medium text-gray-800"
                              >
                                {assistant.name}
                              </label>
                            </div>
                          </div>

                          {/* Assistant Scopes */}
                          {isSelected && (
                            <div className="ml-7 mt-2 flex gap-2">
                              {assistantScopeOptions.map((scope) => (
                                <label key={scope} className="inline-flex items-center">
                                  <input
                                    type="checkbox"
                                    className="shrink-0 border-gray-200 rounded text-blue-600 text-xs"
                                    checked={isSelected.scopes.includes(scope)}
                                    onChange={() => handleAssistantScopeToggle(assistant.id, scope)}
                                  />
                                  <span className="ml-2 text-xs text-gray-600 capitalize">
                                    {scope}
                                  </span>
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
          </div>

          {/* Footer */}
          <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
            <button
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
              data-hs-overlay="#hs-basic-modal"
            >
              Close
            </button>
            <button
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              onClick={createRole}
              disabled={!isFormValid}
            >
              Create Role
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRoleModal;
