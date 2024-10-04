import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../utilities/AuthProvider";
const PrivateRoutes = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
export default PrivateRoutes;
