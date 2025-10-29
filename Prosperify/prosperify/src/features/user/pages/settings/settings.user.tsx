import React, { useState } from 'react'
import AlertSuccess from '@/components/ui/base/Alert/alertSuccess'
import AlertError from '@/components/ui/base/Alert/alertError'
import ProfileContent from '../../components/settings/profil.user'
import PasswordContent from '../../components/settings/password.user'
import DeleteAccountContent from '../../components/deleteAccount.user'

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
    <div>
      <div className="p-4 bg-white">
        <div className="fixed top-4 right-4 z-50">
          {success && <AlertSuccess message={success} onClose={() => setSuccess(null)} />}
          {error && <AlertError message={error} onClose={() => setError(null)} description={''} />}
        </div>
        <h2 className="text-base font-semibold mb-2">Paramètres</h2>
        <p className="text-sm text-custom-gray-dark mb-4">
          Gérer les paramètres de votre compte utilisateur.
        </p>
      </div>
      
      <div className="p-4">
        <div className="w-full max-w-4xl mx-auto">
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
    </div>
  )
}

export default SettingsUser
