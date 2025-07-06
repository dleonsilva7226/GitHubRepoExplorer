import React from 'react';
import SearchBar from './SearchBar';
import RepoList from './RepoList';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';
import useRepoStore from '../store/repoStore';
import useAuthStore from '../store/authStore';

const SearchReposBar: React.FC = () => {
  const { username, repos, loading, error, handleFetchRepos, handleSaveRepo, setUsername } = useRepoStore();
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-sm w-[650px]"> 

    
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Search 🔎</h1>
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

export default SearchReposBar;
