import React from 'react'
import Button from '@/components/ui/base/Button/Button.common'

const PasswordContent: React.FC = () => {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-2">Mot de passe et authentification</h1>
      <div className="mt-6">
<Button
            onClick={() => console.log('Button clicked')}
            text="Change password"
            buttonColor="green"
          />      </div>
    </div>
  )
}

export default PasswordContent
