import { createContext, useCallback, useState } from "react";
import { useEffectOnce, useInterval } from "usehooks-ts";

import backend from "@src/lib/backend";
import { AuthModel } from "pocketbase";

import jwtDecode, { JwtPayload } from "jwt-decode";

// Constants
const TOKEN_REFRESH_BUFFER_SECONDS = 600; // 10 minutes
const REFRESH_INTERVAL_MS = 600000; // 10 minutes

// Types
export type AuthProviderType = {
  children: React.ReactNode;
};

type AuthContextType = {
  user: AuthModel | null;
  token: string;
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  logout: () => void;
};

// Context
export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: "",
  isAuthenticating: true,
  isAuthenticated: false,
  logout: () => {},
});

export const AuthProvider = ({ children }: AuthProviderType) => {
  const [user, setUser] = useState(backend.authStore.model);
  const [token, setToken] = useState(backend.authStore.token);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /* 
    Methods
  */
  // check if token in authstore is still valid
  // logout user and clear authstore
  const logout = useCallback(() => {
    setIsAuthenticated(false);
    backend.authStore.clear();
  }, []);

  // on load check if token is valid
  const authenticateToken = async () => {
    setIsAuthenticating(true);

    try {
      await backend.collection("users").authRefresh();
      setIsAuthenticated(true);
    } catch (error) {
      // clear auth store
      logout();
      setIsAuthenticated(false);
    }

    setIsAuthenticating(false);
  };

  const refreshAuthSession = useCallback(async () => {
    if (!token) return;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const tokenExpiration = decoded.exp ?? 0; // in seconds
      const expirationWithBufferInMs =
        tokenExpiration - TOKEN_REFRESH_BUFFER_SECONDS;
      const currentTimestampInSeconds = Date.now() / 1000;

      if (currentTimestampInSeconds >= expirationWithBufferInMs) {
        setIsAuthenticated(true);
        return await backend.collection("users").authRefresh();
      }
    } catch (error) {
      setIsAuthenticated(false);
      return logout();
    }
  }, [token, logout]);

  /* 
    On app load
  */
  useEffectOnce(() => {
    // check if token is valid on load
    authenticateToken();

    // listener for authstore changes
    return backend.authStore.onChange((token, model) => {
      setToken(token);
      setUser(model);
      setIsAuthenticated(token && model ? true : false);
    });
  });

  useInterval(refreshAuthSession, token ? REFRESH_INTERVAL_MS : null);

  return (
    <AuthContext.Provider
      value={{ user, token, logout, isAuthenticating, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
