import React from 'react';
import RepoCard from './RepoCard';
import type { RepoListProps } from '../interfaces/ComponentTypes';

const RepoList: React.FC<RepoListProps> = ({ repos, onSave, isAuthenticated }) => {
  return (
    <div className="grid gap-6 mt-10">
        {repos.map(repo => (
            <RepoCard
            key={repo.id}
            repo={repo}
            onSave={() => onSave(repo)}
            isAuthenticated={isAuthenticated}
            />
        ))}
    </div>

  );
};

export default RepoList;
