import React, { useEffect, useState } from 'react';
import type { Repo } from '../interfaces/componentTypes';
import RepoCard from '../components/RepoCard';
import useUserStore from '../store/userStore';
import LoggedInHeader from '../components/LoggedInHeader';

// Dummy fetchFavorites function (replace with your real API call)
const fetchFavorites = async (): Promise<Repo[]> => {
    // Example: fetch from your backend API
    // const response = await fetch('user/favorites');
    // if (!response.ok) throw new Error('Failed to fetch favorites');
    // return response.json();
    return [
        {
            id: 1,
            name: 'Example Repo 1',
            description: 'This is an example repository.',
            language: 'JavaScript',
            repoUrl: 'https://github.com/dleonsilva7226/jobTrackerApp',
            starCount: 42,
        },
        {
            id: 2,
            name: 'Example Repo 1',
            description: 'This is an example repository.',
            language: 'JavaScript',
            repoUrl: 'https://github.com/dleonsilva7226/jobTrackerApp',
            starCount: 42,
        },
        {
            id: 3,
            name: 'Example Repo 1',
            description: 'This is an example repository.',
            language: 'JavaScript',
            repoUrl: 'https://github.com/dleonsilva7226/jobTrackerApp',
            starCount: 42,
        },
        {
            id: 4,
            name: 'Example Repo 1',
            description: 'This is an example repository.',
            language: 'JavaScript',
            repoUrl: 'https://github.com/dleonsilva7226/jobTrackerApp',
            starCount: 42,
        },
    ];
      
};

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<Repo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const { userEmail } = useUserStore();
  

  useEffect(() => {
    const getFavorites = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchFavorites();
        setFavorites(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load favorites.');
      } finally {
        setLoading(false);
      }
    };
    getFavorites();
  }, []);

  return (
    <>
    <LoggedInHeader />
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col items-center py-10">

      <h1 className="text-4xl font-bold mb-8"> {userEmail || "Unknown User's"}  Favorite Repositories</h1>
      {loading && <div className="text-lg">Loading...</div>}
      {error && <div className="text-red-400 mb-4">{error}</div>}
      <div className="w-full max-w-3xl flex flex-col gap-6">
        {favorites.length === 0 && !loading && !error && (
          <div className="text-center text-gray-400">No favorites yet.</div>
        )}
        {favorites.map((repo) => (
          <RepoCard
            key={repo.id}
            repo={repo}
            isAuthenticated={true}
            onSave={() => {}} // Optionally implement remove from favorites
          />
        ))}
      </div>
    </div>
    </>
  );
};

export default FavoritesPage;