import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../utilities/AuthProvider";
import Login from "../../pages/Authentication/Login";
import { authGuard } from "../../services/authentication-services";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
const PrivateRoutes = ({ userRole, multiple }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  // const { isAuthenticated } = useAuth();
  useEffect(() => {
    const userAuth = async () => {
      const response = await authGuard(setLoading);
      if (response.status == 200) {
        if (multiple) {
          if (
            response.data.role.toLowerCase() == "user" ||
            response.data.role.toLowerCase() == "lawyer"
          ) {
            setIsAuthenticated(true);
          }
        } else {
          if (response.data.role.toLowerCase() == userRole) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        }
      } else {
        setIsAuthenticated(false);
      }
    };
    userAuth();
  }, []);
  return loading ? (
    <div className="z-[1000] flex flex-col items-center justify-center h-[100vh] w-full dark:bg-black bg-white ">
      <Loader color={"blue"} />
      <p className="text-center">Redirecting </p>
    </div>
  ) : isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} />
  );
  // console.log(isAuthenticated, "isAuthenticated");
  // return <div className="my-40">sdsad</div>;
};
export default PrivateRoutes;
