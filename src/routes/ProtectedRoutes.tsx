import { Navigate, Outlet } from "react-router-dom";
import { UseAuth } from "./Auth";

export const ProtectedRoutes = () => {
  const { isAuthenticated, isLoading } = UseAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
