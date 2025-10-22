import React from 'react'

const ConversationBox: React.FC = () => {
  return (
<div className="flex flex-col items-center w-full">
  <div className="p-6 w-full max-w-7xl">
    <h1 className="text-3xl font-bold text-gray-800 mb-1">Vos conversations récentes</h1>
    <p className="mt-1 text-xl text-gray-600">Bienvenue dans votre espace de discussions ! Retrouvez ici vos échanges récents avec vos assistants. Reprenez facilement une conversation en cours a tout moment.
</p>
  </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl">
        {/* <a href="/assistant/:id/" className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col justify-between hover:bg-gray-50 transition">
          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Assistant 1</h2>
          </div>
          <div className="flex justify-center items-end">
            <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium rounded-full bg-teal-100 text-teal-800">
            Les défis de la transition énergétique : Quelles solutions pour un avenir durable ?
            </span>
          </div>
        </a>
        <a href="/assistant/:id/" className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col justify-between hover:bg-gray-50 transition">
          <div className="text-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Assistant 1</h2>
          </div>
          <div className="flex justify-center items-end">
          <span className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded bg-gray-100 text-gray-800 text-center">
            L impact des réseaux sociaux sur notre santé mentale : Mythes et réalités
            </span>
          </div>
        </a>
        <a href="/dashboard/assistant/:id/" className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col justify-between hover:bg-gray-50 transition">
          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold">Assistant 3</h2>
          </div>
          <div className="flex justify-center items-end">
          <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 text-center">
              La diversité culturelle au travail : Enjeux et opportunités pour les entreprises
            </span>
          </div>
        </a>
        <a href="/assistant/:id/" className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex items-center hover:bg-gray-50 transition">
  <img src="https://images.theconversation.com/files/443350/original/file-20220131-15-1ndq1m6.jpg" alt="Logo" className="w-12 h-12 rounded-full mr-4" />
  <div className="flex flex-col">
  <div className="flex justify-between items-center mb-1">
    <h2 className="text-xl font-semibold text-gray-800">Assistant 1</h2>
    <span className="text-xs text-gray-400">15:30</span>
    </div>
    <p className="text-sm text-gray-600">
      Les défis de la transition énergétique : Quelles solutions pour un avenir durable ?
    </p>
  </div>
</a> */}

<a href="/conversation/:id/" className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex items-center hover:bg-gray-50 transition overflow-hidden">
  <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.redd.it%2Feuhnx7zvgxq51.png&f=1&nofb=1&ipt=988c822ee7ef33b618712d57556bc7f25989ce691256555f9fdb264134c37948&ipo=images" alt="Logo" className="w-10 h-10 rounded-full mr-4 flex-shrink-0" />
  <div className="flex flex-col justify-between w-full overflow-hidden">
    <div className="flex justify-between items-center mb-1">
      <h2 className="text-md font-semibold text-gray-800 truncate">Constructor Execution Timing</h2>
      <span className="text-xs text-gray-400">16:31</span>
    </div>
    <p className="text-sm text-gray-600 truncate">
    In JavaScript, when you export a default instance of a class, the constructor...
    </p>
  </div>
</a>

<a href="/conversation/:id/" className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex items-center hover:bg-gray-50 transition overflow-hidden">
  <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.redd.it%2Feuhnx7zvgxq51.png&f=1&nofb=1&ipt=988c822ee7ef33b618712d57556bc7f25989ce691256555f9fdb264134c37948&ipo=images" alt="Logo" className="w-10 h-10 rounded-full mr-4 flex-shrink-0" />
  <div className="flex flex-col justify-between w-full overflow-hidden">
    <div className="flex justify-between items-center mb-1">
      <h2 className="text-md font-semibold text-gray-800 truncate">Express Server Debugging</h2>
      <span className="text-xs text-gray-400">15:43</span>
    </div>
    <p className="text-sm text-gray-600 truncate">
    The provided code sets up an Express server with various middlewares and routes...
    </p>
  </div>
</a>

<a href="/conversation/:id/" className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex items-center hover:bg-gray-50 transition overflow-hidden">
  <img src="https://cdn.drawception.com/drawings/654803/DqbTl2jPX8.png" alt="Logo" className="w-10 h-10 rounded-full mr-4 flex-shrink-0" />
  <div className="flex flex-col justify-between w-full overflow-hidden">
    <div className="flex justify-between items-center mb-1">
      <h2 className="text-md font-semibold text-gray-800 truncate">Animal Symbols for Privacy</h2>
      <span className="text-xs text-gray-400">12:22</span>
    </div>
    <p className="text-sm text-gray-600 truncate">
    Sure! Here s a list of animals that could represent a company providing rags to...
    </p>
  </div>
</a>

      </div>
    </div>
  )
}

export default ConversationBox
