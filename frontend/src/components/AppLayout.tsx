import React from 'react';
import Navbar from './Navbar';
import SearchBar from './SearchBar';
import UserProfileCard from './UserProfileCard';
import RepoList from './RepoList';
import FavoritesSidebar from './FavoritesSidebar';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';
import EmptyState from './EmptyState';
import type { User, Repo } from '../interfaces/ComponentTypes';
import useAuthStore from '../store/authStore';

interface AppLayoutProps {
  // User data - placeholder for now, wire up to GitHub API later
  user: User | null;
  userLoading: boolean;
  
  // Repo data
  repos: Repo[];
  reposLoading: boolean;
  reposError: string | null;
  
  // Search handlers
  username: string;
  setUsername: (username: string) => void;
  onSearch: () => void;
  
  // Favorites
  favorites: Repo[];
  onAddFavorite: (repo: Repo) => void;
  onRemoveFavorite: (repoId: number) => void;
  
  // Frontend-only favorite state (for visual feedback before backend sync)
  localFavorites?: Set<number>;
  onToggleLocalFavorite?: (repo: Repo) => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  user,
  userLoading,
  repos,
  reposLoading,
  reposError,
  username,
  setUsername,
  onSearch,
  favorites,
  onAddFavorite,
  onRemoveFavorite,
  localFavorites = new Set(),
  onToggleLocalFavorite,
}) => {
  const { isAuthenticated, logout } = useAuthStore();
  
  // Combine backend favorites with local favorites for visual indication
  const favoriteIds = new Set<number>([
    ...favorites.map((f) => f.id),
    ...Array.from(localFavorites),
  ]);

  const handleToggleFavorite = (repo: Repo) => {
    console.log('Toggle favorite clicked:', { repoId: repo.id, isAuthenticated, isFavorite: favoriteIds.has(repo.id) });
    if (isAuthenticated) {
      // Backend toggle - always use backend when authenticated
      if (favoriteIds.has(repo.id)) {
        console.log('Removing favorite from backend');
        onRemoveFavorite(repo.id);
      } else {
        console.log('Adding favorite to backend');
        onAddFavorite(repo);
      }
    } else if (onToggleLocalFavorite) {
      // Frontend-only toggle for non-authenticated users
      console.log('Toggling local favorite (not authenticated)');
      onToggleLocalFavorite(repo);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar isAuthenticated={isAuthenticated} onLogout={logout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Search, Profile, Repos */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Search Repositories
              </h2>
              <SearchBar
                username={username}
                setUsername={setUsername}
                onSearch={onSearch}
              />
            </div>

            {/* User Profile Card */}
            {username && (
              <UserProfileCard user={user} loading={userLoading} />
            )}

            {/* Loading State */}
            {reposLoading && <Loading />}

            {/* Error State */}
            {reposError && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <ErrorMessage message={reposError} />
              </div>
            )}

            {/* Empty State - No Search Yet */}
            {!reposLoading && !reposError && repos.length === 0 && !username && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <EmptyState
                  title="Start Exploring"
                  message="Enter a GitHub username above to discover their repositories."
                  icon="🚀"
                />
              </div>
            )}

            {/* Repositories List */}
            {!reposLoading && !reposError && repos.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Repositories
                </h2>
                <RepoList
                  repos={repos}
                  onSave={onAddFavorite}
                  isAuthenticated={isAuthenticated}
                  onToggleFavorite={handleToggleFavorite}
                  favoriteIds={favoriteIds}
                />
              </div>
            )}
          </div>

          {/* Right Column: Favorites Sidebar */}
          <div className="lg:col-span-1">
            <FavoritesSidebar
              favorites={favorites}
              onRemoveFavorite={onRemoveFavorite}
              onToggleFavorite={onToggleLocalFavorite || handleToggleFavorite}
              isAuthenticated={isAuthenticated}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppLayout;

