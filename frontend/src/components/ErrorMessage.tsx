import React from 'react';
import type { ErrorMessageProps } from "../interfaces/ComponentTypes";

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
    <div className="flex items-start space-x-3">
      <svg
        className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-1">
          Error
        </h3>
        <p className="text-red-700 dark:text-red-400">{message}</p>
      </div>
    </div>
  </div>
);

export default ErrorMessage;
