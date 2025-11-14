import React, { useState, useMemo } from 'react';
import RepoCard from './RepoCard';
import EmptyState from './EmptyState';
import type { RepoListProps } from '../interfaces/ComponentTypes';

type SortOption = 'stars' | 'updated' | 'name';
type FilterOption = string | 'all';

const RepoList: React.FC<RepoListProps> = ({
  repos,
  onSave,
  isAuthenticated,
  onToggleFavorite,
  favoriteIds = new Set(),
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('stars');
  const [languageFilter, setLanguageFilter] = useState<FilterOption>('all');

  // Get unique languages from repos
  const languages = useMemo(() => {
    const langSet = new Set<string>();
    repos.forEach((repo) => {
      if (repo.language) {
        langSet.add(repo.language);
      }
    });
    return Array.from(langSet).sort();
  }, [repos]);

  // Filter and sort repos
  const filteredAndSortedRepos = useMemo(() => {
    let filtered = repos;

    // Apply language filter
    if (languageFilter !== 'all') {
      filtered = filtered.filter((repo) => repo.language === languageFilter);
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'stars':
          return b.starCount - a.starCount;
        case 'updated':
          if (!a.lastUpdated || !b.lastUpdated) return 0;
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return sorted;
  }, [repos, sortBy, languageFilter]);

  if (repos.length === 0) {
    return (
      <EmptyState
        title="No repositories found"
        message="Search for a GitHub username to see their repositories."
        icon="🔍"
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters and Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 flex-wrap gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Sort by:
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="stars">Most Stars</option>
            <option value="updated">Recently Updated</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>

        <div className="flex items-center space-x-3 flex-wrap gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Language:
          </label>
          <select
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="all">All Languages</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Showing {filteredAndSortedRepos.length} of {repos.length} repositories
      </div>

      {/* Repo Cards Grid */}
      {filteredAndSortedRepos.length === 0 ? (
        <EmptyState
          title="No repositories match your filters"
          message="Try adjusting your language filter to see more results."
          icon="🔍"
        />
      ) : (
        <div className="grid gap-6">
          {filteredAndSortedRepos.map((repo) => (
            <RepoCard
              key={repo.id}
              repo={repo}
              onSave={onSave}
              isAuthenticated={isAuthenticated}
              isFavorite={favoriteIds.has(repo.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RepoList;
