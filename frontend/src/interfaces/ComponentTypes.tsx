// This file defines the interfaces for the components used in the application.
// It includes the Repo interface for repository data and the RepoCardProps interface for the props of

// the Repo component
export interface Repo {
    id: number;
    name: string;
    description: string;
    language: string;
    repoUrl: string;
    starCount: number;
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


// Store Store Interfaces here below
export interface UserStore {
    userEmail: string;
    setUserEmail: (userEmail: string) => void;
}

export interface RepoStore {
    username: string;
    repos: Repo[];
    loading: boolean;
    error: string;
    handleFetchRepos: () => Promise<void>;
    handleSaveRepo: (repo: Repo) => Promise<void>;
    setUsername: (username: string) => void;
}

export interface AuthStore {
    updateLoginStatus: () => Promise<void>;
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

// AuthApiResponse interface for the authentication API response.
// It includes methods for user registration, login, logout, and checking authentication status.
export interface AuthApiResponse {
    verifyUser: (token: string) => Promise<UserVerifySuccessResponse | UserVerifyFailResponse>;
    registerUser: (username: string, password: string) => Promise<void>;
    loginUser: (username: string, password: string) => Promise<boolean>;
};

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