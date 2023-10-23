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
    setIsAuthenticated(false);
    await auth.signOut();
  }, []);

  /**
   * On app load
   *
   * Firebase SDK handles token refresh automatically
   */
  useEffectOnce(() => {
    const authStateListener = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setIsAuthenticating(false);
    });

    return () => {
      authStateListener();
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
