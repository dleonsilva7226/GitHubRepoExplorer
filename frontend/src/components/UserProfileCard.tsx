import React from 'react';
import type { UserProfileCardProps } from '../interfaces/ComponentTypes';

const UserProfileCard: React.FC<UserProfileCardProps> = ({ user, loading }) => {
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-pulse">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center space-x-4">
        <img
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          className="w-20 h-20 rounded-full border-4 border-blue-500 dark:border-blue-400 shadow-md"
        />
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white truncate">
            {user.name || user.login}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            @{user.login}
          </p>
          {user.bio && (
            <p className="text-gray-700 dark:text-gray-300 text-sm mt-2 line-clamp-2">
              {user.bio}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-6 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <span className="text-gray-600 dark:text-gray-400 text-sm">Followers</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {user.followers.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600 dark:text-gray-400 text-sm">Following</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {user.following.toLocaleString()}
          </span>
        </div>
        {user.public_repos !== undefined && (
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 dark:text-gray-400 text-sm">Repos</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {user.public_repos.toLocaleString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfileCard;

