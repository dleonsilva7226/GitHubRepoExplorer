import { useState, useEffect } from 'react';
import type { AuthStore } from '../interfaces/ComponentTypes';
import authenticationApi from '../api/authApi';

const useAuthStore = (): AuthStore => {
    // Check if token exists in localStorage on mount
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        return !!localStorage.getItem('token');
    });
    const { loginUser, registerUser } = authenticationApi();

    // Check authentication status on mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    const registerNewUser = async (userEmail: string, password: string): Promise<boolean> => {
      console.log("Registering user here");
      const response = await registerUser(userEmail, password);
      if (!response) {
        return false;
      }
      console.log("Registration successful, setting token in local storage");
      setIsAuthenticated(true); // Set authenticated state after registration
      return true;
    }

    const updateLoginStatus = async (userEmail: string, password: string): Promise<boolean> => {
      console.log("Logging in here")
      const response = await loginUser(userEmail, password);
      if (!response) {
        return false;
      }
      console.log("Login successful, setting token in local storage");
      setIsAuthenticated(true);     
      return true;   
    }

    const logout = () => {
      setIsAuthenticated(false);
      localStorage.removeItem("token");
      if (!localStorage.getItem("token")) {
        console.log('Token removed from local storage.');
      }
      else {
        throw new Error('Logout failed. Token not removed.');
      }
      console.log('User logged out successfully.');
    }

    return {
        updateLoginStatus,
        isAuthenticated,
        registerNewUser,
        logout,
        setIsAuthenticated
    };
}

export default useAuthStore;