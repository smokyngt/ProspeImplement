import React, { useState } from 'react';
import CreateAssistantButton from './create-assistantbutton.orga';

interface Assistant {
  id: number;
  name: string;
  description: string;
  color: string;
}

const CreateAssistantOrga: React.FC = () => {
  const [assistants, setAssistants] = useState<Assistant[]>([
    {
      id: 1,
      name: 'IT Assistant',
      description:
        'An AI assistant to optimize the management of your information systems and solve technical issues.',
      color: '#3b82f6',
    },
    {
      id: 2,
      name: 'Design Assistant',
      description:
        'An AI assistant that facilitates the creation and optimization of your designs to improve your branding.',
      color: '#fbbf24',
    },
    {
      id: 3,
      name: 'Productivity Assistant',
      description:
        'An AI assistant designed to enhance daily productivity by automating repetitive tasks and providing smart suggestions.',
      color: '#ef4444',
    },
  ]);

  const handleAddAssistant = (name: string, description: string, color: string) => {
    const newAssistant = {
      id: assistants.length + 1,
      name,
      description,
      color,
    };
    setAssistants((prev) => [...prev, newAssistant]);
  };

  return (
    <>
      <section className="w-full max-w-6xl p-4 ">
        <div className="bg-white  rounded-xl shadow-2xs overflow-hidden dark:bg-neutral-900 dark:border-neutral-700">
          {/* Header/Toolbar (même layout que précédents) */}
           <header className="mb-4">
          <h2 className="text-base font-semibold mb-1 font-sans">Create Assistant</h2>
          <p className="text-sm text-gray-600">
            Create and manage your AI assistants to optimize your workflow.
          </p>
        </header>

            <div>
              <div className="inline-flex items-center gap-x-2">

                {/* Création via votre composant (non modifié) */}
                <CreateAssistantButton onSave={handleAddAssistant} />
              </div>
            </div>
          </div>

          {/* Contenu */}
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {assistants.map((assistant) => (
                <div
                  key={assistant.id}
                  className="group flex flex-col h-full bg-white border  shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700"
                >
                  <div
                    className="h-36 flex justify-center items-center rounded-t-xl"
                    style={{ backgroundColor: assistant.color }}
                  />
                  <div className="p-4">
                    <span
                      className="block mb-1 text-xs font-semibold uppercase"
                      style={{ color: assistant.color }}
                    >
                      {assistant.name.toUpperCase()}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                      {assistant.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-neutral-400">
                      {assistant.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

         
          </section>
        
     
    </>
  );
};

export default CreateAssistantOrga;
