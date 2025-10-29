import React, { useState } from 'react'
import AlertError from '@/components/ui/base/Alert/alertError'
const initialLogs = [
  {
    user: 'John Doe',
    activity: 'Created a new project',
    assistant: 'Assistant Marketing',
    timestamp: '28 Dec, 12:12'
  },
  {
    user: 'Jane Smith',
    activity: 'Updated user roles',
    assistant: 'Assistant Human Resources',
    timestamp: '20 Dec, 09:27'
  },
  {
    user: 'Alice Johnson',
    activity: 'Deleted a file',
    assistant: 'Assistant IT',
    timestamp: '18 Dec, 15:20'
  },
  {
    user: 'Bob Brown',
    activity: 'Sent a message',
    assistant: 'Assistant Sales',
    timestamp: '18 Dec, 15:20'
  }
]

const TableLogs: React.FC = () => {
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Logique de recherche
  const filteredLogs = initialLogs.filter(log =>
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.activity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.assistant.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
    
      <section className="w-full max-w-6xl p-4 ">
        {/* Header */}
        <header className="mb-4">
          <h2 className="text-base font-semibold mb-1 font-sans">Users</h2>
          <p className="text-sm text-gray-600">
            View all the users in your system. You can manage their roles and statuses individually.
          </p>
        </header>

      {error && (
        <div className="fixed top-4 right-4 z-50">
          <AlertError message={error} onClose={() => setError(null)} description={''} />
        </div>
      )}
      <div className="overflow-x-auto w-full">
        <div className="min-w-full inline-block align-middle w-10/12 max-w-4xl">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden w-11/12 ">
            <div className="px-6 py-4 flex justify-between items-center border-b border-gray-200">
              <div className="relative max-w-sm flex-1 mr-4">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400 dark:text-white/60" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search by user, activity, or assistant"
                  className="py-2 pl-10 pr-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-8 py-3 text-left">
                    <div className="flex items-center gap-x-2">
                      <span className="text-sm font-semibold uppercase tracking-wide text-gray-800">User</span>
                    </div>
                  </th>
                  <th scope="col" className="px-8 py-3 text-left">
                    <div className="flex items-center gap-x-2">
                      <span className="text-sm font-semibold uppercase tracking-wide text-gray-800">Activity</span>
                    </div>
                  </th>
                  <th scope="col" className="px-8 py-3 text-left">
                    <div className="flex items-center gap-x-2">
                      <span className="text-sm font-semibold uppercase tracking-wide text-gray-800">Assistant</span>
                    </div>
                  </th>
                  <th scope="col" className="px-8 py-3 text-left">
                    <div className="flex items-center gap-x-2">
                      <span className="text-sm font-semibold uppercase tracking-wide text-gray-800">Timestamp</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredLogs.map((log, index) => (
                  <tr key={index} className="cursor-pointer">
                    <td className="px-8 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-x-3">
                        <div className="grow">
                          <span className="block text-sm font-semibold text-gray-800">{log.user}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-3 whitespace-nowrap">
                      <span className="block text-sm font-semibold text-gray-800">{log.activity}</span>
                    </td>
                    <td className="px-8 py-3 whitespace-nowrap">
                      <span className="block text-sm font-semibold text-gray-800">{log.assistant}</span>
                    </td>
                    <td className="px-8 py-3 whitespace-nowrap">
                      <span className="text-sm text-gray-500">{log.timestamp}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      </section>
    </>
  )
}

export default TableLogs 

