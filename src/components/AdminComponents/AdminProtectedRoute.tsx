// import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";

// const AdminProtectedRoute = () => {
//   const adminInfo = useSelector((state: any) => state.admin?.adminInfo); // Ensure correct path
//   // console.log("This is adminInfo", adminInfo);

//   return adminInfo ? <Outlet /> : <Navigate to="/adminLogin" />;
// };

// export default AdminProtectedRoute;


import { Outlet } from "react-router-dom";
import { withProtectedRoute } from "@components/HigherOrderComponent/withProtectedRoute";

const AdminRouteComponent = () => <Outlet />;

const AdminProtectedRoute = withProtectedRoute(AdminRouteComponent, {
  userType: "admin",
  redirectTo: "/adminLogin",
});

export default AdminProtectedRoute;

