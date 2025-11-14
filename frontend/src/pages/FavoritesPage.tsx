import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import RepoCard from '../components/RepoCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import useRepoStore from '../store/repoStore';
import useAuthStore from '../store/authStore';

const FavoritesPage: React.FC = () => {
  const { 
    handleFetchFavoriteRepos, 
    handleDeleteRepo, 
    error, 
    loading, 
    favorites 
  } = useRepoStore();
  
  const { isAuthenticated, logout } = useAuthStore();

  // Load favorites when component mounts
  useEffect(() => {
    if (isAuthenticated) {
      handleFetchFavoriteRepos().catch((error) => {
        console.error('Error loading favorites:', error);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]); // handleFetchFavoriteRepos is stable from the store

  const handleRemoveFavorite = async (repoId: number) => {
    try {
      await handleDeleteRepo(repoId);
      // Refresh favorites after deletion
      await handleFetchFavoriteRepos();
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar isAuthenticated={isAuthenticated} onLogout={logout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            My Favorite Repositories
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {favorites.length > 0 
              ? `You have ${favorites.length} favorite ${favorites.length === 1 ? 'repository' : 'repositories'}`
              : 'Star some repositories to see them here'
            }
          </p>
        </div>

        {/* Loading State */}
        {loading && <Loading />}

        {/* Error State */}
        {error && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
            <ErrorMessage message={error} />
          </div>
        )}

        {/* Favorites List */}
        {!loading && !error && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            {favorites.length === 0 ? (
              <EmptyState
                title="No favorites yet"
                message="Star some repositories from the home page to see them here."
                icon="⭐"
              />
            ) : (
              <div className="grid gap-6">
                {favorites.map((repo) => (
                  <RepoCard
                    key={repo.id}
                    repo={repo}
                    onSave={() => handleRemoveFavorite(repo.id)}
                    isAuthenticated={isAuthenticated}
                    isFavorite={true}
                    onToggleFavorite={() => handleRemoveFavorite(repo.id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default FavoritesPage;