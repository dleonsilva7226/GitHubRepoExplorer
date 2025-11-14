import React, { useState, useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import useRepoStore from '../store/repoStore';
import useAuthStore from '../store/authStore';
import type { User, Repo } from '../interfaces/ComponentTypes';

const HomePage: React.FC = () => {
  const {
    username,
    repos,
    favorites,
    loading: reposLoading,
    error: reposError,
    handleFetchRepos,
    handleAddRepo,
    handleDeleteRepo,
    handleFetchFavoriteRepos,
    setUsername,
  } = useRepoStore();

  const { isAuthenticated } = useAuthStore();

  // TODO: Wire up to GitHub API to fetch user profile data
  // Placeholder state for user data
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(false);

  // Frontend-only favorite state for immediate UI feedback
  // This allows favorites to work even when not authenticated (for demo purposes)
  const [localFavorites, setLocalFavorites] = useState<Set<number>>(new Set());

  // Load favorites when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      handleFetchFavoriteRepos().catch((error) => {
        console.error('Error loading favorites:', error);
      });
    } else {
      // Clear favorites when not authenticated
      setLocalFavorites(new Set());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]); // handleFetchFavoriteRepos is stable from the store

  // TODO: Implement this function to fetch user profile from GitHub API
  // Example: fetch(`https://api.github.com/users/${username}`)
  const fetchUserProfile = async (username: string) => {
    if (!username.trim()) return;
    
    setUserLoading(true);
    try {
      // TODO: Replace with actual GitHub API call
      // const response = await fetch(`https://api.github.com/users/${username}`);
      // const data = await response.json();
      // setUser({
      //   id: data.id,
      //   login: data.login,
      //   name: data.name || data.login,
      //   avatar_url: data.avatar_url,
      //   followers: data.followers,
      //   following: data.following,
      //   bio: data.bio,
      //   public_repos: data.public_repos,
      // });
      
      // Placeholder: Set to null for now until API is wired up
      setUser(null);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUser(null);
    } finally {
      setUserLoading(false);
    }
  };

  // Fetch user profile when username changes and search is performed
  useEffect(() => {
    if (username && repos.length > 0) {
      fetchUserProfile(username);
    }
  }, [username, repos.length]);

  const handleSearch = async () => {
    await handleFetchRepos();
    // User profile will be fetched in useEffect above
  };

  const handleToggleLocalFavorite = (repo: Repo) => {
    setLocalFavorites((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(repo.id)) {
        newSet.delete(repo.id);
      } else {
        newSet.add(repo.id);
      }
      return newSet;
    });
  };

  const handleAddFavorite = async (repo: Repo) => {
    console.log('handleAddFavorite called:', { repoId: repo.id, isAuthenticated });
    if (isAuthenticated) {
      try {
        console.log('Calling handleAddRepo...');
        await handleAddRepo(repo);
        console.log('handleAddRepo completed, refreshing favorites...');
        // Refresh favorites list after adding
        await handleFetchFavoriteRepos();
        console.log('Favorites refreshed');
      } catch (error) {
        console.error('Error adding favorite:', error);
      }
    } else {
      // Frontend-only favorite for non-authenticated users
      handleToggleLocalFavorite(repo);
    }
  };

  const handleRemoveFavorite = async (repoId: number) => {
    if (isAuthenticated) {
      try {
        await handleDeleteRepo(repoId);
        // Refresh favorites list after deleting
        await handleFetchFavoriteRepos();
      } catch (error) {
        console.error('Error removing favorite:', error);
      }
    } else {
      // Frontend-only favorite removal
      setLocalFavorites((prev) => {
        const newSet = new Set(prev);
        newSet.delete(repoId);
        return newSet;
      });
    }
  };

  // Combine backend favorites with local favorites
  const allFavorites = React.useMemo(() => {
    const favoriteMap = new Map<number, Repo>();
    
    // Add backend favorites
    favorites.forEach((repo) => {
      favoriteMap.set(repo.id, repo);
    });
    
    // Add local favorites that aren't in backend
    repos.forEach((repo) => {
      if (localFavorites.has(repo.id) && !favoriteMap.has(repo.id)) {
        favoriteMap.set(repo.id, repo);
      }
    });
    
    return Array.from(favoriteMap.values());
  }, [favorites, repos, localFavorites]);

  return (
    <AppLayout
      user={user}
      userLoading={userLoading}
      repos={repos}
      reposLoading={reposLoading}
      reposError={reposError || null}
      username={username}
      setUsername={setUsername}
      onSearch={handleSearch}
      favorites={allFavorites}
      onAddFavorite={handleAddFavorite}
      onRemoveFavorite={handleRemoveFavorite}
      localFavorites={localFavorites}
      onToggleLocalFavorite={handleToggleLocalFavorite}
    />
  );
};

export default HomePage;
