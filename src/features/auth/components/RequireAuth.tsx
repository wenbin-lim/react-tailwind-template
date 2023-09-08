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
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={{ pathname: redirectTo }} replace />;
  }

  return children;
};

export default RequireAuth;
