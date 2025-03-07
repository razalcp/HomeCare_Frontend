import { useFormik } from "formik";
import * as Yup from "yup";
import signUpImg from '../../assets/signUpImg.png'
import { adminAuthServ } from "src/services/admin/adminApi";
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addAdminData } from "src/Redux/Slice/adminSlice";

const LoginForm = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      loginId: "",
      password: "",
    },
    validationSchema: Yup.object({
      loginId: Yup.string().required("Login ID is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {


      try {
        const response: any = await adminAuthServ(values)
        dispatch(addAdminData(response.data.data.data))



        if (response?.status === 200) {
          navigate('/adminHome', { replace: true })
        }
        console.log("Response", response.data.data.data);
      } catch (error: any) {
        console.log("This is catch block  ", error);

        if (error.response && error.response.data.message === "Check Credentials") {
          toast.error("Check Credentials", { position: "top-center" });
        } else if (error.response && error.response.data.message === "Wrong password") {
          toast.error("Password is wrong", { position: "top-center" });
        } else if (error.response && error.response.data.message === "User is blocked") {
          toast.error("Your account has been blocked, please contact with our team.", { position: "top-center" });
        } else {
          // console.error("login error => ", error);
          toast.error("Something went wrong, please try again later.", { position: "top-center" });
        }


      }

    },
  });

  return (
    <div id="main-flex-container" className="flex">
      {/* Left Section */}
      <div id="flex-item-left-section" className="h-[748px] w-[738px] flex items-center justify-center">
        <img src={signUpImg} alt="" className="h-[83%] w-[90%] object-contain" />
      </div>

      {/* Right Section */}
      <div id="flex-item-right-section" className="h-[748px] w-[862px] flex flex-col items-center justify-center">
        <div className="mb-[6rem] ml-[-4.5rem]">
          <h1 className="animate-pulse text-blue-600">Welcome Back !!!</h1>
          <h3 className="animate-pulse">Discover a better way of managing HomeCare !</h3>
        </div>


        <form onSubmit={formik.handleSubmit} className="w-[80%] flex flex-col">
          {/* Login ID Field */}
          <input
            type="text"
            name="loginId"
            placeholder="Enter your login ID"
            className="border p-2 my-2"
            value={formik.values.loginId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.loginId && formik.errors.loginId ? (
            <p className="text-red-500 text-sm">{formik.errors.loginId}</p>
          ) : null}

          {/* Password Field */}
          <input
            type="password"
            name="password"
            placeholder="Enter Your Password"
            className="border p-2 my-2"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          ) : null}

          {/* Forgot Password */}
          <p className="text-blue-600 cursor-pointer">Forget Password?</p>

          {/* Submit Button */}
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 mt-4">
            Login Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
