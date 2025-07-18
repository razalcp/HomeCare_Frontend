import { useState, useEffect } from 'react'
import { doctorApi } from 'src/utils/axios/axiosConfig';
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addDoctorData } from 'src/Redux/Slice/doctorSlice';


const DoctorLoginOtp = () => {
    const [expiryTime, setExpiryTime] = useState(() => {
        const savedTimer = localStorage.getItem('otp-timer');
        return savedTimer ? parseInt(savedTimer) : 120;
    })

    const [inputValue, setInputValue] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch();


    useEffect(() => {
        let countdown: NodeJS.Timeout;

        if (expiryTime > 0) {
            countdown = setInterval(() => {
                setExpiryTime((prevTimer) => {
                    if (prevTimer <= 1) {
                        clearInterval(countdown); // Clear interval when timer reaches 0
                        localStorage.removeItem('otp-timer');
                        return 0;
                    }
                    const newTimer = prevTimer - 1;
                    localStorage.setItem('otp-timer', newTimer.toString());
                    return newTimer;
                });
            }, 1000);
        }

        return () => clearInterval(countdown); // Cleanup on unmount or dependency change
    }, []); // Empty dependency array to ensure interval is set only once




    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };

    const handleResendOtp = async () => {
        console.log("resent otp handle")
        try {
            await doctorApi.get('/resendOtp')
            toast.success("OTP sent to your email. Please check it.");
            setExpiryTime(120)
            setInputValue("")
        } catch (error: any) {
            if (error.response.data.message === "OTP not sent") {
                toast.error("OTP not sent. We can't find your email.");
            } else {
                // console.log("Resend OTP error =>", error);
                toast.error("Something wrong please try again later.");
            }
        }


    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {


        setInputValue(e.target.value)

    }

    const handleClick = async (e: any) => {

        try {
            e.preventDefault()
            const response : any = await doctorApi.post('/verifyDoctorOtp', { enteredOtp: inputValue })

            const doctorData = response.data.doctorData
           
            dispatch(addDoctorData(doctorData))


            navigate('/doctorHome', { replace: true, state: { doctorData } })
        } catch (error: any) {
            console.log(error);

            if (error.response.data.message === "Incorrect OTP") {
                toast.error("Incorrect OTP.", { position: "top-center" });
                console.log("Incorrect OTPppp");

            } else if (error.response.data.message === "OTP expired") {
                toast.error("OTP has expired.", { position: "top-center" });
            } else {

                toast.error(error.response.data.message, { position: "top-center" });
            };
        }


    }

    return (
        <>
            <form action="submit" >
                <label htmlFor="Otp" className="text-white mb">OTP</label><br />
                <input onChange={handleChange}

                    type="text" placeholder='Enter your otp' name="otp" className="w-[25rem] h-10 mt-2 rounded placeholder:pl-3 placeholder:pt-2" /><br />


                <div className="flex flex-col items-center gap-2 mb-6 -ml-[155px] mt-7">

                    {expiryTime > 0 ? <span style={{
                        color: '#ff1744',
                        textShadow: '0 0 5px #ff1744, 0 0 10px #ff1744, 0 0 20px #ff1744',
                    }}>{`OTP will expire in  ${formatTime(expiryTime)}`}</span> : <button onClick={handleResendOtp} className="text-sm font-medium text-white hover:text-amber-500 transition-colors duration-200 border-4 px-4 py-2">
                        Resend code
                    </button>}



                </div>
                <p className="text-white mt-4 mb-4">Note: OTP will be expiring in 2 minutes.</p>
                <button className="text-white text-center  h-10 w-[25rem] bg-amber-500 rounded" onClick={handleClick}>Login</button>
            </form>

        </>

    )
}
export default DoctorLoginOtp;