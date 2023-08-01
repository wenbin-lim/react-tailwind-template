import { Navigate, useLocation } from "react-router-dom";
import useAuth from "./useAuth";

/* 
	RBAC logic not included, implement your own
*/
type RequireAuthProps = {
  redirectTo?: string;
  children?: React.ReactNode;
};

const RequireAuth = ({
  redirectTo = "/access-denied",
  children,
}: RequireAuthProps) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate to={{ pathname: redirectTo }} state={{ location }} replace />
    );
  }

  return children;
};

export default RequireAuth;
