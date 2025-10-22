import React from 'react'

const Plan: React.FC = () => {
  return (
<>
<div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
  <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
    <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">Your Plan</h2>
    <p className="mt-1 text-gray-600 dark:text-neutral-400">Whatever your status, our offers evolve according to your needs.</p>
  </div>
  <div className="flex justify-center items-center">
    <label className="min-w-14 text-sm text-gray-500 me-3 dark:text-neutral-400">Monthly</label>

    <input type="checkbox" id="hs-basic-with-description" className="relative w-[3.25rem] h-7 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-blue-600 checked:border-blue-600 focus:checked:border-blue-600 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-600 before:inline-block before:size-6 before:bg-white checked:before:bg-white before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-neutral-400 dark:checked:before:bg-white" checked />
    <label className="relative min-w-14 text-sm text-gray-500 ms-3 dark:text-neutral-400">
      Annual
    </label>
  </div>
  <div className="mt-12 flex justify-center items-center">
    <div className="flex flex-col border-2 border-blue-600 text-center shadow-xl rounded-xl p-8 dark:border-blue-700">
      <h4 className="font-medium text-lg text-gray-800 dark:text-neutral-200">Startup</h4>
      <span className="mt-5 font-bold text-5xl text-gray-800 dark:text-neutral-200">
        39€
      </span>
      <p className="mt-2 text-sm text-gray-500 dark:text-neutral-500">All the basics for starting a new business</p>

      <ul className="mt-7 space-y-2.5 text-sm">
        <li className="flex space-x-2">
          <svg className="flex-shrink-0 mt-0.5 size-4 text-blue-600 dark:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <span className="text-gray-800 dark:text-neutral-400">
            2 users
          </span>
        </li>

        <li className="flex space-x-2">
          <svg className="flex-shrink-0 mt-0.5 size-4 text-blue-600 dark:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <span className="text-gray-800 dark:text-neutral-400">
            Plan features
          </span>
        </li>

        <li className="flex space-x-2">
          <svg className="flex-shrink-0 mt-0.5 size-4 text-blue-600 dark:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <span className="text-gray-800 dark:text-neutral-400">
            Product support
          </span>
        </li>
      </ul>

      <a className="mt-5 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" href="#">
        Upgrade
      </a>
    </div>
  </div>
  </div>
  </>
  )
}

export default Plan
