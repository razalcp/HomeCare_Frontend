import docApp from 'src/assets/docApp.png'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { doctorApi } from 'src/utils/axios/axiosConfig'
import DocOtp from './DocOtp'
import { useState } from 'react'
const DocRegister = () => {
    const [OtpStatus, setOtpStatus] = useState(false)
    const savedTimer = localStorage.getItem('otp-timer');
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

                console.log(values);
                const response: any = await doctorApi.post('/register', values)
                setOtpStatus(true)

            } catch (error: any) {

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
                <h3 className="text-white mt-6">Millions of patients are looking for the right doctor on HomeCare. Start your <br /> digital journey with HomeCare Profile </h3>
                <p className="text-white mt-4 mb-4">Let’s take the first step and create your account:</p>

                {OtpStatus|| savedTimer ? <DocOtp /> : <>       <form action="" onSubmit={formik.handleSubmit}>
                    <label htmlFor="email" className="text-white mb">Email</label><br />
                    <input value={formik.values.email}
                        onChange={formik.handleChange}
                        type="email" placeholder='Enter your email' name="email" className="w-[25rem] h-10 mt-2 rounded placeholder:pl-3 placeholder:pt-2" /><br />
                    {formik.touched.email && formik.errors.email && (
                        <div className="text-red-500 text-sm">
                            {formik.errors.email}
                        </div>
                    )}
                    <p className="text-white mt-4 mb-4">Note: OTP will be sent to this number for verification.</p>
                    <button className="text-white text-center  h-10 w-[25rem] bg-amber-500 rounded">Submit</button>

                </form>
                    <h6 className="text-white mt-4 text-sm">If you already have an account. Please <span className='text-amber-500 text-sm'>login</span> here.</h6></>}

            </div>
            <div id="right-section">
                <img src={docApp} alt="Image Here" className="py-20 px-14" />
            </div>
        </div>
    )
}

export default DocRegister