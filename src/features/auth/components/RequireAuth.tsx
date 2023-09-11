import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks";

type RequireAuthProps = {
  redirectTo?: string;
  children?: React.ReactNode;
};

const RequireAuth = ({
  redirectTo = "/access-denied",
  children,
}: RequireAuthProps) => {
  const { isAuthenticating, isAuthenticated } = useAuth();

  if (isAuthenticating) {
    return null;
  }

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to={{ pathname: redirectTo }} replace />;
};

export default RequireAuth;
