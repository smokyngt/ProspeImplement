import React, { useState } from 'react'
import 'apexcharts/dist/apexcharts.css'
import Navbar from '../../components/ui/base/Navbar/Navbar.common'
import AlertError from '../../components/ui/base/Alert/alertError'
import Hero from '../../components/ui/base/heroSection/Hero.common'

const Home: React.FC = () => {
  const [error, setError] = useState<string | null>(null)

  // Simulate an error for demonstration
  const simulateError = () => {
    setError('An error occurred while loading the page.')
    setTimeout(() => setError(null), 5000) // Clear error after 5 seconds
  }

  return (
    <>
      <Navbar />
      {error && (
        <div className="fixed top-4 right-4 z-50">
          <AlertError message={error} onClose={() => setError(null)} description={''} />
        </div>
      )}
  <Hero />
  {/* Simulate error button for demonstration */}
      <button onClick={simulateError} className="mt-4 py-2 px-4 bg-red-600 text-white rounded">Simulate Error</button>
    </>
  )
}

export default Home
