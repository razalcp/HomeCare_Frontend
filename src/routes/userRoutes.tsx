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
import DoctorAppLayout from "src/doctorApp";
import DoctorAddSlotsPage from "src/pages/DoctorPages/DoctorAddSlotsPage";
import AppointmentBooking from "@components/UserComponents/AppointmentBooking";
import SuccessPage from "@components/UserComponents/SuccessPage";
import PaymentFailedPage from "@components/UserComponents/PaymentFailedPage";
import BookingHistoryPage from "src/pages/userPages/BookingHistoryPage";
import DoctorAppointments from "@components/DoctorComponents/DoctorAppointments";
import UserWallet from "@components/UserComponents/UserWallet";
import DoctorWallet from "@components/DoctorComponents/DoctorWallet";
import AdminWallet from "@components/AdminComponents/AdminWallet";
import UserProfile from "@components/UserComponents/UserProfile";
import Chat from "@components/UserComponents/Chat";
import DoctorChat from "@components/DoctorComponents/DoctorChat";
import DoctorChatNew from "@components/DoctorComponents/DoctorChatNew";
import UserChatNew from "@components/UserComponents/UserChatNew";



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
      {
        path: "/booking",
        element: <ProtectedRoute />,
        children: [{ path: "", element: <AppointmentBooking /> }],
      },
      {
        path: "/success",
        element: <ProtectedRoute />,
        children: [{ path: "", element: <SuccessPage /> }],
      },
      {
        path: "/paymentFailed",
        element: <ProtectedRoute />,
        children: [{ path: "", element: <PaymentFailedPage /> }],

      },
      {
        path: "/userWallet",
        element: <ProtectedRoute />,
        children: [{ path: "", element: <UserWallet /> }],

      }, {
        path: "/userProfile",
        element: <ProtectedRoute />,
        children: [{ path: "", element: <UserProfile /> }],

      },
      {
        path: "/userChat",
        element: <ProtectedRoute />,
        children: [{ path: "", element: <UserChatNew /> }],

      },

    ],
    errorElement: <Error />
  },
  {
    path: "/bookingHistory",
    element: <ProtectedRoute />,
    children: [{ path: "", element: <BookingHistoryPage /> }],

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
  // {
  //   path: "/",
  //   element: <DoctorProtectedRoute />, // Protects all nested routes
  //   children: [
  //     { path: "/doctorHome", element: <DoctorHomePage /> },
  //     { path: "/doctorProfile", element: <DoctorProfilePage /> }
  //   ]
  // },
  {
    path: "/",
    element: <DoctorProtectedRoute />, // Protects all doctor routes
    children: [
      {
        path: "/",
        element: <DoctorAppLayout />, // Doctor layout (sidebar, header, etc.)
        children: [
          { path: "/doctorHome", element: <DoctorHomePage /> },
          { path: "/doctorProfile", element: <DoctorProfilePage /> },
          { path: '/doctorAddSlots', element: <DoctorAddSlotsPage /> },
          { path: '/doctorAppointments', element: <DoctorAppointments /> },
          { path: '/doctorWallet', element: <DoctorWallet /> },
          { path: '/doctorChat', element: <DoctorChatNew /> }
        ],
      }
    ],
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
          { path: "/adminWallet", element: <AdminWallet /> },
          // Add more protected routes here
        ],
      },
    ],
    errorElement: <Error />
  }





]);

export default appRouter;
