import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { isAuthenticated, getUserType } from "../core/selectors/user";

export const Authorized = ({ component: RouteComponent }) => {
  const authenticated = useSelector(isAuthenticated);
  const userType = useSelector(getUserType);
  
  // Debug authentication and user type
  console.log("Authorized component - Is authenticated:", authenticated);
  console.log("Authorized component - User type:", userType);

  if (authenticated) {
    return <RouteComponent />;
  }

  return <Navigate to="/login" />;
};
