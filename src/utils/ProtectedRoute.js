import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ isUserLoggedIn, children }) {
  return isUserLoggedIn ? children : <Navigate to="/signin" />;
}
