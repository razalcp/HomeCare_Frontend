import { createBrowserRouter } from "react-router-dom";
import AppLayout from "src/app";
import Body from "@components/UserComponents/Body";
import SignUpPage from "src/pages/userPages/SignUpPage";

import Error from "@components/UserComponents/Error";
import UserOtpPage from "src/pages/userPages/UserOtpPage";
import LoginPage from "src/pages/userPages/LoginPage"
import DoctorRegisterPage from "src/pages/DoctorPages/DoctorRegisterPage";


// import TrainerKyc from "@components/DoctorComponents/TrainerKyc";
import DoctorKyc from "@components/DoctorComponents/DoctorKyc";



const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
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
    element: <LoginPage />,
  },
  {
    path: "/test",
    element: <Body />
  },
  {
    path: '/doctorRegister',
    element: <DoctorRegisterPage />
  },
  {
    path: '/doctorKyc',
    element: <DoctorKyc />
  }

]);

export default appRouter;
