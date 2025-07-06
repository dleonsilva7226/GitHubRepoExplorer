import { useState } from 'react';
import type { AuthStore, UserVerifySuccessResponse, UserVerifyFailResponse } from '../interfaces/componentTypes';
import authenticationApi from '../api/authApi';

const useAuthStore = (): AuthStore => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const { verifyUser } = authenticationApi();
    // This effect runs once when the component mounts to check the initial authentication status
    // and sets up an interval to periodically check the authentication status.
    const updateLoginStatus = async (): Promise<void> => {
      const token: string | null = localStorage.getItem("token");
      
      if (token === null) {
        console.log("No token found in localStorage.");
        setIsAuthenticated(false);
        return;
      }

      try {
        const result: UserVerifySuccessResponse | UserVerifyFailResponse = await verifyUser(token);
        console.log("Login status");
        if (result.success === true) {
          console.log("Logging in here")
          setIsAuthenticated(true);
        } else {
          console.log("Loggin out here");
          logout();
        }
      } catch (err) {
        logout();
      }
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
        setIsAuthenticated
    };
}

export default useAuthStore;