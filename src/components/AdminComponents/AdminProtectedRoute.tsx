import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminProtectedRoute = () => {
  const adminInfo = useSelector((state: any) => state.admin?.adminInfo); // Ensure correct path

  return adminInfo ? <Outlet /> : <Navigate to="/adminLogin" />;
};

export default AdminProtectedRoute;
