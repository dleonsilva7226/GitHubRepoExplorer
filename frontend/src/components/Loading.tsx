import React from 'react';

const Loading: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
    </div>
    <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">
      Loading repositories...
    </p>
  </div>
);

export default Loading;
