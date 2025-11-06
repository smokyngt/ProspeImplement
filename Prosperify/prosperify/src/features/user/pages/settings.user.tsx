import React, { useState } from 'react'
import AlertSuccess from '@/components/ui/base/Alert/alertSuccess'
import AlertError from '@/components/ui/base/Alert/alertError'
import ProfileContent from '../components/settings/profil.user'
import PasswordContent from '../components/settings/password.user'
import DeleteAccountContent from '../components/settings/deleteAccount.user'

const SettingsUser: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('Mon profil')
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleButtonClick = (option: string) => {
    setSelectedOption(option)
  }

  const options = [
    'Mon profil',
    'Mot de passe et authentification',
    'Supprimer le compte'
  ]

  return (
    <>
     <section className="w-full max-w-6xl p-4">
        {/* Header */}
        <header className="mb-4">
          <h2 className="text-base font-semibold mb-1 font-sans">Paramètres</h2>
          <p className="text-sm text-gray-600">
            Gérez les paramètres de votre compte utilisateur.
          </p>
        </header>
     
      
      <div className="p-4">
        <div className="w-full max-w-4xl ">
          <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 mb-4 border border-gray-200 p-2 rounded-lg">
            {options.map(option => (
              <button
                key={option}
                className={`flex items-center py-2 px-3 text-sm rounded font-semibold focus:outline-none flex-1 justify-center transition-all duration-200 ${
                  selectedOption === option
                    ? 'bg-[#f1f5f9] text-[rgb(15,23,42)]'
                    : 'text-[rgb(100,116,139)] hover:text-[rgb(15,23,42)]'
                }`}
                onClick={() => handleButtonClick(option)}
              >
                <span className="text-center">{option}</span>
              </button>
            ))}
          </div>
          <div className="p-4 border border-gray-200 rounded-lg bg-white transition-all duration-200">
            {selectedOption === 'Mon profil' && <ProfileContent />}
            {selectedOption === 'Mot de passe et authentification' && <PasswordContent />}
            {selectedOption === 'Supprimer le compte' && <DeleteAccountContent />}
          </div>
        </div>
      </div>
     </section>
    </>
  )
}

export default SettingsUser
