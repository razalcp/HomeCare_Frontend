import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
    const userInfo = useSelector((state: any) => state.user.userInfo);

    return userInfo && userInfo._id ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
