import React, { useState, useRef } from 'react'

const initialAssistants = [
  {
    name: 'Assistant Marketing',
    role: 'Admin',
    status: 'Active',
    created: '28 Dec, 12:12'
  },
  {
    name: 'Assistant Human Resources',
    role: 'Editor',
    status: 'Warning',
    created: '20 Dec, 09:27'
  },
  {
    name: 'Assistant IT',
    role: 'Viewer',
    status: 'Danger',
    created: '18 Dec, 15:20'
  },
  {
    name: 'Assistant Sales',
    role: 'Admin',
    status: 'Active',
    created: '18 Dec, 15:20'
  }
]

interface CreateRoleModalProps {
  onCreateRole: (roleName: string, permissions: string[], assistants: string[]) => void;
}

const CreateRoleModal: React.FC<CreateRoleModalProps> = ({ onCreateRole }) => {
  const [roleName, setRoleName] = useState('')
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
  const [selectedAssistants, setSelectedAssistants] = useState<string[]>([])
  const closeModalRef = useRef<HTMLButtonElement>(null)

  const permissions = [
    'Manage organization',
    'Manage assistant',
    'View assistant',
    'View role',
    'Manage role',
    'View user',
    'Manage users',
    'Manage api key',
    'View logs',
    'Manage logs',
    'View files',
    'Manage files',
    'View thread',
    'Manage threads',
    'Send message'
  ]

  const handleCheckboxChange = (permission: string) => {
    setSelectedPermissions((prevSelected) =>
      prevSelected.includes(permission)
        ? prevSelected.filter((p) => p !== permission)
        : [...prevSelected, permission]
    )
  }

  const handleAssistantSelect = (assistant: string) => {
    setSelectedAssistants((prevSelected) =>
      prevSelected.includes(assistant)
        ? prevSelected.filter((a) => a !== assistant)
        : [...prevSelected, assistant]
    )
  }

  const createRole = () => {
    onCreateRole(roleName, selectedPermissions, selectedAssistants)
    setRoleName('')
    setSelectedPermissions([])
    setSelectedAssistants([])
    if (closeModalRef.current) {
      closeModalRef.current.click()
    }
  }

  const isFormValid = roleName.trim() !== '' && selectedPermissions.length > 0 && selectedAssistants.length > 0

  return (
    <div
      id="hs-basic-modal"
      className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-[80] opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
      role="dialog"
      tabIndex={-1}
      aria-labelledby="hs-basic-modal-label"
    >
      <div className="sm:max-w-lg sm:w-full m-3 sm:mx-auto">
        <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
          <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
            <h3 id="hs-basic-modal-label" className="font-bold text-gray-800 dark:text-white">
              Create Role
            </h3>
            <button
              type="button"
              className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
              aria-label="Close"
              data-hs-overlay="#hs-basic-modal"
              ref={closeModalRef}
            >
              <span className="sr-only">Close</span>
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>
          <div className="p-4 overflow-y-auto">
            <div className="max-w-sm space-y-3">
              <div>
                <label className="text-sm font-semibold text-custom-gray-dark dark:text-white">Enter Role Name</label>
                <input
                  type="text"
                  className="py-3 px-4 mt-1 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  placeholder="Role name"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                />
              </div>
              <div className="mt-6 mb-6 w-full">
                <label className="text-sm font-semibold text-custom-gray-dark dark:text-white">Select Permissions</label>
                <div className="grid grid-cols-2 gap-4 mt-1">
                  {permissions.map((permission) => (
                    <div key={permission} className="flex items-center">
                      <input
                        type="checkbox"
                        className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                        id={permission}
                        checked={selectedPermissions.includes(permission)}
                        onChange={() => handleCheckboxChange(permission)}
                        disabled={roleName.trim() === ''}
                      />
                      <label htmlFor={permission} className="text-sm text-gray-500 ml-3 dark:text-neutral-400">
                        {permission}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 mb-6">
                <label className="text-sm font-semibold text-custom-gray-dark dark:text-white">Select Assistants</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {initialAssistants.map((assistant) => (
                    <div key={assistant.name} className="relative">
                      <div className={`hs-tooltip [--trigger:hover] inline-block ${selectedPermissions.length === 0 ? 'pointer-events-none opacity-50' : ''}`}>
                        <span
                          className={`inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium cursor-pointer bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500 ${selectedPermissions.length === 0 ? 'pointer-events-none opacity-50' : ''}`}
                          onClick={() => handleAssistantSelect(assistant.name)}
                        >
                          {assistant.name}
                          {selectedAssistants.includes(assistant.name) && (
                            <button
                              type="button"
                              className="ml-2 shrink-0 inline-flex items-center justify-center rounded-full hover:bg-blue-200 focus:outline-none focus:bg-blue-200 focus:text-blue-500 dark:hover:bg-blue-900"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleAssistantSelect(assistant.name)
                              }}
                            >
                              <span className="sr-only">Remove badge</span>
                              <svg className="shrink-0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 6L6 18" />
                                <path d="M6 6l12 12" />
                              </svg>
                            </button>
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
            <button
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
              data-hs-overlay="#hs-basic-modal"
            >
              Close
            </button>
            <button
              type="button"
              className={`py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none ${!isFormValid ? 'opacity-50 pointer-events-none' : ''}`}
              onClick={createRole}
              disabled={!isFormValid}
            >
              Create role
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateRoleModal
