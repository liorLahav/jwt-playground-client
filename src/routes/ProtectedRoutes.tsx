import { Navigate, Outlet } from "react-router-dom";
import { UseAuth } from "./useAuth";

export const ProtectedRoutes = ({ adminOnly }: { adminOnly?: boolean }) => {
  const { isAuthenticated, isLoading, user } = UseAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
