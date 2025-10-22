import React from 'react'
import Button from '@/components/ui/base/Button/Button.common'

const DeleteAccountContent: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Permanently delete your account.</h2>
      <p className="text-sm text-gray-600 mb-4">
        Once your account is deleted, all of its resources and data will be permanently deleted.<br />
        Before deleting your account,
        please download any data or information that you wish to retain.
      </p>
      <Button
            onClick={() => console.log('Button clicked')}
            text="Supprimer"
            buttonColor="red"
          />    </div>
  )
}

export default DeleteAccountContent
