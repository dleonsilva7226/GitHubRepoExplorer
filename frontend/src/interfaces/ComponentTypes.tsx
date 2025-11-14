// This file defines the interfaces for the components used in the application.
// It includes the Repo interface for repository data and the RepoCardProps interface for the props of

// User interface for GitHub user profile data
export interface User {
    id: number;
    login: string; // username
    name: string;
    avatar_url: string;
    followers: number;
    following: number;
    bio?: string;
    public_repos?: number;
}

// the Repo component
export interface Repo {
    id: number;
    name: string;
    description: string;
    language: string;
    repoUrl: string;
    starCount: number;
    lastUpdated?: string; // ISO date string - placeholder for now
}

// the RepoCard component.
export interface RepoCardProps {
    repo: Repo;
    onSave: (repo: Repo) => void;  
    isAuthenticated: boolean;
    isFavorite?: boolean; // Visual indicator for favorite state
    onToggleFavorite?: (repo: Repo) => void; // For frontend-only favorite toggling
    compact?: boolean; // For sidebar compact view
}

// RepoListProps interface for the props of the RepoList component.
export interface RepoListProps {
    repos: Repo[];
    onSave: (repo: Repo) => void;
    isAuthenticated: boolean;
    onToggleFavorite?: (repo: Repo) => void; // For frontend-only favorite toggling
    favoriteIds?: Set<number>; // Set of favorite repo IDs for visual indication
}


// Includes Props for SaveButton
export interface SaveButtonProps {
  onClick: () => void;
  isSaved: boolean;
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

// UserProfileCard props
export interface UserProfileCardProps {
    user: User | null;
    loading?: boolean;
}

// FavoritesSidebar props
export interface FavoritesSidebarProps {
    favorites: Repo[];
    onRemoveFavorite: (repoId: number) => void;
    onToggleFavorite?: (repo: Repo) => void;
    isAuthenticated: boolean;
}

// EmptyState props
export interface EmptyStateProps {
    title: string;
    message: string;
    icon?: string;
}


// Store Store Interfaces here below
export interface UserStore {
    userEmail: string;
    setUserEmail: (userEmail: string) => void;
}

export interface RepoStore {
    username: string;
    repos: Repo[];
    favorites: Repo[];
    loading: boolean;
    error: string;
    handleFetchRepos: () => Promise<void>;
    handleFetchFavoriteRepos: () => Promise<void>;
    handleAddRepo: (repo: Repo) => Promise<void>;
    handleDeleteRepo: (repoId: number) => Promise<void>;    
    setUsername: (username: string) => void;
}

export interface AuthStore {
    updateLoginStatus: (userEmail: string, password: string) => Promise<boolean>;
    isAuthenticated: boolean;
    logout: () => void;
    registerNewUser: (userEmail: string, password: string) => Promise<boolean>;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

// AuthApiResponse interface for the authentication API response.
// It includes methods for user registration, login, logout, and checking authentication status.
export interface AuthApiResponse {
    // verifyUser: (token: string) => Promise<UserVerifySuccessResponse | UserVerifyFailResponse>;
    registerUser: (username: string, password: string) => Promise<boolean | undefined>;
    loginUser: (username: string, password: string) => Promise<boolean | undefined>;
};

export interface RepoApiResponse {
    fetchRepos: (username: string) => Promise<Repo[]>;
    addFavoriteRepo: (repo: Repo) => Promise<Repo[]>;
    deleteFavoriteRepo: (repoId: number) => Promise<Repo[]>;
    fetchFavoriteRepos: () => Promise<Repo[]>;
}

export interface UserVerifySuccessResponse {
    success: boolean;
    message: string;
    user: {
        id: number;
        email: string;
    };
    tokenExpiration: number;
    accessTime: string;
}

export interface UserVerifyFailResponse {
    success: boolean;
    message: string;
}   

export interface UserApiResponse {
    getUserFavorites: () => Promise<Repo[]>;
    addUserFavorite: (repo: Repo) => Promise<void>;
    removeUserFavorite: (repoId: number) => Promise<void>;
    isAuthenticated: () => boolean;
    getUserInfo: () => Promise<{ id: number; email: string }>;
    updateUserInfo: (email: string, password: string) => Promise<void>;
    deleteUserAccount: () => Promise<void>;
};


export interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
  updateLoginStatus: () => Promise<void>;
  logout: () => void;
}