import { createContext, useCallback, useState, useEffect } from "react";
import { useInterval } from "usehooks-ts";

import backend from "@src/lib/backend";
import { Record, Admin } from "pocketbase";

import jwtDecode, { JwtPayload } from "jwt-decode";

// Constants
const fiveMinutesInMs = 5 * 60 * 1000;
const twoMinutesInMs = 2 * 60 * 1000;

// Types
export type AuthProviderType = {
  children: React.ReactNode;
};

type AuthContextType = {
  user: Record | Admin | null;
  token: string;
  logout: () => void;
};

// Context
export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: "",
  logout: () => {},
});

export const AuthProvider = ({ children }: AuthProviderType) => {
  const [token, setToken] = useState(backend.authStore.token);
  const [user, setUser] = useState(backend.authStore.model);

  useEffect(() => {
    return backend.authStore.onChange((token, model) => {
      setToken(token);
      setUser(model);
    });
  }, []);

  const logout = useCallback(() => {
    backend.authStore.clear();
  }, []);

  const refreshSession = useCallback(async () => {
    if (!backend.authStore.isValid) return;

    const decoded = jwtDecode<JwtPayload>(token);
    const tokenExpiration = decoded.exp ?? 0;
    const expirationWithBuffer = (tokenExpiration + fiveMinutesInMs) / 1000;
    if (tokenExpiration < expirationWithBuffer) {
      await backend.collection("users").authRefresh();
    }
  }, [token]);

  useInterval(refreshSession, token ? twoMinutesInMs : null);

  /* 
    TODO: implement RBAC logic here  
  */

  return (
    <AuthContext.Provider value={{ logout, user, token }}>
      {children}
    </AuthContext.Provider>
  );
};
