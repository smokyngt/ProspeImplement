import React, { useMemo, useState } from 'react'
import AlertError from '@/components/ui/base/Alert/alertError'

type UserRole = 'Admin' | 'Editor' | 'Viewer'
type UserStatus = 'Active' | 'Warning' | 'Danger'

interface User {
  name: string
  role: UserRole
  status: UserStatus
  created: string
}

const initialUsers: User[] = [
  { name: 'Alice Johnson',  role: 'Admin',  status: 'Active',  created: '28 Dec, 12:12' },
  { name: 'Bob Smith',      role: 'Editor', status: 'Warning', created: '20 Dec, 09:27' },
  { name: 'Charlie Brown',  role: 'Viewer', status: 'Danger',  created: '18 Dec, 15:20' },
  { name: 'Diana Ross',     role: 'Admin',  status: 'Active',  created: '18 Dec, 15:20' },
]

const TableUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [currentPage] = useState(1)
  const usersPerPage = 20
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredUsers = useMemo(
    () => users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [users, searchTerm]
  )

  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = useMemo(
    () => filteredUsers.slice(indexOfFirstUser, indexOfLastUser),
    [filteredUsers, indexOfFirstUser, indexOfLastUser]
  )

  const changeRole = (index: number, newRole: UserRole) => {
    setUsers(prev => {
      if (index < 0 || index >= prev.length) return prev
      const updated = [...prev]
      updated[index] = { ...updated[index], role: newRole }
      return updated
    })
  }

  const deleteUser = (key: string) => {
    setUsers(prev => prev.filter(u => `${u.name}-${u.created}` !== key))
  }

  return (
    <>
      {error && (
        <div className="fixed top-4 right-4 z-50">
          <AlertError message={error} onClose={() => setError(null)} description={''} />
        </div>
      )}

      <section className="w-full max-w-6xl p-4">
        {/* Header */}
        <header className="mb-4">
          <h2 className="text-base font-semibold mb-1 font-sans">Users</h2>
          <p className="text-sm text-gray-600">
            View all the users in your system. You can manage their roles and statuses individually.
          </p>
        </header>

        <div className="border border-gray-200 rounded-xl shadow-sm bg-white overflow-hidden">
          {/* Toolbar */}
          <div className="px-6 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between border-b border-gray-200">
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
                aria-label="Search users by name"
                className="py-2 pl-10 pr-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-8 py-3 text-left">
                    <span className="text-sm font-semibold uppercase tracking-wide text-gray-800">Name</span>
                  </th>
                  <th scope="col" className="px-8 py-3 text-left">
                    <span className="text-sm font-semibold uppercase tracking-wide text-gray-800">Role</span>
                  </th>
                  <th scope="col" className="px-8 py-3 text-left">
                    <span className="text-sm font-semibold uppercase tracking-wide text-gray-800">Status</span>
                  </th>
                  <th scope="col" className="px-8 py-3 text-left">
                    <span className="text-sm font-semibold uppercase tracking-wide text-gray-800">Created</span>
                  </th>
                  <th scope="col" className="px-8 py-3 text-end" />
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {currentUsers.map((user, index) => {
                  const key = `${user.name}-${user.created}`
                  return (
                    <tr key={key} className="cursor-pointer">
                      <td className="px-8 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-x-3">
                          <div className="grow">
                            <span className="block text-sm font-semibold text-gray-800">{user.name}</span>
                            <span className="block text-sm text-gray-500">{user.name}</span>
                          </div>
                        </div>
                      </td>

                      <td className="px-8 py-3 whitespace-nowrap">
                        <select
                          value={user.role}
                          onChange={(e) => changeRole(index, e.target.value as UserRole)}
                          className="text-sm font-semibold text-gray-800 bg-white border border-gray-200 rounded-lg"
                        >
                          <option value="Admin">Admin</option>
                          <option value="Editor">Editor</option>
                          <option value="Viewer">Viewer</option>
                        </select>
                      </td>

                      <td className="px-8 py-3 whitespace-nowrap">
                        <span
                          className={`py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium rounded-full ${
                            user.status === 'Active'
                              ? 'bg-green-100 text-green-800'
                              : user.status === 'Warning'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          <svg className="w-2.5 h-2.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                            {user.status === 'Active' ? (
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                            ) : user.status === 'Warning' ? (
                              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                            ) : (
                              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                            )}
                          </svg>
                          {user.status}
                        </span>
                      </td>

                      <td className="px-8 py-3 whitespace-nowrap">
                        <span className="text-sm text-gray-500">{user.created}</span>
                      </td>

                      <td className="px-8 py-3 whitespace-nowrap text-right">
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
                                Rename team
                              </a>
                              <a className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300" href="#">
                                Add to favorites
                              </a>
                              <a className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300" href="#">
                                Archive team
                              </a>
                            </div>
                            <div className="py-2 first:pt-0 last:pb-0">
                              <a
                                className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-red-600 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-red-500 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault()
                                  deleteUser(key)
                                }}
                              >
                                Delete
                              </a>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                })}
                {currentUsers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-8 py-8 text-center text-sm text-gray-500">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="px-6 py-4 flex justify-between items-center border-t border-gray-200">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-800">{filteredUsers.length}</span> results
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default TableUsers