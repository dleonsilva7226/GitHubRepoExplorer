// This file defines the interfaces for the components used in the application.
// It includes the Repo interface for repository data and the RepoCardProps interface for the props of

// the Repo component
export interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  language: string;
}

// the RepoCard component.
export interface RepoCardProps {
  repo: Repo;
    onSave: (repo: Repo) => void;  
    isAuthenticated: boolean;
}

// RepoListProps interface for the props of the RepoList component.
export interface RepoListProps {
  repos: Repo[];
  onSave: (repo: Repo) => void;
  isAuthenticated: boolean;
}



// It includes the SearchBarProps interface for the props of the SearchBar component.
export interface SearchBarProps {
  username: string;
  setUsername: (username: string) => void;
  onSearch: () => void;
}


// Error message props interface for displaying error messages.
export interface ErrorMessageProps {
  message: string;
}

