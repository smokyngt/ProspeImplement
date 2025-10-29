import React, { useState, useEffect } from "react";

interface Assistant {
  id: string;
  name: string;
  initials: string;
  gradient: string;
  color: string;
}

const GridAssistantUser: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [filteredAssistants, setFilteredAssistants] = useState<Assistant[]>([]);

  // Simulation d'une API (remplaçable par un fetch réel)
  useEffect(() => {
    const fetchAssistants = () => {
      const data: Assistant[] = [
        { id: "it-copilot", name: "IT Copilot", initials: "AC", gradient: "from-blue-400 to-blue-300", color: "bg-blue-600" },
        { id: "design-assistant", name: "Design Assistant", initials: "DA", gradient: "from-yellow-400 to-yellow-300", color: "bg-yellow-500" },
        { id: "productivity-assistant", name: "Productivity Assistant", initials: "PA", gradient: "from-red-400 to-red-300", color: "bg-red-500" },
      ];
      setAssistants(data);
      setFilteredAssistants(data);
    };

    fetchAssistants();
  }, []);

  // Filtrage dynamique
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredAssistants(assistants);
    } else {
      setFilteredAssistants(
        assistants.filter((assistant) =>
          assistant.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, assistants]);

  return (
    <div className="flex flex-col items-center w-full px-4">
      {/* Conteneur pour aligner la SearchBar et la Grid */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-6">
        {/* SearchBox avec loupe */}
        <div className="relative w-72">
          <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3.5">
            <svg
              className="shrink-0 size-4 text-gray-400 dark:text-white/60"
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
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Rechercher un assistant..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-3 ps-10 pe-4 block w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500"
          />
        </div>
      </div>

      {/* Grille des assistants */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {filteredAssistants.length > 0 ? (
          filteredAssistants.map((assistant) => (
            <a
              key={assistant.id}
              href={`/assistant/${assistant.id}`}
              className="group flex flex-col h-full bg-white border border-gray-200 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out rounded-xl relative cursor-pointer overflow-hidden"
            >
              {/* Partie colorée avec gradient */}
              <div className={`h-32 flex flex-col justify-center items-center bg-gradient-to-br ${assistant.gradient} rounded-t-xl relative`}></div>

              {/* Avatar à cheval */}
              <div className="absolute left-9 -translate-x-1/2 -translate-y-1/2 top-32">
                <span className={`inline-flex items-center justify-center size-[45px] rounded-full ${assistant.color} font-semibold text-white leading-none border-4 border-white shadow-md`}>
                  {assistant.initials}
                </span>
              </div>

              {/* Informations */}
              <div className="p-4 pb-10 mt-4">
                <h3 className="text-lg font-semibold text-black">{assistant.name}</h3>
              </div>
            </a>
          ))
        ) : (
          <p className="text-gray-500 text-sm">Aucun assistant trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default GridAssistantUser;
