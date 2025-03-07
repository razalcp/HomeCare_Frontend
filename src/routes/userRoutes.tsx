import { createBrowserRouter } from "react-router-dom";
import AppLayout from "src/app";
import Body from "@components/UserComponents/Body";
import SignUpPage from "src/pages/userPages/SignUpPage";

import Error from "@components/UserComponents/Error";
import UserOtpPage from "src/pages/userPages/UserOtpPage";
import LoginPage from "src/pages/userPages/LoginPage"
import DoctorRegisterPage from "src/pages/DoctorPages/DoctorRegisterPage";


// import TrainerKyc from "@components/DoctorComponents/TrainerKyc";

import RegistrationSuccess from 'src/components/DoctorComponents/RegistrationSuccess'
import AdminLogin from "@components/AdminComponents/AdminLogin";
import AdminHomePage from "src/pages/AdminPages/AdminHomePage";
// import Sidebar from "@components/AdminComponents/SampleSideBar";
import AdminDepartmentsPage from "src/pages/AdminPages/AdminDepartmentsPage";
import AdminAppLayout from "src/adminApp";
// import DoctorForm from "@components/DoctorComponents/DoctorForm";
import FormComponent from "@components/DoctorComponents/FormComponent";
import DoctorKyc from "@components/DoctorComponents/DoctorKyc";
// import DoctorVerificationPage from "src/pages/AdminPages/DoctorVerificationPage";
import DoctorVerification from "@components/AdminComponents/DoctorVerification";
import DoctorDetailsPage from "src/pages/AdminPages/DoctorDetailsPage";
import DoctorsPage from "src/pages/userPages/DoctorsPage";
import UserSideDoctorDetails from "@components/UserComponents/UserSideDoctorDetails";
import BlockUnblockPatients from "@components/AdminComponents/BlockUnblockPatients";
import DoctorLoginPage from "src/pages/DoctorPages/DoctorLoginPage";
import DoctorHomePage from "src/pages/DoctorPages/DoctorHomePage";
import DoctorProfilePage from "src/pages/DoctorPages/DoctorProfilePage";
import ProtectedRoute from "@components/UserComponents/ProtectedRoute";
import PublicRoute from "@components/UserComponents/PublicRoute";
import AdminPublicRoute from "@components/AdminComponents/AdminPublicRoute";
import AdminProtectedRoute from "@components/AdminComponents/AdminProtectedRoute";
import DoctorPublicRoute from "@components/DoctorComponents/DoctorPublicRoute";
import DoctorProtectedRoute from "@components/DoctorComponents/DoctorProtectedRoute";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/doctors",
        element: <ProtectedRoute />,
        children: [{ path: "", element: <DoctorsPage /> }],
      },   
      {
        path: "/userSideDoctorDetails",
        element: <ProtectedRoute />,
        children: [{ path: "", element: <UserSideDoctorDetails /> }],
      },
    ],
    errorElement: <Error />
  },
  {
    path: "/signup",
    element: <SignUpPage />,

  },
  {
    path: '/verifyOtp',
    element: <UserOtpPage />
  },
  {
    path: "/login",
    element: <PublicRoute><LoginPage /></PublicRoute>

  },
  {
    path: "/test",
    element: <Body />
  },
  ///////////////////////////////////////Doctor
  {
    path: "/",
    element: <DoctorPublicRoute />, // DoctorPublicRoute handles redirection
    children: [
      { path: "doctorRegister", element: <DoctorRegisterPage /> },
      { path: "doctorKyc", element: <DoctorKyc /> },
      { path: "doctorSuccess", element: <RegistrationSuccess /> },
      { path: "doctorLogin", element: <DoctorLoginPage /> }
    ]
  }
  ,
  {
    path: "/",
    element: <DoctorProtectedRoute />, // Protects all nested routes
    children: [
      { path: "/doctorHome", element: <DoctorHomePage /> },
      { path: "/doctorProfile", element: <DoctorProfilePage /> }
    ]
  },
  ////////////////////////////////Admin
  {
    path: '/adminLogin',
    element: <AdminPublicRoute />,
    children: [{ path: '', element: <AdminLogin /> }]
  },
  {
    path: "/",
    element: <AdminProtectedRoute />, // Protect all admin routes
    children: [
      {
        path: "/",
        element: <AdminAppLayout />, // Admin layout (sidebar, header, etc.)
        children: [
          { path: "/adminHome", element: <AdminHomePage /> },
          { path: "/adminDepartments", element: <AdminDepartmentsPage /> },
          { path: "/doctorVerification", element: <DoctorVerification /> },
          { path: "/doctorVerificationDetails", element: <DoctorDetailsPage /> },
          { path: "/managePatients", element: <BlockUnblockPatients /> },
          // Add more protected routes here
        ],
      },
    ],
    errorElement: <Error />
  }





]);

export default appRouter;
