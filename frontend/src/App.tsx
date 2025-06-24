import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import { type Repo } from './interfaces/ComponentTypes';
import RepoList from './components/RepoList';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';
import './App.css'; // Ensure you have Tailwind CSS set up

const HomePage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // replace with real auth check

  const fetchRepos = async () => {
    setLoading(true);
    setError('');
    setRepos([]);

    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos`);
      if (!response.ok) {
        throw new Error('User not found or GitHub API failed.');
      }

      const data: Repo[] = await response.json();
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
          repoId: repo.id,
          name: repo.name,
          description: repo.description,
          html_url: repo.html_url,
          stargazers_count: repo.stargazers_count,
          language: repo.language,
        }),
      });
      alert('Repo saved!');
    } catch (error) {
      alert('Failed to save repo.');
    }
  };

  return (
<div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-sm">  <div className="max-w-3xl mx-auto space-y-8">
    {/* Header */}
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900">GitHub Repo Explorer</h1>
      <p className="text-sm text-gray-500 mt-2">Search repos by username and save your favorites</p>
    </div>

    {/* Search Bar */}
    <SearchBar
      username={username}
      setUsername={setUsername}
      onSearch={fetchRepos}
    />

    {/* Repo List */}
    {loading && <Loading />}
    {error && <ErrorMessage message={error} />}
    {!loading && !error && repos.length > 0 && (
      <div className="space-y-5">
        <RepoList repos={repos} onSave={handleSaveRepo} isAuthenticated={isAuthenticated} />
      </div>
    )}
  </div>
</div>


    

  );
};

export default HomePage;
