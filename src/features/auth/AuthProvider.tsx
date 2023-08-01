import { createContext, useCallback, useState, useEffect } from "react";
import { useInterval } from "usehooks-ts";

import pb from "@root/lib/pocketbase";
import { RecordAuthResponse, Record, Admin } from "pocketbase";

import jwtDecode, { JwtPayload } from "jwt-decode";

import handleError, { ErrorType } from "@root/utils/handleError";

// Constants
const fiveMinutesInMs = 5 * 60 * 1000;
const twoMinutesInMs = 2 * 60 * 1000;

// Types
export type AuthProviderType = {
  children: React.ReactNode;
};

export type RegisterProps = {
  username: string;
  email?: string;
  password: string;
  passwordConfirm: string;
};

export type LoginProps = {
  username: string;
  password: string;
};

type AuthContextType = {
  register: (data: RegisterProps) => Promise<Record | ErrorType>;
  login: (data: LoginProps) => Promise<RecordAuthResponse<Record> | ErrorType>;
  logout: () => void;
  user: Record | Admin | null;
  token: string;
};

// Context
export const AuthContext = createContext<AuthContextType>({
  register: () =>
    Promise.reject({
      type: "error",
      status: 500,
      message: "Internal Server Error",
    }),
  login: () =>
    Promise.reject({
      type: "error",
      status: 500,
      message: "Internal Server Error",
    }),
  logout: () => {},
  user: null,
  token: "",
});

export const AuthProvider = ({ children }: AuthProviderType) => {
  const [token, setToken] = useState(pb.authStore.token);
  const [user, setUser] = useState(pb.authStore.model);

  useEffect(() => {
    return pb.authStore.onChange((token, model) => {
      setToken(token);
      setUser(model);
    });
  }, []);

  /* 
    Auth logic:
    1. register
    2. login
    3. logout
  */
  const register = useCallback(
    async ({ username, email, password, passwordConfirm }: RegisterProps) => {
      try {
        const res = await pb
          .collection("users")
          .create({ username, email, password, passwordConfirm });

        return res;
      } catch (error) {
        throw handleError({ error });
      }
    },
    [],
  );

  const login = useCallback(async ({ username, password }: LoginProps) => {
    try {
      const res = await pb
        .collection("users")
        .authWithPassword(username, password);

      return res;
    } catch (error) {
      throw handleError({ error });
    }
  }, []);

  const logout = useCallback(() => {
    pb.authStore.clear();
  }, []);

  const refreshSession = useCallback(async () => {
    if (!pb.authStore.isValid) return;

    const decoded = jwtDecode<JwtPayload>(token);
    const tokenExpiration = decoded.exp ?? 0;
    const expirationWithBuffer = (tokenExpiration + fiveMinutesInMs) / 1000;
    if (tokenExpiration < expirationWithBuffer) {
      await pb.collection("users").authRefresh();
    }
  }, [token]);

  useInterval(refreshSession, token ? twoMinutesInMs : null);

  /* 
    implement RBAC logic here  
  */

  return (
    <AuthContext.Provider value={{ register, login, logout, user, token }}>
      {children}
    </AuthContext.Provider>
  );
};
