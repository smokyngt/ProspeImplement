import React, { useMemo, useState } from 'react'
import CreateRoleModal from './create-role.orga'
import AlertSuccess from '@/components/ui/base/Alert/alertSuccess'
import AlertError from '@/components/ui/base/Alert/alertError'

const initialRoles = [
  { name: 'Admin',  permissions: ['Manage organization', 'Manage User', 'View logs'], created: '28 Dec, 12:12' },
  { name: 'Editor', permissions: ['View assistant', 'Manage threads'],                 created: '20 Dec, 09:27' },
  { name: 'Viewer', permissions: ['View assistant', 'View role'],                      created: '18 Dec, 15:20' }
]

const RoleManagementTable: React.FC = () => {
  const [roles, setRoles] = useState(initialRoles)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const filteredRoles = useMemo(
    () => roles.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [roles, searchTerm]
  )

  const handleCreateRole = (roleName: string, permissions: string[]) => {
    const newRole = {
      name: roleName,
      permissions,
      created: new Date().toLocaleString()
    }
    setRoles(prev => [...prev, newRole])
    setShowSuccessMessage(true)
  }

  return (
    <>
      {/* Alerts flottants */}
      {error && (
        <div className="fixed top-4 right-4 z-50">
          <AlertError message={error} onClose={() => setError(null)} description={''} />
        </div>
      )}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50">
          <AlertSuccess message="Role created successfully!" onClose={() => setShowSuccessMessage(false)} />
        </div>
      )}

      {/* Contenu principal */}
      <section className="w-full max-w-6xl p-4 ">
        {/* Header */}
        <header className="mb-4">
          <h2 className="text-base font-semibold mb-1 font-sans">Manage Roles</h2>
          <p className="text-sm text-gray-600">
            View all the roles in your system. You can manage their permissions and statuses individually.
          </p>
        </header>

        {/* Barre outils */}
        <div className="border border-gray-200 rounded-xl shadow-sm bg-white overflow-hidden">
          <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200">
            <div className="relative max-w-sm">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by name"
                aria-label="Search roles by name"
                className="py-2 pl-10 pr-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div>
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                data-hs-overlay="#hs-basic-modal"
              >
                <svg className="shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                Create Role
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-start">
                    <div className="flex items-center gap-x-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">Name</span>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-start">
                    <div className="flex items-center gap-x-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">Permissions</span>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-start">
                    <div className="flex items-center gap-x-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">Created</span>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-end" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRoles.map((role) => (
                  <tr key={role.name} className="cursor-pointer">
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                        <span className="block text-sm font-semibold text-gray-800">{role.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <span className="block text-sm font-semibold text-gray-800">{role.permissions.join(', ')}</span>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <span className="text-sm text-gray-500">{role.created}</span>
                    </td>
                    <td className="px-6 py-1.5 text-end">
                      <div className="hs-dropdown [--placement:bottom-right] relative inline-block">
                        <button
                          id="hs-table-dropdown-1"
                          type="button"
                          className="hs-dropdown-toggle py-1.5 px-2 inline-flex justify-center items-center gap-2 rounded-lg text-gray-700 align-middle disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:text-neutral-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                          aria-haspopup="menu"
                          aria-expanded="false"
                          aria-label="Dropdown"
                        >
                          <svg className="shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="19" cy="12" r="1" />
                            <circle cx="5" cy="12" r="1" />
                          </svg>
                        </button>
                        <div
                          className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden divide-y divide-gray-200 min-w-40 z-20 bg-white shadow-2xl rounded-lg p-2 mt-2 dark:divide-neutral-700 dark:bg-neutral-800 dark:border dark:border-neutral-700"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="hs-table-dropdown-1"
                        >
                          <div className="py-2 first:pt-0 last:pb-0">
                            <span className="block py-2 px-3 text-xs font-medium uppercase text-gray-400 dark:text-neutral-600">
                              Actions
                            </span>
                            <a className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300" href="#">
                              Rename role
                            </a>
                            <a className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300" href="#">
                              Add to favorites
                            </a>
                            <a className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300" href="#">
                              Archive role
                            </a>
                          </div>
                          <div className="py-2 first:pt-0 last:pb-0">
                            <a
                              className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-red-600 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-red-500 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
                              href="#"
                              onClick={(e) => {
                                e.preventDefault()
                                setRoles(prev => prev.filter(r => r.name !== role.name))
                              }}
                            >
                              Delete
                            </a>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredRoles.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-500">
                      No roles found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        <CreateRoleModal onCreateRole={handleCreateRole} />
      </section>
    </>
  )
}

export default RoleManagementTable