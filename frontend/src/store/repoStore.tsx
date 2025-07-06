//Have a function that returns everything. 
import { useState } from 'react';
import fetchRepos from '../api/repoApi'; // Adjust the import path as necessary
import type { Repo, RepoStore } from '../interfaces/componentTypes';
import useAuthStore from './authStore';

const useRepoStore = (): RepoStore => {
    const [username, setUsername] = useState('');
    const [repos, setRepos] = useState<Repo[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { isAuthenticated } = useAuthStore(); // Assuming you have an auth store to check authentication status

    // Function to handle fetching repos based on username
    // This function will be called when the user clicks the search button
    const handleFetchRepos = async () => {
        setLoading(true);
        setError('');
        setRepos([]);
        try {
            const data: Error | Repo[] = await fetchRepos(username);
            setRepos(data);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

     const handleSaveRepo = async (repo: Repo) => {
        if (!isAuthenticated) {
          alert('Please log in to save favorites.');
          return;
        }
    
        try {
          await fetch('/user/favorites', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`, // or however you store your JWT
            },
            body: JSON.stringify({
              githubRepoId: repo.id,
              name: repo.name,
              description: repo.description,
              repoUrl: repo.repoUrl,
              starCount: repo.starCount,
              language: repo.language,
            }),
          });
          alert('Repo saved!');
        } catch (error) {
          alert('Failed to save repo.');
        }
      };

    return {
        username,
        repos,
        loading,
        error,
        handleFetchRepos,
        handleSaveRepo,
        setUsername,
    };
}


export default useRepoStore;