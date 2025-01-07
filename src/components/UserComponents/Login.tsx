import { useFormik } from 'formik';
import lockAndKey from 'src/assets/lockAndKey.png';
import * as Yup from "yup"
import userApi from 'src/utils/axios/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';


const Login = () => {
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email address")
            .matches(/^([a-zA-Z][a-zA-Z0-9._-]*)@(gmail\.com|yahoo\.com|outlook\.com)$/, "Invalid email format")
            .required("Email is required"),

        password: Yup.string()
            .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Password must be at least 8 characters long, include one uppercase letter, one number, and one special character")
            .required("Password is required")
    })

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values: { email: string, password: string }) => {
            try {

                const response:any= await userApi.post('/login', values)
                localStorage.setItem("userDetails", JSON.stringify(response.data.userData));
                localStorage.setItem("userIsLogged", JSON.stringify(true));


                navigate("/", { replace: true });

            } catch (error: any) {

                if (error.response && error.response.data.message === "Email not found") {
                    toast.error("Email not found", { position: "top-center" });
                } else if (error.response && error.response.data.message === "Wrong password") {
                    toast.error("Password is wrong", { position: "top-center" });
                } else if (error.response && error.response.data.message === "User is blocked") {
                    toast.error("Your account has been blocked, please contact with our team.", { position: "top-center" });
                } else {
                    // console.error("login error => ", error);
                    toast.error("Something went wrong, please try again later.", { position: "top-center" });
                }

            }
        }
    }


    )


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 space-x-8">

            <div className="w-1/3">
                <img
                    src={lockAndKey}
                    alt="Login"
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>


            <div className="w-1/3 p-6 border border-gray-300 rounded-lg shadow-xl">
                <h2 className="text-xl font-semibold text-center mb-5 bg-gradient-to-r from-teal-500 to-indigo-600 bg-clip-text text-transparent">Login to HomeCare</h2>
                <form action="" className="space-y-10 flex flex-col" onSubmit={formik.handleSubmit} >
                    <input

                        type="text"
                        placeholder="Enter your email"
                        className="w-full border border-gray-300 p-2 rounded"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        name="email"


                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className="text-red-500 text-sm">
                            {formik.errors.email}
                        </div>
                    )}
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full border border-gray-300 p-2 rounded"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        name="password"
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div className="text-red-500 text-sm">
                            {formik.errors.password}
                        </div>
                    )}
                    <p className="text-sm text-neutral-500 text-center">
                        Already have an account?
                    </p>
                    <button
                        type="submit"
                        className="w-full text-white py-2 rounded-l bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:translate-y-[-1px] transform transition-all duration-200 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800"
                    >
                        Login
                    </button>
                </form>

                {/* Google sign-in */}
                <div id="google-signup" className="text-center space-y-4 mt-6">
                    <p className="text-sm text-gray-400">
                        _______________________________or_________________________________
                    </p>
                    <div className="flex items-center justify-center space-x-3">
                        <img
                            src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                            alt="Google Signup"
                            className="w-8 h-8 cursor-pointer border border-gray-200 rounded-full"
                        />
                        <p className="text-sm text-gray-500">You Can Sign in using Google</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
