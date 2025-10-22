import React from 'react'

const DeleteContent: React.FC = () => (
  <div className="p-4 rounded-lg bg-gray-50">
    <h3 className="font-semibold text-lg mb-2">Delete Chatbot</h3>
    <p className="text-sm text-gray-600 mb-4">Delete this chatbot and all of its data. This action cannot be undone.</p>
    <button onClick={() => console.log('c carré')} className="mt-4 py-2 px-4 bg-red-600 text-white rounded">Delete Chatbot</button>
  </div>
)

export default DeleteContent
