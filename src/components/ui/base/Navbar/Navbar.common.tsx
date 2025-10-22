import React from "react"

export function ThemeSwitcher() {
  return (
    <div className="flex items-center gap-2">
      {/* Bouton Dark */}
      <button
        type="button"
        className="hs-dark-mode-active:hidden block hs-dark-mode rounded-full p-2 hover:bg-gray-200 dark:hover:bg-neutral-800"
        data-hs-theme-click-value="dark"
      >
        🌙
      </button>

      {/* Bouton Light */}
      <button
        type="button"
        className="hs-dark-mode-active:block hidden hs-dark-mode rounded-full p-2 hover:bg-gray-200 dark:hover:bg-neutral-800"
        data-hs-theme-click-value="light"
      >
        ☀️
      </button>
    </div>
  )
}

const Navbar: React.FC = () => {
  return (
    <>
      <header className="sticky top-4 inset-x-0 before:absolute before:inset-0 before:max-w-[66rem] before:mx-2 before:lg:mx-auto before:rounded-[26px] before:border before:border-gray-200 dark:before:border-neutral-700 after:absolute after:inset-0 after:-z-[1] after:max-w-[66rem] after:mx-2 after:lg:mx-auto after:rounded-[26px] after:bg-white dark:after:bg-neutral-900 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full font-sans">
        <nav className="relative max-w-[66rem] w-full md:flex md:items-center md:justify-between md:gap-3 ps-5 pe-2 mx-2 lg:mx-auto py-2">
          <div className="flex items-center justify-between w-full">
            {/* Logo */}
            <a
              className="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80 dark:text-white"
              href="/"
              aria-label="Brand"
            >
              Prosperify
            </a>

            {/* Menu mobile toggle */}
            <div className="md:hidden">
              <button
                type="button"
                className="hs-collapse-toggle relative size-9 flex justify-center items-center text-sm font-semibold rounded-full border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                id="hs-header-classic-collapse"
                aria-expanded="false"
                aria-controls="hs-header-classic"
                aria-label="Toggle navigation"
                data-hs-collapse="#hs-header-classic"
              >
                <svg
                  className="hs-collapse-open:hidden size-4"
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
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <line x1="3" x2="21" y1="12" y2="12" />
                  <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
                <svg
                  className="hs-collapse-open:block shrink-0 hidden size-4"
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
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
                <span className="sr-only">Toggle navigation</span>
              </button>
            </div>
          </div>

          {/* Menu desktop */}
          <div
            id="hs-header-classic"
            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block"
            aria-labelledby="hs-header-classic-collapse"
          >
            <div className="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
              <div className="py-2 md:py-0 flex flex-col md:flex-row md:items-center md:justify-end gap-2 md:gap-4">
                <a
                  className="p-2 flex items-center text-sm font-semibold text-blue-600 focus:outline-none focus:text-blue-600 dark:text-blue-500 dark:focus:text-blue-500"
                  href="/dashboard-orga"
                >
                  Dashboard Organization
                </a>
                <a
                  className="p-2 flex items-center text-sm font-semibold text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                  href="/dashboard-user"
                >
                  Dashboard User
                </a>
                <a
                  className="p-2 flex items-center text-sm font-semibold text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                  href="/login"
                >
                  <svg
                    className="shrink-0 size-4 me-2"
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
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  Log in
                </a>

                {/* 🎨 Ajout du switch */}
                <ThemeSwitcher />
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main id="content">
        <div className="max-w-[85rem] mx-auto py-10 px-4 sm:px-6 lg:px-8"></div>
      </main>
    </>
  )
}

export default Navbar
