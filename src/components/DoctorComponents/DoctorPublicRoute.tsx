import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const DoctorPublicRoute = () => {
  const doctor = useSelector((state: any) => state.doctor.doctorInfo);

  return doctor ? <Navigate to="/doctorHome" /> : <Outlet />;
};

export default DoctorPublicRoute;
