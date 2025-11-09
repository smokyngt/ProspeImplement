import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { prosperify } from '@/core/ProsperifyClient';
import { useUploads } from '../hooks/useUpload';
import AlertError from '@/components/ui/base/Alert/alertError';

interface Source {
  id: string;
  fileName: string;
  status: 'Active' | 'Warning' | 'Danger';
  portfolio: string;
  created: string;
}

// ✅ Type pour la réponse de l'API files
interface FileItem {
  id: string;
  name: string;
  status: 'active' | 'processing' | 'failed';
  linkedAssistants?: Array<{ id: string; name: string }>;
  createdAt: number;
}

interface FilesListResponse {
  items: FileItem[];
  total?: number;
  hasMore?: boolean;
}

const Sources: React.FC = () => {
  const { id: assistantId } = useParams<{ id: string }>();
  
  // ✅ Hook centralisé d'upload
  const uploads = useUploads();
  const uploadDocuments = uploads.useUploadDocuments();

  // ✅ Query pour récupérer les fichiers via ProsperifyClient
  const { data: sources = [], isLoading, error } = useQuery({
    queryKey: ['sources', assistantId],
    queryFn: async () => {
      if (!assistantId) return [];

      // Utilise prosperify client
      const res = await prosperify.files.postV1FilesList({
        limit: 50,
        order: 'desc',
        assistantId,
      });

      // ✅ Extraction sécurisée avec type assertion
      const filesData = res?.data as unknown as FilesListResponse;
      const items = filesData?.items ?? [];

      return items.map((item: FileItem) => ({
        id: item.id,
        fileName: item.name || 'Unnamed file',
        status:
          item.status === 'active' ? 'Active' as const :
          item.status === 'processing' ? 'Warning' as const : 
          'Danger' as const,
        portfolio: `${item.linkedAssistants?.length ?? 0}/5`,
        created: new Date(item.createdAt).toLocaleString('en-US', {
          day: '2-digit',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit',
        }),
      }));
    },
    enabled: !!assistantId,
    staleTime: 2 * 60 * 1000,
  });

  // États locaux UI
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = () => {
    if (!file || !assistantId) return;

    // ✅ Upload avec le hook
    uploadDocuments.mutate(
      { assistantId, files: [file] },
      {
        onSuccess: () => {
          setFile(null);
          setShowUploadModal(false);
        },
      }
    );
  };

  const filteredSources = useMemo(
    () => sources.filter((source: Source) => 
      source.fileName.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [sources, searchTerm]
  );

  return (
    <section className="w-full max-w-6xl p-4">
      <header className="mb-4">
        <h2 className="text-base font-semibold mb-1 font-sans">Source Files</h2>
        <p className="text-sm text-gray-600">
          View and manage all your assistant's source files and knowledge base documents.
        </p>
      </header>

      {/* Error alert */}
      {error && (
        <div className="fixed top-4 right-4 z-50">
          <AlertError 
            message={(error as any).message || 'Error loading source files'} 
            onClose={() => {}} 
            description="" 
          />
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            <span className="text-sm text-gray-500">Loading sources...</span>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto w-full">
          <div className="min-w-full inline-block align-middle w-10/12 max-w-4xl">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden w-11/12">
              {/* Toolbar */}
              <div className="px-6 py-4 flex justify-between items-center border-b border-gray-200">
                <div className="relative max-w-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search by name"
                    className="py-2 pl-10 pr-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <button
                  onClick={() => setShowUploadModal(true)}
                  disabled={uploadDocuments.isPending}
                  className="inline-flex items-center gap-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition disabled:opacity-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  {uploadDocuments.isPending ? 'Uploading...' : 'Upload File'}
                </button>
              </div>

              {/* Table */}
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-8 py-3 text-left text-sm font-semibold text-gray-800 uppercase">File name</th>
                    <th className="px-8 py-3 text-left text-sm font-semibold text-gray-800 uppercase">Status</th>
                    <th className="px-8 py-3 text-left text-sm font-semibold text-gray-800 uppercase">Portfolio</th>
                    <th className="px-8 py-3 text-left text-sm font-semibold text-gray-800 uppercase">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredSources.length > 0 ? (
                    filteredSources.map((source: Source) => (
                      <SourceRow key={source.id} source={source} />
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center py-6 text-sm text-gray-500">
                        No sources found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="px-6 py-4 flex justify-between items-center border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-800">{filteredSources.length}</span>{' '}
                  result{filteredSources.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showUploadModal && (
        <UploadModal
          file={file}
          uploading={uploadDocuments.isPending}
          onFileChange={(e) => setFile(e.target.files?.[0] || null)}
          onCancel={() => {
            setShowUploadModal(false);
            setFile(null);
          }}
          onUpload={handleFileUpload}
        />
      )}
    </section>
  );
};

export default Sources;

// ════════════════════════════════════════════════════════════════
// Sous-composants
// ════════════════════════════════════════════════════════════════

interface SourceRowProps {
  source: Source;
}

const SourceRow: React.FC<SourceRowProps> = ({ source }) => {
  const getStatusColor = () => {
    switch (source.status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'Danger':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <tr className="cursor-pointer hover:bg-gray-50 transition">
      <td className="px-8 py-3 text-sm font-semibold text-gray-800">{source.fileName}</td>
      <td className="px-8 py-3">
        <span className={`py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium rounded-full ${getStatusColor()}`}>
          {source.status}
        </span>
      </td>
      <td className="px-8 py-3 text-sm text-gray-500">{source.portfolio}</td>
      <td className="px-8 py-3 text-sm text-gray-500">{source.created}</td>
    </tr>
  );
};

interface UploadModalProps {
  file: File | null;
  uploading: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  onUpload: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({
  file,
  uploading,
  onFileChange,
  onCancel,
  onUpload,
}) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h3 className="text-lg font-semibold mb-4">Upload new file</h3>

      <input
        type="file"
        className="w-full border border-gray-300 rounded-lg p-2 mb-4"
        onChange={onFileChange}
        disabled={uploading}
        accept=".pdf,.doc,.docx,.txt,.csv,.md,.xls,.xlsx,.ppt,.pptx,.odt"
      />

      {file && (
        <p className="text-sm text-gray-600 mb-4">
          Selected: <span className="font-medium">{file.name}</span>
        </p>
      )}

      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          disabled={uploading}
          className="px-4 py-2 text-sm text-gray-700 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={onUpload}
          disabled={uploading || !file}
          className="px-4 py-2 text-sm text-white bg-orange-500 hover:bg-orange-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
    </div>
  </div>
);