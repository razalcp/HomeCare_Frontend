// src/components/withProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useSocket } from "src/context/socketContext";
import { RootState } from "src/Redux/appStore";

interface Options {
  userType: "admin" | "doctor" | "user";
  socketRequired?: boolean;
  redirectTo: string;
}

export function withProtectedRoute(Component: React.FC, options: Options) {
  return function WrappedComponent() {
    let userInfo;
    const { socketRequired = false, userType, redirectTo } = options;

    if (userType === "admin") {
      userInfo = useSelector((state: RootState) => state.admin.adminInfo);
    } else if (userType === "doctor") {
      userInfo = useSelector((state: RootState) => state.doctor.doctorInfo);
    } else {
      userInfo = useSelector((state: RootState) => state.user.userInfo);
    }

    const { createSocket } = useSocket();

    useEffect(() => {
      if (socketRequired && userInfo?._id) {
        createSocket(userInfo._id);
      }
    }, [userInfo]);

    const isLogged =
      userType === "user"
        ? localStorage.getItem("userIsLogged") === "true"
        : !!userInfo;

    return isLogged ? <Component /> : <Navigate to={redirectTo} replace />;
  };
}
