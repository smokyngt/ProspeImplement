import React, { useState } from 'react'

const SettingsContent: React.FC = () => {
  const [notificationsActive, setNotificationsActive] = useState(false)
  const [externalSources, setExternalSources] = useState(false)

  return (
    <div>
      <div className="mt-4">
        <label className="font-semibold block text-base mb-2">Instructions Supplémentaires</label>
        <input type="text" className="border border-gray-200 p-2 rounded w-2/3" />
      </div>
      <div className="mt-4 mb-10">
        <div className="flex items-center justify-between">
          <div className="flex-grow">
            <label className="font-semibold text-base mb-2">Notifications</label>
            <p className="text-sm text-custom-gray-dark">Allow receive notifications by email.</p>
          </div>
          <div>
            <input
              type="checkbox"
              id="notifications-switch"
              className="relative w-[3.25rem] h-7 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-blue-600 checked:border-blue-600 focus:checked:border-blue-600 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-600
              before:inline-block before:size-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-neutral-400 dark:checked:before:bg-blue-200"
              checked={notificationsActive}
              onChange={() => setNotificationsActive(!notificationsActive)}
            />
            <label htmlFor="notifications-switch" className="sr-only">switch</label>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="temperature-slider" className="font-semibold block text-base mb-2">Température</label>
        <input
          type="range"
          id="temperature-slider"
          min="0"
          max="1"
          step="0.1"
          defaultValue="0.5"
          className="w-full bg-transparent cursor-pointer appearance-none disabled:opacity-50 disabled:pointer-events-none focus:outline-none border border-gray-200 [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:-mt-0.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(37,99,235,1)] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150 [&::-webkit-slider-thumb]:ease-in-out [&::-webkit-slider-thumb]:dark:bg-neutral-700 [&::-moz-range-thumb]:w-2.5 [&::-moz-range-thumb]:h-2.5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-blue-600 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:duration-150 [&::-moz-range-thumb]:ease-in-out [&::-webkit-slider-runnable-track]:w-full [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:bg-gray-100 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:dark:bg-neutral-700 [&::-moz-range-track]:w-full [&::-moz-range-track]:h-2 [&::-moz-range-track]:bg-gray-100 [&::-moz-range-track]:rounded-full"
        />
        <p className="text-sm text-custom-gray-dark">Control the randomness of the chatbot response. Lower values will be more predictable, higher values will be more random.</p>
      </div>
      <div className="mt-4 mb-10">
        <div className="flex items-center justify-between">
          <div className="flex-grow">
            <label className="font-semibold text-base mb-2">Sources Externes</label>
            <p className="text-sm text-custom-gray-dark">Enable the chatbot to use external sources for providing more accurate responses.</p>
          </div>
          <div>
            <input
              type="checkbox"
              id="external-sources-switch"
              className="relative w-[3.25rem] h-7 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-blue-600 checked:border-blue-600 focus:checked:border-blue-600 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-600
              before:inline-block before:size-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-neutral-400 dark:checked:before:bg-blue-200"
              checked={externalSources}
              onChange={() => setExternalSources(!externalSources)}
            />
            <label htmlFor="external-sources-switch" className="sr-only">switch</label>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="precision-slider" className="font-semibold block text-base mb-2">Précision</label>
        <input
          type="range"
          id="precision-slider"
          min="0"
          max="1"
          step="0.1"
          defaultValue="0.5"
          className="w-full bg-transparent cursor-pointer appearance-none disabled:opacity-50 disabled:pointer-events-none focus:outline-none border border-gray-200 [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:-mt-0.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(37,99,235,1)] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150 [&::-webkit-slider-thumb]:ease-in-out [&::-webkit-slider-thumb]:dark:bg-neutral-700 [&::-moz-range-thumb]:w-2.5 [&::-moz-range-thumb]:h-2.5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-blue-600 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:duration-150 [&::-moz-range-thumb]:ease-in-out [&::-webkit-slider-runnable-track]:w-full [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:bg-gray-100 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:dark:bg-neutral-700 [&::-moz-range-track]:w-full [&::-moz-range-track]:h-2 [&::-moz-range-track]:bg-gray-100 [&::-moz-range-track]:rounded-full"
        />
        <p className="text-sm text-custom-gray-dark">Control the accuracy of the chatbot response. Higher values will provide more accurate responses.</p>
      </div>
</div>
  )
}

export default SettingsContent
