import React from 'react';
import type { EmptyStateProps } from '../interfaces/ComponentTypes';

const EmptyState: React.FC<EmptyStateProps> = ({ title, message, icon = '📦' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="text-6xl mb-4 animate-pulse">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 max-w-md">
        {message}
      </p>
    </div>
  );
};

export default EmptyState;

