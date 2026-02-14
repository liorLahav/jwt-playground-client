import { Navigate, Outlet } from "react-router-dom";
import { UseAuth } from "./useAuth";

export const PublicRoutes = () => {
  const { isAuthenticated } = UseAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
