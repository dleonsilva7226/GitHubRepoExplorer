import React from 'react';
import type { SearchBarProps } from '../interfaces/ComponentTypes';

const SearchBar: React.FC<SearchBarProps> = ({ username, setUsername, onSearch }) => {
  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md border border-gray-200 px-4 py-4 flex flex-col sm:flex-row gap-3 items-center mt-8">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Search GitHub username..."
        className="w-full flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 transition"
      />
      <button
      onClick={() => {
        console.log('username:', username.trim());
        onSearch();
      }}
      disabled={!username.trim()}
      className="w-full sm:w-auto px-6 py-2 rounded-md transition shadow font-medium
        bg-blue-600 text-white hover:bg-blue-700
        disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
    >
      Search
    </button>
        </div>
      );
    };

export default SearchBar;
