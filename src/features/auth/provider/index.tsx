import { createContext, useCallback, useState } from "react";
import { useEffectOnce } from "usehooks-ts";

import { getAuth, onAuthStateChanged, User } from "firebase/auth";

// Types
export type AuthProviderType = {
  children: React.ReactNode;
};

type AuthContextType = {
  user: User | null;
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  logout: () => void;
};

// Context
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticating: true,
  isAuthenticated: false,
  logout: () => {},
});

export const AuthProvider = ({ children }: AuthProviderType) => {
  const auth = getAuth();

  const [user, setUser] = useState(auth.currentUser);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // for initial loading purposes
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  /* 
    Methods
  */
  // logout user
  const logout = useCallback(async () => {
    await auth.signOut();
    setIsAuthenticated(false);
  }, [auth]);

  /**
   * On app load
   */
  const onAppLoad = useCallback(async () => {
    await auth.authStateReady();
    setIsAuthenticating(false);
  }, [auth]);

  useEffectOnce(() => {
    onAppLoad();

    const unsubAuthStateListener = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => {
      unsubAuthStateListener();
    };
  });

  return (
    <AuthContext.Provider
      value={{ user, logout, isAuthenticating, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
