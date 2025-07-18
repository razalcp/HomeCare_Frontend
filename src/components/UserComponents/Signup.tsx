import { useFormik } from "formik";
import * as Yup from "yup";
import registerUser from "src/Redux/Thunk/userApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/Redux/store";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'sonner'
// import brain from 'src/assets/brain.jpg'
// import robo1 from'src/assets/Robo1.jpg'
// import lung3 from 'src/assets/Lung3.jpg'
// import signUpBackground from 'src/assets/signUpBackground.jpg'
import brain2 from 'src/assets/brain2.jpg'
import brainAi from 'src/assets/BrainAi.png'
const Signup = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[A-Za-z]+(?:\s[A-Za-z]+)?$/, "Enter a valid Name")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .matches(/^([a-zA-Z][a-zA-Z0-9._-]*)@(gmail\.com|yahoo\.com|outlook\.com)$/, "Invalid email format")
      .required("Email is required"),
    mobile: Yup.string()
      .matches(/^(?!0{10})[6789]\d{9}$/, "Phone number must be valid Indian number")
      .required("Phone number is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters long, include one uppercase letter, one number, and one special character"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values: {
      name: string;
      email: string;
      mobile: string;
      password: string;
      confirmPassword: string;
}) => {
      try {
        if (values) {
          localStorage.removeItem('otp-timer');
          const registrationState = await dispatch(registerUser(values))

          if (registrationState.payload === "OTP sent to mail") {
            navigate('/verifyOtp', { replace: true })
          }
          if (registrationState.payload === "Email already exists") {
            toast.error("Email Already Exists.", { position: "top-center", duration: 5000 })
            formik.resetForm()

          }


        }
      } catch (error: any) {
        console.log(error);
      }
    },
  });

  return (
    <div className="bg-cover bg-center min-h-screen flex items-center justify-center bg-blue-50" >


      <div
        id="form-data"
        className="border mt-16 border-gray-300 rounded-lg p-6 max-w-md mx-auto bg-white/30 shadow-lg "
      >
        <div id="form-desc" className="space-y-4">
          <div id="form-field">
            <h4 className="text-xl font-semibold text-center mb-5 bg-gradient-to-r from-teal-500 to-indigo-600 bg-clip-text text-transparent">
              HomeCare Patient Register
            </h4>
            <p className="text-gray-500 text-sm mt-[-21px] ml-[54px] mb-[17px]">
              Book your appointment with trusted doctors!
            </p>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
              {formik.touched.name && formik.errors.name && (
                <div  className="text-red-500 text-sm">{formik.errors.name}</div>
              )}

              {/* Email Field */}
              <input
                type="text"
                name="email"
                placeholder="E-mail"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
              {formik.touched.email && formik.errors.email && (
                <div  className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              )}

              {/* Mobile Field */}
              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={formik.values.mobile}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
              {formik.touched.mobile && formik.errors.mobile && (
                <div  className="text-red-500 text-sm">
                  {formik.errors.mobile}
                </div>
              )}

              {/* Password Field */}
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
              {formik.touched.password && formik.errors.password && (
                <div  className="text-red-500 text-sm">
                  {formik.errors.password}
                </div>
              )}

              {/* Confirm Password Field */}
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <div  className="text-red-500 text-sm">
                    {formik.errors.confirmPassword}
                  </div>
                )}

              <p className="text-sm text-neutral-500 text-center">
               <Link to="/login"> Already have an account?</Link>
              </p>
              <button
                type="submit"
                id="form-btn"
                className="w-full text-white py-2 rounded-l bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:translate-y-[-1px] transform transition-all duration-200 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                Signup
              </button>
            </form>
          </div>
          {/* <div id="google-signup" className="text-center space-y-4">
            <p className="text-sm text-gray-400">
              _______________________________or_________________________________
            </p>
            <div className="flex items-center justify-center space-x-3">
              <img
                src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                alt="Google Signup"
                className="w-8 h-8 cursor-pointer border border-gray-200 rounded-full"
              />
              <p className="text-sm text-gray-500">
                You Can Sign in using Google
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Signup;
