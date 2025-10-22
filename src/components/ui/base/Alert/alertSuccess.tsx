import React, { useEffect, useId, useRef } from 'react';

interface AlertSuccessProps {
  message: string;
  onClose: () => void;
  duration?: number;
  autoClose?: boolean;
}

const AlertSuccess: React.FC<AlertSuccessProps> = ({ message, onClose, duration = 5000, autoClose = true }) => {
  const id = useId();
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!autoClose) return;
    const timer = setTimeout(() => {
      onCloseRef.current();
    }, duration);
    return () => clearTimeout(timer);
  }, [autoClose, duration]);

  return (
    <div
  className="bg-teal-50 border-t-2 border-teal-500 rounded-lg p-4 dark:bg-teal-800/30 z-[1000]"
  role="alert"
  aria-live="polite"
  aria-atomic="true"
    >
      <div className="flex">
        <div className="shrink-0">
          <span className="inline-flex justify-center items-center size-8 rounded-full border-4 border-teal-100 bg-teal-200 text-teal-800 dark:border-teal-900 dark:bg-teal-800 dark:text-teal-400">
            <svg
              className="shrink-0 size-4"
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
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
              <path d="m9 12 2 2 4-4"></path>
            </svg>
          </span>
        </div>
        <div className="ms-3">
          <h3 id={id} className="text-gray-800 font-semibold dark:text-white">
            Success!
          </h3>
          <p className="text-sm text-gray-700 dark:text-neutral-400">{message}</p>
        </div>
        <button
          type="button"
          aria-label="Close"
          className="ms-auto text-teal-700 hover:text-teal-900 dark:text-teal-300 dark:hover:text-teal-100"
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default AlertSuccess;
