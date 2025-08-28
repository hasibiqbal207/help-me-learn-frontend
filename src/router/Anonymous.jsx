import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { isAuthenticated, getUserType } from "../core/selectors/user";

export const Anonymous = ({ component: RouteComponent }) => {
  const redirect = useSelector(isAuthenticated);
  const userType = useSelector(getUserType);
  
  // Debug authentication status
  console.log("Anonymous component - Is authenticated:", redirect);
  console.log("Anonymous component - User type:", userType);

  if (redirect) {
    console.log("Anonymous component - Redirecting to home");
    return <Navigate to="/home" />;
  }

  console.log("Anonymous component - Rendering login/registration component");
  return <RouteComponent />;
};
