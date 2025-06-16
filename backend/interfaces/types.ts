import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {  // ? makes it optional
        success: boolean;
        message: string;
        user: { id: number; email: string };
        tokenExpiration: number;
        accessTime: string;
      };
    }
  }
}

export interface UserInfo {
    id: number;
    email: string;
    password: string;
}

export interface newUser {
    id: number;
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
}

export interface RegisterResponse {
    success: boolean;
    message: string;
    user: UserInfo;
    token: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    user: UserInfo;
    token: string;
}

export interface ErrorResponse {
    success: boolean;
    message: string;
}

export interface DeleteFavoriteRepoRequest {
    githubRepoId: number;
}

export interface DeleteFavoriteRepoResponse {
    success: boolean;
    message: string;
}

export interface AddFavoriteRepoRequest {
    githubRepoId: number,    // The GitHub repository's ID
    name: string,           // Repository name
    description: string,    // Optional description
    starCount: number,      // Number of stars
    language: string,       // Programming language
    repoUrl: string        // URL to the repository
}