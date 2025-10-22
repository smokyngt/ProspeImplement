import React, { useState } from 'react'
import AlertError from '@/components/ui/base/Alert/alertError'

const Export:React.FC = () => {
  const [error, setError] = useState<string | null>(null)

  // Simulate an error for demonstration
  const simulateError = () => {
    setError('An error occurred while loading the content.')
    setTimeout(() => setError(null), 5000) // Clear error after 5 seconds
  }

  return (
    <div>
      <div className="p-4 bg-white">
        <h2 className="text-base font-semibold mb-2">Install Your Chatbot</h2>
        <p className="text-sm text-custom-gray-dark mb-4">Install or share your chatbot with your customers or team by using the code snippets below.</p>
      </div>
      
      <div className="p-4">
        {error && (
          <div className="fixed top-4 right-4 z-50">
            <AlertError message={error} onClose={() => setError(null)} description={''} />
          </div>
        )}
        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h3 className="text-base font-semibold mb-1">IFrame Code Snippet</h3>
          <p className="text-sm text-custom-gray-dark mb-2">
            Embed this iframe code snippet in your website to display your chatbot.
          </p>
          <textarea
            readOnly
            value="<iframe src='https://sitespeak.ai/chatbots/92101606-8a8b-476f-9771-3ad6a5f8fa42.html' width='600' height='400'></iframe>"
            title="Embed iframe code snippet"
            placeholder="Embed code here"
            className="w-full p-1 mb-2 border border-gray-200 rounded bg-white text-sm text-custom-gray-dark"
            rows={4}
          />
          <button className="w-full px-2 py-1 bg-gray-100 text-sm font-semibold text-gray-700 rounded hover:bg-customGray">
            Copy Code
          </button>
        </div>

        {/* Simulate error button for demonstration */}
        <button onClick={simulateError} className="mt-4 py-2 px-4 bg-red-600 text-white rounded">Simulate Error</button>
      </div>
    </div>
  )
}

export default Export
