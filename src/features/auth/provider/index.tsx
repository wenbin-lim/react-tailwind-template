import { createContext, useCallback, useState } from "react";
import { useEffectOnce } from "usehooks-ts";

import { getAuth, onAuthStateChanged } from "firebase/auth";

// Types
export type AuthProviderType = {
  children: React.ReactNode;
};

type AuthContextType = {
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  logout: () => void;
};

// Context
export const AuthContext = createContext<AuthContextType>({
  isAuthenticating: true,
  isAuthenticated: false,
  logout: () => {},
});

export const AuthProvider = ({ children }: AuthProviderType) => {
  const auth = getAuth();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // for initial loading purposes
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  /* 
    Methods
  */
  // logout firebase user
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

    const unsubAuthStateListener = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        try {
          if (firebaseUser) {
            setIsAuthenticated(true);
          } else {
            logout();
          }
        } catch (error) {
          console.error(error);
          logout();
        }
      },
    );

    return () => {
      unsubAuthStateListener();
    };
  });

  return (
    <AuthContext.Provider
      value={{
        logout,
        isAuthenticating,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
