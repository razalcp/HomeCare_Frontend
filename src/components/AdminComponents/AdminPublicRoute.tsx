import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminPublicRoute = () => {
  const adminInfo = useSelector((state: any) => state.admin?.adminInfo); // Ensure correct path

  return adminInfo ? <Navigate to="/adminHome" /> : <Outlet />;
};

export default AdminPublicRoute;

