import React, { useState } from 'react';
import Charts from '../components/chart.assistant';

const IndexAssistant: React.FC = () => {
  const [, setError] = useState<string | null>(null);

  // Simulate an error for demonstration
  const simulateError = () => {
    setError('An error occurred while loading the usage data.');
    setTimeout(() => setError(null), 5000); // Clear error after 5 seconds
  };

  return (
    <>
      <Charts />
      <button onClick={simulateError} className="mt-4 py-2 px-4 bg-red-600 text-white rounded">
        Simulate Error
      </button>
    </>
  );
};

export default IndexAssistant;
