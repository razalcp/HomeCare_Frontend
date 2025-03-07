import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReactNode } from "react";

const PublicRoute = ({ children }: { children: ReactNode }) => {
    const userInfo = useSelector((state: any) => state.user?.userInfo);

    return userInfo && userInfo._id ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
