import React from 'react';
import RepoCard from './RepoCard';
import EmptyState from './EmptyState';
import type { FavoritesSidebarProps } from '../interfaces/ComponentTypes';

const FavoritesSidebar: React.FC<FavoritesSidebarProps> = ({
  favorites,
  onRemoveFavorite,
  onToggleFavorite,
  isAuthenticated,
}) => {
  return (
    <aside className="w-full lg:w-80 xl:w-96 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 h-fit lg:sticky lg:top-20">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
          <svg
            className="w-6 h-6 text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
          <span>Favorites</span>
          {favorites.length > 0 && (
            <span className="ml-2 px-2 py-0.5 text-sm font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full">
              {favorites.length}
            </span>
          )}
        </h2>
      </div>

      <div className="p-4 max-h-[calc(100vh-12rem)] overflow-y-auto">
        {favorites.length === 0 ? (
          <EmptyState
            title="No favorites yet"
            message="Star some repos to see them here."
            icon="⭐"
          />
        ) : (
          <div className="space-y-3">
            {favorites.map((repo) => (
              <RepoCard
                key={repo.id}
                repo={repo}
                onSave={() => onRemoveFavorite(repo.id)}
                isAuthenticated={isAuthenticated}
                isFavorite={true}
                onToggleFavorite={onToggleFavorite}
                compact={true}
              />
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default FavoritesSidebar;

