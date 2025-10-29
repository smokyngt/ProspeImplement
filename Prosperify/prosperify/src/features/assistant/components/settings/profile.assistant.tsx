import React from 'react'
import Button from '@/components/ui/base/Button/Button.common'

const GeneralInfoContent: React.FC = () => (
  <div>
    <div className="mb-10">
      <label className="font-semibold block text-base mb-2">Chatbot ID</label>
      <p className="text-sm text-custom-gray-dark mb-2">
        This is the ID of your chatbot. You will need this ID to connect to the chatbot using Zapier and other integrations.
      </p>
      <input type="text" value="148c59fe-ab56-42c6-aa71-bf7a55c98d6b" readOnly className="border border-gray-200 p-2 rounded w-2/3" />
      <button className="text-sm text-blue-600 ml-2">Copy ID</button>
    </div>
    <div className="mt-4">
      <label className="font-semibold block text-base mb-2">Nom de l&apos;Assistant</label>
      <input type="text" className="border border-gray-200 p-2 rounded w-2/3" value={'bassem'}/>
    </div>
    <Button
            onClick={() => console.log('Button clicked')}
            text="save"
            buttonColor="green"
          />
  </div>
)

export default GeneralInfoContent
