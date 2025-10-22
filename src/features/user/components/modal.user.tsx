import React,{useState} from 'react'

const modalDashboard :React.FC = () => {
const[loading, isLoading] = useState(false)

const handleSubmit = async () => {
    isLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log('Button clicked');
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      isLoading(false);
    }
  }

  return (
<>
<button type="button" className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline font-medium" data-hs-overlay="#hs-focus-management-modal">
    Edit
</button>
<div id="hs-focus-management-modal" className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none">
  <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
    <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto">
      <div className="flex justify-between items-center py-3 px-4 border-b">
        <h3 className="font-bold text-gray-800">
          Edit
        </h3>
        <button type="button" className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none" data-hs-overlay="#hs-focus-management-modal">
          <span className="sr-only">Close</span>
          <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
      </div>
      <div className="p-4 overflow-y-auto">
        <label htmlFor="input-label" className="block text-sm font-medium mb-2"></label>
        <input type="" id="input-label" className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Bassem" autoFocus={true}/>
      </div>
      <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
        <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" data-hs-overlay="#hs-focus-management-modal">
          Close
        </button>
        <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
        disabled={loading}
        onClick={handleSubmit}
        >
          {loading ? 'Loading...' : 'Save changes'}
          Save changes
        </button>
      </div>
    </div>
  </div>
</div>
        </>
  )
}

export default modalDashboard
