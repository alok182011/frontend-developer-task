import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.user);

  return user.token ? children : <Navigate to="/" />;
};

export default PrivateRoute;