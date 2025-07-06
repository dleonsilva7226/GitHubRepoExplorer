import React, { createContext, useContext, useState, useCallback } from "react";
import authenticationApi from "../api/authApi";
import type { UserVerifySuccessResponse, UserVerifyFailResponse, AuthContextType } from "../interfaces/componentTypes";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { verifyUser } = authenticationApi();

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    // Optionally: redirect to login page here
  }, []);

  const updateLoginStatus = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }
    try {
      const result: UserVerifySuccessResponse | UserVerifyFailResponse = await verifyUser(token);
      if (result.success === true) {
        setIsAuthenticated(true);
      } else {
        logout();
      }
    } catch {
      logout();
    }
  }, [logout, verifyUser]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, updateLoginStatus, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};