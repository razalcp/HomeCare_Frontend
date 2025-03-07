import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const DoctorProtectedRoute = () => {
  const doctor = useSelector((state: any) => state.doctor.doctorInfo);

  return doctor ? <Outlet /> : <Navigate to="/doctorLogin" />;
};

export default DoctorProtectedRoute;
