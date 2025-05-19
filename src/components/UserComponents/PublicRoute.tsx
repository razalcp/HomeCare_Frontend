// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { ReactNode } from "react";

import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// const PublicRoute = ({ children }: { children: ReactNode }) => {
//     const userInfo = useSelector((state: any) => state.user?.userInfo);

//     return userInfo && userInfo._id ? <Navigate to="/" replace /> : children;
// };

// export default PublicRoute;



const PublicRoute = ({ children }: { children: ReactNode }) => {
    const userInfo = useSelector((state: any) => state.user?.userInfo);
    const isLogged = localStorage.getItem("userIsLogged") === "true";

    // Block access to public routes only if fully logged in
    if (userInfo && userInfo._id && isLogged) {
        return <Navigate to="/" replace />;
    }

    return children;
};
export default PublicRoute;