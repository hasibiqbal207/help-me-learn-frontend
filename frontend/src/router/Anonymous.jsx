import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../core/selectors/user";

export const Anonymous = ({ component: RouteComponent }) => {
  const redirect = useSelector(isAuthenticated);

  if (redirect) {
    return <Navigate to="/home" />;
  }

  return <RouteComponent />;
};
