import React, { useState } from 'react';
import AlertError from '@/components/ui/base/Alert/alertError';

interface Source {
  fileName: string;
  status: 'Active' | 'Warning' | 'Danger';
  portfolio: string;
  created: string;
}

const Sources: React.FC = () => {
  const [sources,] = useState<Source[]>([
    {
      fileName: 'document1.txt',
      status: 'Active',
      portfolio: '1/5',
      created: '28 Dec, 12:12'
    },
    {
      fileName: 'presentation.pptx',
      status: 'Warning',
      portfolio: '3/5',
      created: '20 Dec, 09:27'
    },
    {
      fileName: 'report.pdf',
      status: 'Danger',
      portfolio: '5/5',
      created: '18 Dec, 15:20'
    },
    {
      fileName: 'image.png',
      status: 'Active',
      portfolio: '0/5',
      created: '18 Dec, 15:20'
    }
  ]);

  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSources = sources.filter(source =>
    source.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Main section with padding */}
      
      <section className="w-full max-w-6xl  p-4">
        {/* Header */}
        <header className="mb-4">
          <h2 className="text-base font-semibold mb-1 font-sans">Source Files</h2>
          <p className="text-sm text-gray-600">
            View and manage all your assistant's source files and knowledge base documents.
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
                    <div className="relative max-w-sm">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400 dark:text-white/60" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="11" cy="11" r="8"></circle>
                          <path d="m21 21-4.3-4.3"></path>
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="Search by name"
                        className="py-2 pl-10 pr-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                      />
                    </div>
                    {/* <ModalFile onFileUploaded={handleFileUploaded} /> */}
                  </div>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-8 py-3 text-left">
                          <span className="text-sm font-semibold uppercase tracking-wide text-gray-800">File name</span>
                        </th>
                        <th scope="col" className="px-8 py-3 text-left">
                          <span className="text-sm font-semibold uppercase tracking-wide text-gray-800">Status</span>
                        </th>
                        <th scope="col" className="px-8 py-3 text-left">
                          <span className="text-sm font-semibold uppercase tracking-wide text-gray-800">Portfolio</span>
                        </th>
                        <th scope="col" className="px-8 py-3 text-left">
                          <span className="text-sm font-semibold uppercase tracking-wide text-gray-800">Created</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredSources.map((source, index) => (
                        <tr key={index} className="cursor-pointer">
                          <td className="px-8 py-3 whitespace-nowrap">
                            <div className="flex items-center gap-x-3">
                              <span className="block text-sm font-semibold text-gray-800">{source.fileName}</span>
                            </div>
                          </td>
                          <td className="px-8 py-3 whitespace-nowrap">
                            <span className={`py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium rounded-full ${source.status === 'Active' ? 'bg-green-100 text-green-800' : source.status === 'Warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                              {source.status}
                            </span>
                          </td>
                          <td className="px-8 py-3 whitespace-nowrap">
                            <span className="text-sm text-gray-500">{source.portfolio}</span>
                          </td>
                          <td className="px-8 py-3 whitespace-nowrap">
                            <span className="text-sm text-gray-500">{source.created}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="px-6 py-4 flex justify-between items-center border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-800">{filteredSources.length}</span> results
                    </p>
                  </div>
                </div>
              </div>
            </div>

      </section>
    </div>
  );
};

export default Sources;
