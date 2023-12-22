import { Navigate } from "react-router-dom";

function AuthGuard({ children, model }) {
  const isAuthenticated = model.user?.uid;
  return isAuthenticated ? children : <Navigate to="/" />;
}

export default AuthGuard;
