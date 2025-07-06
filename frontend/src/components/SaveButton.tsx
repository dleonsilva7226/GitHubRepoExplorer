import React from 'react';
import type { SaveButtonProps } from '../interfaces/componentTypes';

const SaveButton: React.FC<SaveButtonProps> = ({ onClick, isSaved }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl font-semibold shadow-md transition-all 
        ${isSaved ? 'bg-yellow-300 text-black' : 'bg-gray-700 text-white'} 
        border-2 border-black hover:scale-105`}
    >
      {isSaved ? 'Saved ⭐' : 'Save'}
    </button>
  );
};

export default SaveButton;