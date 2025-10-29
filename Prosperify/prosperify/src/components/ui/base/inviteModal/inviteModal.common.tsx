import React, { useState } from 'react'
import Button from '../Button/Button.common'

const InviteModal: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [notify, setNotify] = useState<boolean>(true)
  const [colleagues, setColleagues] = useState([
    { name: 'James Collison (you)', email: 'james@site.com', role: 'Admin' },
    { name: 'Liza Harrison', email: 'liza@site.com', role: 'Can view' },
    { name: 'Daniel Hobbs', email: 'dhobbs@site.com', role: 'Can edit' },
    { name: 'Anna Richard', email: 'anna@site.com', role: 'Can edit' }
  ])

  const handleInvite = () => {
    if (email) {
      setColleagues([...colleagues, { name: email, email, role: 'Can view' }]) // Default to 'Can view'
      setEmail('')
    }
  }

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg w-1/2 ">
      {/* Invite input */}
      <p className="text-gray-500 mb-4">
              This name will be used to identify your organization across your platform.
            </p>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Add name or emails"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <Button onClick={handleInvite} text="Send" buttonColor="blue" />
      </div>

      {/* Notify checkbox */}
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={notify}
          onChange={() => setNotify(!notify)}
          className="mr-2"
        />
        <label className="text-sm text-gray-500">Notify recipients via email</label>
      </div>

      {/* Colleagues list */}
      <div className="mb-4">
        <h3 className="text-sm text-gray-700 mb-2">From Htmlstream</h3>
        {colleagues.map((colleague, index) => (
          <div key={index} className="flex justify-between items-center p-2 border-b border-gray-200">
            <div className="flex items-center">
              {/* Avatar */}
              <span className="inline-block w-9 h-9 bg-gray-100 rounded-full overflow-hidden">
                <svg className="w-full h-full text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none">
                  <rect x="0.62854" y="0.359985" width="15" height="15" rx="7.5" fill="white"></rect>
                  <path
                    d="M8.12421 7.20374C9.21151 7.20374 10.093 6.32229 10.093 5.23499C10.093 4.14767 9.21151 3.26624 8.12421 3.26624C7.0369 3.26624 6.15546 4.14767 6.15546 5.23499C6.15546 6.32229 7.0369 7.20374 8.12421 7.20374Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M11.818 10.5975C10.2992 12.6412 7.42106 13.0631 5.37731 11.5537C5.01171 11.2818 4.69296 10.9631 4.42107 10.5975C4.28982 10.4006 4.27107 10.1475 4.37419 9.94123L4.51482 9.65059C4.84296 8.95684 5.53671 8.51624 6.30546 8.51624H9.95231C10.7023 8.51624 11.3867 8.94749 11.7242 9.62249L11.8742 9.93184C11.968 10.1475 11.9586 10.4006 11.818 10.5975Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
              <div className="ml-3">
                <span className="font-medium">{colleague.name}</span>
                <span className="block text-sm text-gray-500">{colleague.email}</span>
              </div>
            </div>
            <span className="text-sm text-gray-500">{colleague.role}</span>
          </div>
        ))}
      </div>

      {/* Share read-only link */}
      <div className="mt-4">
        <h4 className="text-sm text-gray-500 mb-2">Share read-only link</h4>
        <div className="flex items-center">
          <input
            type="text"
            value="https://www.figma.com/community/file/1179068859697769656"
            readOnly
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-500"
          />
          <button className="ml-2 p-2 bg-gray-100 text-gray-500 rounded-lg hover:bg-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-copy"
              viewBox="0 0 24 24"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default InviteModal
