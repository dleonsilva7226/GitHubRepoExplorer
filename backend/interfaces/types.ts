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

export interface AuthenticatedRequestVerified {
    success: boolean;
    message: string;
    user: {
        id: number;
        email: string;
    };
    tokenExpiration: number; // Token expiration time
    accessTime: string; // Time of access
}