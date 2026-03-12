import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AuthProtectedRoute({ children }) {
  const { currentUser } = useSelector((state) => state.user);

  if (currentUser.role === "user") {
    return <Navigate to={"/dashboard/home"} replace />;
  } else if (currentUser.role === "seller") {
    return <Navigate to={"/seller-dashboard/home"} replace />;
  } else if (currentUser.role === "admin") {
    return <Navigate to={"/admin-dashboard/home"} replace />;
  } else {
    return children;
  }
}
