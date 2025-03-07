import docApp from 'src/assets/docApp.png'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { doctorApi } from 'src/utils/axios/axiosConfig'

import DoctorLoginOtp from './DoctorLoginOtp'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'


const DoctorLogin = () => {
    const [OtpStatus, setOtpStatus] = useState(false)
    // const savedTimer = localStorage.getItem('otp-timer');
    let savedTimer;
    useEffect(() => {
        savedTimer = localStorage.getItem("otp-timer")
        if (!OtpStatus && savedTimer) {
            localStorage.removeItem("otp-timer")
        }
    }, [OtpStatus])
    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email address")
            .matches(/^([a-zA-Z][a-zA-Z0-9._-]*)@(gmail\.com|yahoo\.com|outlook\.com)$/, "Invalid email format")
            .required("Email is required"),
    })

    const formik = useFormik({
        initialValues: {
            email: "",

        },
        validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values: { email: string }) => {
            try {
                // console.log("Inside doctor register formik's onSubmit");

                // console.log(values);
                const response: any = await doctorApi.post('/doctorLogin', values)
                

                setOtpStatus(true)

            } catch (error: any) {
                // console.log(error.response.data.message);
                
                if (error.response && error.response.data.message === "Email not Registered") {
                    toast.error("Email not registered", { position: "top-center" });
                } else if (error.response && error.response.data.message === "Your Kyc Verification is Rejected") {
                    toast.error("Your Kyc Verification is Rejected", { position: "top-center" });

                } else if (error.response && error.response.data.message === "Your Kyc Request is Under Review. Please Wait for Conformation Email") {
                    toast.error("Your Kyc Request is Under Review. Please Wait for Conformation Email", { position: "top-center" });

                }
                else {
                    // console.error("login error => ", error);
                    toast.error("Something went wrong, please try again later.", { position: "top-center" });
                }
            }
        }
    })


    return (
        <div id="register-body" className="bg-customBlueDoctor w-full h-screen flex">
            <div id="left-section" className="py-20 ml-36">
                <h1 className="text-white text-4xl font-bold font-sans">
                    Patients are looking for <br />
                    doctors like you
                </h1>
                <h3 className="text-white mt-6">Millions of patients are looking for the right doctor on HomeCare. Start your <br /> digital journey with HomeCare Service </h3>
                <p className="text-white mt-4 mb-4"><span className='text-amber-500 text-sm'>login</span> now to provide your seamless service to the public .</p>

                {OtpStatus || savedTimer ? <DoctorLoginOtp /> : <>       <form action="" onSubmit={formik.handleSubmit}>
                    <label htmlFor="email" className="text-white mb">Email</label><br />
                    <input value={formik.values.email}
                        onChange={formik.handleChange}
                        type="email" placeholder='Enter your email' name="email" className="w-[25rem] h-10 mt-2 rounded placeholder:pl-3 placeholder:pt-2" /><br />
                    {formik.touched.email && formik.errors.email && (
                        <div className="text-red-500 text-sm">
                            {formik.errors.email}
                        </div>
                    )}
                    <p className="text-white mt-4 mb-4">Note: OTP will be sent to registered e-mail for verification.</p>
                    <button type="submit" className="text-white text-center  h-10 w-[25rem] bg-amber-500 rounded">Submit</button>

                </form>
                    {/* <h6 className="text-white mt-4 text-sm">If you already have an account. Please <span className='text-amber-500 text-sm'>login</span> here.</h6> */}
                </>
                }

            </div>
            <div id="right-section">
                <img src={docApp} alt="Image Here" className="py-20 px-14" />
            </div>
        </div>
    )
}

export default DoctorLogin