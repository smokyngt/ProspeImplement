import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAssistants } from '../hook/useAssistants';
import AlertError from '@/components/ui/base/Alert/alertError';

interface AssistantWithUI {
  id: string;
  name: string;
  description?: string;
  createdAt: number;
  initials: string;
  gradient: string;
  color: string;
}

const AssistantsList: React.FC = () => {
  const assistants = useAssistants();
  const [searchQuery, setSearchQuery] = useState('');

  // ✅ UN SEUL APPEL via le hook
  const { data, isLoading, error } = assistants.useList();
  const assistantsList = data?.assistants ?? [];

  // ---------------------------------------------------------------
  // 🧩 Helpers
  // ---------------------------------------------------------------
  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  const getRandomGradient = () => {
    const gradients = [
      { gradient: 'from-blue-400 to-blue-300', color: 'bg-blue-600' },
      { gradient: 'from-yellow-400 to-yellow-300', color: 'bg-yellow-500' },
      { gradient: 'from-red-400 to-red-300', color: 'bg-red-500' },
      { gradient: 'from-green-400 to-green-300', color: 'bg-green-500' },
      { gradient: 'from-purple-400 to-purple-300', color: 'bg-purple-500' },
      { gradient: 'from-pink-400 to-pink-300', color: 'bg-pink-500' },
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  // ---------------------------------------------------------------
  // 🎨 Transformation avec styles
  // ---------------------------------------------------------------
  const assistantsWithUI: AssistantWithUI[] = useMemo(() => {
    return assistantsList.map((assistant) => {
      const { gradient, color } = getRandomGradient();
      return {
        id: assistant.id,
        name: assistant.name,
        description: assistant.description || '',
        createdAt: assistant.createdAt,
        initials: getInitials(assistant.name),
        gradient,
        color,
      };
    });
  }, [assistantsList]);

  // ---------------------------------------------------------------
  // 🔍 Filtrage par recherche
  // ---------------------------------------------------------------
  const filteredAssistants = useMemo(() => {
    if (!searchQuery.trim()) return assistantsWithUI;
    return assistantsWithUI.filter((assistant) =>
      assistant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, assistantsWithUI]);

  // ---------------------------------------------------------------
  // 🎨 Rendu
  // ---------------------------------------------------------------
  return (
    <div>
      {error && (
        <div className="mb-4">
          <AlertError
            message={(error as Error).message || 'Erreur lors du chargement des assistants.'}
            onClose={() => {}}
            description=""
          />
        </div>
      )}

      {/* 🔍 Barre de recherche */}
      <div className="mb-6">
        <div className="relative w-72">
          <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3.5">
            <svg
              className="shrink-0 size-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Rechercher un assistant..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-3 ps-10 pe-4 block w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* 📊 Liste ou état de chargement */}
      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="text-sm text-gray-500">Chargement...</span>
          </div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-3/4">
          {filteredAssistants.length > 0 ? (
            filteredAssistants.map((assistant) => (
              <Link
                key={assistant.id}
                to={`/assistant/${assistant.id}/`}
                className="group flex flex-col h-full bg-white border border-gray-200 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 rounded-xl relative cursor-pointer overflow-hidden"
              >
                <div
                  className={`h-32 flex flex-col justify-center items-center bg-gradient-to-br ${assistant.gradient} rounded-t-xl`}
                ></div>
                <div className="absolute left-9 -translate-x-1/2 -translate-y-1/2 top-32">
                  <span
                    className={`inline-flex items-center justify-center size-[45px] rounded-full ${assistant.color} font-semibold text-white leading-none border-4 border-white shadow-md`}
                  >
                    {assistant.initials}
                  </span>
                </div>
                <div className="p-4 pb-10 mt-4">
                  <h3 className="text-lg font-semibold text-black">{assistant.name}</h3>
                  {assistant.description && (
                    <p className="text-sm text-gray-500 mt-2">{assistant.description}</p>
                  )}
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500 text-sm">
                {searchQuery ? 'Aucun assistant trouvé.' : 'Aucun assistant. Créez-en un !'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AssistantsList;