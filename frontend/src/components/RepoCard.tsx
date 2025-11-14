import React from 'react';
import type { RepoCardProps } from '../interfaces/ComponentTypes';

const RepoCard: React.FC<RepoCardProps> = ({
  repo,
  onSave,
  isAuthenticated,
  isFavorite = false,
  onToggleFavorite,
  compact = false,
}) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown';
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffInDays === 0) return 'Today';
      if (diffInDays === 1) return 'Yesterday';
      if (diffInDays < 7) return `${diffInDays} days ago`;
      if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
      if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
      return `${Math.floor(diffInDays / 365)} years ago`;
    } catch {
      return 'Unknown';
    }
  };

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      JavaScript: 'bg-yellow-400',
      TypeScript: 'bg-blue-500',
      Python: 'bg-green-500',
      Java: 'bg-orange-500',
      'C++': 'bg-pink-500',
      C: 'bg-gray-500',
      Go: 'bg-cyan-500',
      Rust: 'bg-orange-600',
      Ruby: 'bg-red-500',
      PHP: 'bg-indigo-500',
      Swift: 'bg-orange-400',
      Kotlin: 'bg-purple-500',
    };
    return colors[language] || 'bg-gray-400';
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(repo);
    } else if (isAuthenticated) {
      onSave(repo);
    }
  };

  if (compact) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <a
              href={repo.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline truncate block"
            >
              {repo.name}
            </a>
            {repo.description && (
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                {repo.description}
              </p>
            )}
            <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
              {repo.language && (
                <div className="flex items-center space-x-1">
                  <span
                    className={`w-2 h-2 rounded-full ${getLanguageColor(repo.language)}`}
                  ></span>
                  <span>{repo.language}</span>
                </div>
              )}
              <span className="flex items-center space-x-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>{repo.starCount}</span>
              </span>
            </div>
          </div>
          <button
            onClick={handleFavoriteClick}
            className={`ml-2 p-1.5 rounded-full transition-colors ${
              isFavorite
                ? 'text-red-500 hover:text-red-600'
                : 'text-gray-400 hover:text-red-500'
            }`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg
              className="w-4 h-4"
              fill={isFavorite ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-3">
        <a
          href={repo.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl font-semibold text-blue-600 dark:text-blue-400 hover:underline flex-1 min-w-0"
        >
          {repo.name}
        </a>
        <button
          onClick={handleFavoriteClick}
          className={`ml-3 p-2 rounded-full transition-all duration-200 ${
            isFavorite
              ? 'text-red-500 hover:text-red-600 bg-red-50 dark:bg-red-900/20'
              : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
          }`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg
            className="w-5 h-5"
            fill={isFavorite ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {repo.description && (
        <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
          {repo.description}
        </p>
      )}

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
          {repo.language && (
            <div className="flex items-center space-x-2">
              <span
                className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`}
              ></span>
              <span>{repo.language}</span>
            </div>
          )}
          <span className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{repo.starCount.toLocaleString()}</span>
          </span>
          {repo.lastUpdated && (
            <span className="text-xs">
              Updated {formatDate(repo.lastUpdated)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RepoCard;
