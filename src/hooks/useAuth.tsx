import { useState, useEffect } from "react";
import {
  getAccessToken,
  setTokens,
  clearTokens,
  type TokenResponse,
  type ApiUser,
} from "@/lib/api";

/** App-facing user shape (id, name, email, userType for builder/landowner) */
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  userType: "builder" | "landowner";
}

function normalizeUser(apiUser: ApiUser): AuthUser {
  return {
    id: String(apiUser.id),
    name: apiUser.name ?? apiUser.email,
    email: apiUser.email,
    userType: apiUser.role === "PROFESSIONAL" ? "builder" : "landowner",
  };
}

const CURRENT_USER_KEY = "currentUser";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = getAccessToken();
      const userData = localStorage.getItem(CURRENT_USER_KEY);

      if (token && userData) {
        try {
          setIsAuthenticated(true);
          setUser(JSON.parse(userData));
        } catch {
          clearTokens();
          localStorage.removeItem(CURRENT_USER_KEY);
          setIsAuthenticated(false);
          setUser(null);
        }
      } else {
        if (!token) {
          clearTokens();
          localStorage.removeItem(CURRENT_USER_KEY);
        }
        setIsAuthenticated(false);
        setUser(null);
      }
      setLoading(false);
    };

    checkAuth();

    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  /** Persist auth state from API token response (after login/register). */
  const login = (response: TokenResponse) => {
    setTokens(response.access_token, response.refresh_token);
    const normalized = normalizeUser(response.user);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(normalized));
    setIsAuthenticated(true);
    setUser(normalized);
  };

  const logout = () => {
    clearTokens();
    localStorage.removeItem(CURRENT_USER_KEY);
    setIsAuthenticated(false);
    setUser(null);
  };

  return {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
  };
};
