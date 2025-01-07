import React, { useState, useEffect } from "react";
import userApi from "src/utils/axios/axiosConfig";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner'
import otpback from '../../../public/otpback.jpg'

const OTPVerification: React.FC = () => {
  const [success, setSuccess] = useState(false)
  const [expiryTime, setExpiryTime] = useState(() => {
    const savedTimer = localStorage.getItem('otp-timer');
    return savedTimer ? parseInt(savedTimer) : 120;
  }

  )
  const [otp, setOtp] = useState<string[]>(Array(4).fill(""));
  // useEffect(()=>{
  //   if(success){

  //     navigate('/login')
  //   }
  // }),[success]


  useEffect(() => {
    let countdown: NodeJS.Timeout;
    if (expiryTime > 0) {
      countdown = setInterval(() => {
        setExpiryTime((prevTimer) => {
          const newTimer = prevTimer - 1;
          localStorage.setItem('otp-timer', newTimer.toString());
          return newTimer;
        });
      }, 1000);
      //  return ()=> clearInterval(countdown);
    } else {
      localStorage.removeItem('otp-timer');
    }
    return () => clearInterval(countdown);
  }, [expiryTime]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };
  const navigate = useNavigate()

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log(otp.join(""));
    const enteredOtp = otp.join("")
    try {


      const response = await userApi.post('/verifyOtp', { enteredOtp: { enteredOtp } })
      // setSuccess(true)
      console.log(response)
      navigate('/login',{replace:true})

    } catch (error: any) {
      console.log(error);


      if (error.response.data.message === "Incorrect OTP") {
        toast.error("Incorrect OTP.", { position: "top-center" });
        console.log("Incorrect OTPppp");

      } else if (error.response.data.message === "OTP expired") {
        toast.error("OTP has expired.", { position: "top-center" });
      } else {
        console.log("OTP verification error =>", error);
        toast.error("OTP has expired.", { position: "top-center" });
      };
    };
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (newOtp[index] !== "") {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        const prevInput = document.getElementById(`otp-${index - 1}`);
        if (prevInput) {
          (prevInput as HTMLInputElement).focus();
          newOtp[index - 1] = "";
          setOtp(newOtp);
        }
      }
    }
  };


  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (/^[0-9]$/.test(event.key)) {
      if (index < otp.length - 1) {
        const prevInput = document.getElementById(`otp-${index + 1}`);
        if (prevInput) {
          (prevInput as HTMLInputElement).focus();
        }
      }
    }
  };

  const handleResendOtp = async () => {
    try {
      await userApi.get('/resendOtp')
      toast.success("OTP sent to your email. Please check it.");
      setExpiryTime(120)
      setOtp(["", "", "", ""]);
    } catch (error: any) {
      if (error.response.data.message === "OTP not sent") {
        toast.error("OTP not sent. We can't find your email.");
      } else {
        console.log("Resend OTP error =>", error);
        toast.error("Something wrong please try again later.");
      }
    }


  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center min-h-screen w-full p-4 dark:from-gray-900 dark:to-gray-800 " style={{
      backgroundImage: `url(${otpback})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      <div className="w-full max-w-sm px-6 py-8 bg-white rounded-2xl shadow-lg dark:bg-gray-900 dark:text-gray-200 transform transition-all duration-300 hover:shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-teal-500 to-indigo-600 bg-clip-text text-transparent">
          Verify Code
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm text-center mb-6">
          Enter the code{" "}
          <span className="font-medium text-gray-800 dark:text-gray-200">
            send to your e-mail
          </span>
        </p>
        <div className="grid grid-cols-4 gap-x-3 mb-6">
          {[0, 1, 2, 3].map((_, index) => (
            <input
              key={index}
              type="text"
              id={`otp-${index}`}
              maxLength={1}
              value={otp[index]}
              className="w-12 h-12 text-center text-lg font-semibold rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-200 outline-none transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400"
              aria-label={`Digit ${index + 1}`}
              onChange={(e) => {
                if (/^[0-9]$/.test(e.target.value)) {
                  const newOTP = [...otp];
                  newOTP[index] = e.target.value;
                  setOtp(newOTP);
                }
              }}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onKeyUp={(e) => handleKeyUp(e, index)}

            />
          ))}
        </div>
        <div className="flex flex-col items-center gap-2 mb-6">
          <div>

            {expiryTime > 0 ? <span style={{
              color: '#ff1744',
              textShadow: '0 0 5px #ff1744, 0 0 10px #ff1744, 0 0 20px #ff1744',
            }}>{`OTP will expire in  ${formatTime(expiryTime)}`}</span> : <button onClick={handleResendOtp} className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200">
              Resend code
            </button>}


          </div>
        </div>
        <button
          className="w-full flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:translate-y-[-1px] transform transition-all duration-200 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800"
          onClick={handleSubmit}>
          Verify Code
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;
