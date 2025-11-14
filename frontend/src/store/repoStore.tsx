//Have a function that returns everything. 
import { useState } from 'react';
import type { Repo, RepoStore } from '../interfaces/ComponentTypes';
import useAuthStore from './authStore';
import { repositoryApi } from '../api/repoApi';

const useRepoStore = (): RepoStore => {
    const [username, setUsername] = useState<string>('');
    const [repos, setRepos] = useState<Repo[]>([]);
    const [favorites, setFavorites] = useState<Repo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const { isAuthenticated } = useAuthStore(); // Assuming you have an auth store to check authentication status
    const { fetchRepos, fetchFavoriteRepos, deleteFavoriteRepo, addFavoriteRepo } = repositoryApi();

    // Function to handle fetching repos based on username
    // This function will be called when the user clicks the search button
    const handleFetchRepos = async (): Promise<void> => {
        setLoading(true);
        setError('');
        setRepos([]);
        try {
            const data: Error | Repo[] = await fetchRepos(username);
            setRepos(data);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };
    
    const handleFetchFavoriteRepos = async (): Promise<void> => {
      if (!isAuthenticated) {
        setFavorites([]);
        return;
      }
      setLoading(true);
      setError('');
      try {
        const data: Repo[] = await fetchFavoriteRepos();
        setFavorites(data || []);
      }
      catch (err: unknown) {
        console.error('Error fetching favorites:', err);
        const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred while fetching favorites.';
        setError(errorMessage);
        setFavorites([]); // Set empty array on error
      }
      finally {
        setLoading(false);
      }
    }

    const handleAddRepo = async (repo: Repo): Promise<void> => {
      if (!isAuthenticated) {
        setError('Please log in to add favorites.');
        return;
      }
      setLoading(true);
      setError('');
      try {
        const data = await addFavoriteRepo(repo);
        setFavorites(data);
      } catch (error: unknown) {
        console.error('Error adding repo:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to add repo. Please try again.';
        setError(errorMessage);
        // Still try to refresh favorites in case it was added but response was malformed
        try {
          const refreshed = await fetchFavoriteRepos();
          setFavorites(refreshed);
        } catch (refreshError) {
          console.error('Error refreshing favorites:', refreshError);
        }
      } finally {
        setLoading(false);
      }
    };

    const handleDeleteRepo = async (githubRepoId: number): Promise<void> => {
      if (!isAuthenticated) {
        alert('Please log in to delete favorites.');
        return;
      }
      try {
        const data = await deleteFavoriteRepo(githubRepoId);
        setFavorites(data);
        alert('Repo deleted!');
      } catch (err) {
        console.error('Error deleting repo:', err);
        alert('Failed to delete repo.');
      }
    };

    return {
        username,
        repos,
        favorites,
        loading,
        error,
        handleAddRepo,
        handleFetchRepos,
        handleFetchFavoriteRepos,
        handleDeleteRepo,
        setUsername,
    };
}


export default useRepoStore;