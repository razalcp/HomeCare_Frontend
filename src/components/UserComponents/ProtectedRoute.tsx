// import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useSocket } from "src/context/socketContext";
// import { useEffect } from "react";

// const ProtectedRoute = () => {
//     const { createSocket, socket } = useSocket()
//     const userInfo = useSelector((state: any) => state.user.userInfo);
//     const isLogged = localStorage.getItem("userIsLogged") === "true";

//     useEffect(() => {
//         createSocket(userInfo._id)

//     }, [userInfo])


//     if (isLogged) {
//         return <Outlet />
//     } else {


//         return <Navigate to="/login" replace />
//     }
//     // return userInfo && userInfo._id ? <Outlet /> : <Navigate to="/login" replace />;
// };

// export default ProtectedRoute;


import { Outlet } from "react-router-dom";
import { withProtectedRoute } from "@components/HigherOrderComponent/withProtectedRoute";

const UserRouteComponent = () => <Outlet />;

const ProtectedRoute = withProtectedRoute(UserRouteComponent, {
    userType: "user",
    redirectTo: "/login",
    socketRequired: true,
});

export default ProtectedRoute;




