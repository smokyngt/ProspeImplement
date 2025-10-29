import React, { useState} from 'react'
import InputEmail from '@/components/ui/base/inputEmail/inputEmail.common';
import FileUpload from '@/components/ui/base/fileUpload/fileUpload.common';

const ProfileContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simule une action asynchrone
      console.log('Button clicked');
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div>
      <h1 className="text-xl font-semibold font-sans mb-2">Mon profil</h1>
      <p className="text-sm text-gray-600 mb-4 ">
        Update your accounts profile information and email address.
      </p>

      {/* FileUpload component pour la photo de profil */}
      <FileUpload />

      <div className="max-w-sm space-y-3 mb-6">
        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
          Name
        </label>
        <input
          className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
          placeholder="This is placeholder"
          id="name"
          type="text"
          value={'bassem'}
          readOnly // Prevents modification
        />
        <InputEmail />
      </div>

      <div className="mt-6">
        <button
          type="button"
          className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-md border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Update'}
        </button>
      </div>
    </div>
  );
};

export default ProfileContent;
