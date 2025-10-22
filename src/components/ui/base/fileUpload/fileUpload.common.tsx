import React from 'react';

const FileUpload: React.FC = () => {
  return (
    <div data-hs-file-upload='{
        "url": "/upload",
        "acceptedFiles": "image/*",
        "maxFiles": 1,
        "singleton": false
      }'>
        <template data-hs-file-upload-preview="">
          <div className="size-20">
            <img className="w-full object-contain rounded-full" data-dz-thumbnail=""/>
          </div>
        </template>
      
        <div className="flex flex-wrap items-center gap-3 sm:gap-5">
          <div className="group" data-hs-file-upload-previews="" data-hs-file-upload-pseudo-trigger="">
            <span className="group-has-[div]:hidden flex shrink-0 justify-center items-center size-20 border-2 border-dotted border-gray-300 text-gray-400 cursor-pointer rounded-full hover:bg-gray-50 dark:border-neutral-700 dark:text-neutral-600 dark:hover:bg-neutral-700/50">
              <svg className="shrink-0 size-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="10" r="3"></circle>
                <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path>
              </svg>
            </span>
          </div>
      
          <div className="grow">
            <div className="flex items-center gap-x-2">
              <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" data-hs-file-upload-trigger="">
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" x2="12" y1="3" y2="15"></line>
                </svg>
                Upload photo
              </button>
              <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" data-hs-file-upload-clear="">Delete</button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default FileUpload;
