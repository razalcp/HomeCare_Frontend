import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSocket } from "src/context/socketContext";
import { useEffect } from "react";

const DoctorProtectedRoute = () => {
  const doctor = useSelector((state: any) => state.doctor.doctorInfo);
  const {createSocket , socket} = useSocket()
  ;
  useEffect(()=>{
      createSocket(doctor._id)

  },[doctor])

  return doctor ? <Outlet /> : <Navigate to="/doctorLogin" />;
};

export default DoctorProtectedRoute;
