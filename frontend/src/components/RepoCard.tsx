import React from 'react';
import type { RepoCardProps } from '../interfaces/ComponentTypes';

const RepoCard: React.FC<RepoCardProps> = ({ repo, onSave, isAuthenticated }) => {
  return (
<div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition min-h-[120px]">
  <h2 className="text-xl font-semibold text-blue-600 hover:underline">
  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
</h2>
<p className="text-base text-gray-700 mt-2">
  {repo.description || "No description."}
</p>
<div className="flex justify-between text-base text-gray-500 mt-3">
  <span>⭐ {repo.stargazers_count}</span>
  <span>{repo.language || "Unknown"}</span>
</div>

</div>


  );
};

export default RepoCard;

