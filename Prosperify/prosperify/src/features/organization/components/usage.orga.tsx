import React from 'react'

const UsageOrganization: React.FC = () => {
  return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
        <div className="flex flex-col border rounded-xl dark:border-neutral-800">
          <div className="p-4 md:p-5">
            <div className="flex items-center gap-x-2">
              <p className="text-sm font-semibold text-gray-500 dark:text-neutral-500">Domains</p>
              <div className="hs-tooltip">
                <div className="hs-tooltip-toggle">
                  <svg
                    className="shrink-0 size-4 text-gray-500 dark:text-neutral-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <path d="M12 17h.01" />
                  </svg>
                  <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700" role="tooltip">
                    The number of domains
                  </span>
                </div>
              </div>
            </div>
            <h3 className="mt-2 text-2xl sm:text-3xl lg:text-4xl text-gray-800 dark:text-neutral-200">
              <span className="font-semibold">24</span> <span className="text-gray-500 dark:text-neutral-500">/ 100</span>
            </h3>
          </div>
        </div>

        <div className="flex flex-col border rounded-xl dark:border-neutral-800">
          <div className="p-4 md:p-5">
            <div className="flex items-center gap-x-2">
              <p className="text-sm font-semibold text-gray-500 dark:text-neutral-500">Current Builds</p>
            </div>
            <h3 className="mt-2 text-2xl sm:text-3xl lg:text-4xl text-gray-800 dark:text-neutral-200">
              <span className="font-semibold">1</span> <span className="text-gray-500 dark:text-neutral-500">/ 1</span>
            </h3>
          </div>
        </div>

        <div className="flex flex-col border rounded-xl dark:border-neutral-800">
          <div className="p-4 md:p-5">
            <div className="flex items-center gap-x-2">
              <p className="text-sm font-semibold text-gray-500 dark:text-neutral-500">Requests</p>
              <div className="hs-tooltip">
                <div className="hs-tooltip-toggle">
                  <svg
                    className="shrink-0 size-4 text-gray-500 dark:text-neutral-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <path d="M12 17h.01" />
                  </svg>
                  <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700" role="tooltip">
                    The number of requests your Deployments have received.
                  </span>
                </div>
              </div>
            </div>
            <h3 className="mt-2 text-2xl sm:text-3xl lg:text-4xl text-gray-800 dark:text-neutral-200">
              <span className="font-semibold">10</span> <span className="text-gray-500 dark:text-neutral-500">/ 10</span>
            </h3>
          </div>
        </div>

        <div className="flex flex-col border rounded-xl dark:border-neutral-800">
          <div className="p-4 md:p-5">
            <div className="flex items-center gap-x-2">
              <p className="text-sm font-semibold text-gray-500 dark:text-neutral-500">Acquisition</p>
            </div>
            <h3 className="mt-2 text-2xl sm:text-3xl lg:text-4xl text-gray-800 dark:text-neutral-200">
              <span className="font-semibold">8</span> <span className="text-gray-500 dark:text-neutral-500">/ 10</span>
            </h3>
          </div>
        </div>
      </div>
  )
}

export default UsageOrganization
