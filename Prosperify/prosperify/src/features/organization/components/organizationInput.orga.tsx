import React, { useState } from 'react'
import SidebarOrga from './sidebar.orga'

const OrganizationInput: React.FC = () => {
  const [organizationName, setOrganizationName] = useState('')
  const [isInputDisabled, setIsInputDisabled] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrganizationName(e.target.value)
  }

  const handleSubmit = () => {
    if (!organizationName) {
      setError('Organization name cannot be empty.')
      return
    }
    setError(null)
    setIsInputDisabled(true)

    // Simulate a delay where the input is disabled
    setTimeout(() => {
      setIsInputDisabled(false)
    }, 5000) // 5 seconds before enabling the input again
  }

  return (
    <>
      <SidebarOrga title={'Organization'} />
      <div className="p-4 bg-white ml-64">
        <div className="p-4 rounded-lg w-2/3 border border-gray-200">
          <h2 className="text-base font-semibold mb-2">Set Organization Name</h2>
          <p className="text-sm text-custom-gray-dark mb-4">
            Please enter the name of your organization.
          </p>

          {error && (
            <div className="mb-4 text-red-600">
              {error}
            </div>
          )}

          <div className="max-w-sm space-y-3 mb-4">
            <input
              type="text"
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="Organization Name"
              value={organizationName}
              onChange={handleInputChange}
              disabled={isInputDisabled} // Disabled after submission
            />
          </div>

          <button
            onClick={handleSubmit}
            className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
            disabled={isInputDisabled} // Disable the button when input is disabled
          >
            Submit
          </button>

          {isInputDisabled && (
            <p className="mt-2 text-sm text-gray-600">
              You cannot change the name for 5 seconds...
            </p>
          )}
        </div>
      </div>
    </>
  )
}

export default OrganizationInput
