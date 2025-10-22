import React, { useState } from 'react'
import AlertSuccess from '../../../components/ui/base/Alert/alertSuccess'
import AlertError from '../../../components/ui/base/Alert/alertError'
import InputEmail from '../../../components/ui/base/inputEmail/inputEmail.common'

const Profil: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setSuccess('Profile updated successfully')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Failed to update profile')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="relative overflow-x-hidden px-4 sm:px-6 lg:px-8 lg:pl-20">
        <div className="fixed top-4 right-4 z-50">
          {success && <AlertSuccess message={success} onClose={() => setSuccess(null)} />}
          {error && <AlertError message={error} onClose={() => setError(null)} description={''} />}
        </div>
        <div className="p-8 bg-white rounded-lg flex flex-col max-w-lg">
          <div className="mb-6">
            <h1 className="text-xl font-semibold mb-2">profil</h1>
            <p className="text-sm text-gray-600 mb-4">Update your accounts profile information and email address.</p>
          </div>
          <div className="space-y-3">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="This is placeholder"
              id="name"
              type="text"
              value={'bassem'}
            />
            <InputEmail />
          </div>
          <div className="mt-6">
            <button
              type="button"
              className={'py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-md border border-transparent bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:pointer-events-none'}
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Update'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profil
