import React, { useState, useMemo } from 'react';
import { useApiKeys, useDeleteApiKey, useCopyApiKey } from '@/features/apiKeys/hooks/useApiKeys';
import AlertError from '@/components/ui/base/Alert/alertError';
import AlertSuccess from '@/components/ui/base/Alert/alertSuccess';
import CreateApiKeyModal from './CreateApiKeyModal';

const TableApiKeys: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [success, setSuccess] = useState<string | null>(null);

  // ✅ React Query hooks
  const { data: apiKeys = [], isLoading, error } = useApiKeys({ limit: 100, order: 'desc' });
  const deleteApiKey = useDeleteApiKey();
  const copyApiKey = useCopyApiKey();

  // ✅ Filtrage côté client
  const filteredKeys = useMemo(
    () => apiKeys.filter((key) => key.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [apiKeys, searchTerm]
  );

  const handleDelete = async (id: string) => {
    try {
      await deleteApiKey.mutateAsync(id);
      setSuccess('API Key deleted successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      console.error('Failed to delete API key:', err);
    }
  };

  const handleCopy = async (key: string) => {
    try {
      await copyApiKey.mutateAsync(key);
      setSuccess('API Key copied to clipboard!');
      setTimeout(() => setSuccess(null), 2000);
    } catch (err: any) {
      console.error('Failed to copy API key:', err);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      {/* Alerts */}
      {error && (
        <div className="fixed top-4 right-4 z-50">
          <AlertError
            message={(error as Error).message || 'Error loading API keys'}
            onClose={() => {}}
            description=""
          />
        </div>
      )}

      {deleteApiKey.error && (
        <div className="fixed top-4 right-4 z-50">
          <AlertError
            message={(deleteApiKey.error as any)?.message || 'Error deleting API key'}
            onClose={() => deleteApiKey.reset()}
            description=""
          />
        </div>
      )}

      {success && (
        <div className="fixed top-4 right-4 z-50">
          <AlertSuccess message={success} onClose={() => setSuccess(null)} />
        </div>
      )}

      <section className="w-full max-w-6xl p-4">
        {/* Header */}
        <header className="mb-4">
          <h2 className="text-base font-semibold mb-1 font-sans">API Keys</h2>
          <p className="text-sm text-gray-600">
            Manage your API keys to connect with third-party clients or access the Prosperify API.
          </p>
        </header>

        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                {/* Table Header */}
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200">
                 

                  <div>
                    <div className="inline-flex gap-x-2">
                      {/* Search Input */}
                      <input
                        type="text"
                        placeholder="Search keys..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="py-2 px-3 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                      />

                     <CreateApiKeyModal
        onSuccess={() => {
          setSuccess('API Key créée avec succès');
          setTimeout(() => setSuccess(null), 3000);
        }}
      />
                    </div>
                  </div>
                </div>

                {/* Table */}
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-start">
                        <span className="text-xs font-semibold uppercase text-gray-800">Name</span>
                      </th>
                      <th scope="col" className="px-6 py-3 text-start">
                        <span className="text-xs font-semibold uppercase text-gray-800">
                          Created by
                        </span>
                      </th>
                      <th scope="col" className="px-6 py-3 text-start">
                        <span className="text-xs font-semibold uppercase text-gray-800">
                          API Key
                        </span>
                      </th>
                      <th scope="col" className="px-6 py-3 text-start">
                        <span className="text-xs font-semibold uppercase text-gray-800">
                          Created
                        </span>
                      </th>
                      <th scope="col" className="px-6 py-3 text-end"></th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {isLoading ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        </td>
                      </tr>
                    ) : filteredKeys.length > 0 ? (
                      filteredKeys.map((key) => (
                        <tr key={key.id}>
                          <td className="px-6 py-3 whitespace-nowrap">
                            <span className="text-sm text-gray-600">{key.name}</span>
                          </td>
                          <td className="px-6 py-3 whitespace-nowrap">
                            <span className="text-sm text-gray-600">{key.createdBy}</span>
                          </td>
                          <td className="px-6 py-3 whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => handleCopy(key.id)}
                              disabled={copyApiKey.isPending}
                              className="py-2 px-3 inline-flex items-center gap-x-2 text-xs rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50"
                            >
                              {copyApiKey.isPending ? 'Copying...' : 'Copy Key'}
                              <svg
                                className="shrink-0 size-4 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                              </svg>
                            </button>
                          </td>
                          <td className="px-6 py-3 whitespace-nowrap">
                            <span className="text-sm text-gray-600">
                              {formatDate(key.createdAt)}
                            </span>
                          </td>
                          <td className="px-6 py-1.5 text-end">
                            <button
                              onClick={() => handleDelete(key.id)}
                              disabled={deleteApiKey.isPending}
                              className="text-sm text-red-600 hover:text-red-800 disabled:opacity-50"
                            >
                              {deleteApiKey.isPending ? 'Deleting...' : 'Delete'}
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-500">
                          No API keys found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">{filteredKeys.length}</span>{' '}
                    results
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TableApiKeys;