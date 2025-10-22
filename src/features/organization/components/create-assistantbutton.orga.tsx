import React, { useState } from 'react';

interface CreateAssistantButtonProps {
  onSave: (name: string, description: string, color: string) => void;
}

const CreateAssistantButton: React.FC<CreateAssistantButtonProps> = ({ onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#4f46e5'); // Default color

  const handleSave = () => {
    if (name && description) {
      onSave(name, description, color);
      setName('');
      setDescription('');
      setColor('#4f46e5'); // Reset to default
    }
  };1 



  return (
    <>
      {/* Button to trigger modal */}
      <button
        type="button"
        className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        aria-expanded="false"
        aria-controls="hs-scale-animation-modal"
        data-hs-overlay="#hs-scale-animation-modal"
      >
        Create Assistant
      </button>

      {/* Modal for creating a new assistant */}
      <div
        id="hs-scale-animation-modal"
        className="hs-overlay hidden fixed inset-0 z-[80] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        <div className="hs-overlay-content w-full max-w-lg mx-auto my-24 p-4 bg-white rounded-lg shadow-lg dark:bg-neutral-800 dark:border-neutral-700">
          <div className="flex justify-between items-center border-b pb-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Create New Assistant</h3>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500"
              aria-label="Close"
              data-hs-overlay="#hs-scale-animation-modal"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div className="p-4">
            {/* Input for assistant name */}
            <div className="max-w-sm space-y-3">
              <label>
                Select a Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Assistant Name"
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              />
            </div>

            {/* Input for assistant description */}
            <div className="max-w-sm space-y-3 mt-4">
              <label>
                Select a description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Assistant Description"
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                rows={3}
              ></textarea>
            </div>

            {/* Color picker for assistant */}
            <div className="max-w-sm space-y-3 mt-4">
              <label>
                Select a Color
              </label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="p-1 h-10 w-14 border rounded-lg cursor-pointer"
                title="Choose your color"
              />
            </div>
          </div>

          <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
            <button
              type="button"
              className="py-2 px-3 text-sm font-medium rounded-lg bg-gray-200 hover:bg-gray-300"
              data-hs-overlay="#hs-scale-animation-modal"
            >
              Close
            </button>
            <button
              type="button"
              className="py-2 px-3 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              onClick={handleSave}
              data-hs-overlay="#hs-scale-animation-modal"
            >
              
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAssistantButton;
