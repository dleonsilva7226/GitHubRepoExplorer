import React from 'react';
import SearchBar from './components/SearchBar';
import RepoList from './components/RepoList';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';
import './App.css'; // Ensure you have Tailwind CSS set up
import useRepoStore from './store/repoStore';
import useAuthStore from './store/authStore';

const HomePage: React.FC = () => {
  const {username, repos, loading, error, handleFetchRepos, handleSaveRepo, setUsername} = useRepoStore();
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-sm w-[650px]">  <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">GitHub Repo Explorer</h1>
          <p className="text-sm text-gray-500 mt-2">Search repos by username and save your favorites</p>
        </div>

        {/* Search Bar */}
        <SearchBar
          username={username}
          setUsername={setUsername}
          onSearch={handleFetchRepos}
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
