// "use client"

// import { useState, useEffect } from "react"
// import { Calendar, Heart, MessageSquare, Video } from "lucide-react"
// import { useLocation } from "react-router-dom"

// import { fetchDoctorSlots } from "src/services/doctor/doctorapi"
// // Utility function to conditionally join classNames (replacement for cn)
// const classNames = (...classes: (string | boolean | undefined)[]) => {
//   return classes.filter(Boolean).join(" ")
// }

// export default function AppointmentBooking() {
//   const [selectedDate, setSelectedDate] = useState(0)
//   const [selectedTime, setSelectedTime] = useState<string | null>(null)
//   const [consultationType, setConsultationType] = useState("direct")
//   const location = useLocation()
//   const { doctorId, doctor } = location.state
//   // console.log(doctor);
//   console.log(doctorId);


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const docData = await fetchDoctorSlots(doctorId);
//         console.log("This is doc slots fetched",docData.data); // Handle the response data as needed
//         const docArray=docData.data
//       } catch (error) {
//         console.error("Error fetching doctor and appointments:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const dates = [
//     { day: 13, weekday: "Monday" },
//     { day: 14, weekday: "Tuesday" },
//     { day: 15, weekday: "Wednesday" },
//     { day: 16, weekday: "Thursday" },
//     { day: 17, weekday: "Friday" },
//   ]

//   const timeSlots = ["9:00 Am", "9:00 Am", "9:00 Am"]

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
//       <h1 className="text-2xl font-bold mb-6">Book Appointment</h1>

//       {/* Doctor Profile */}
//       <div className="flex flex-col sm:flex-row gap-4 mb-8">
//         <div className="w-32 h-32 relative rounded-lg overflow-hidden">
//           <img src={doctor.profileImage} alt="Dr David Goggios" className="object-cover w-full h-full" />
//         </div>
//         <div className="flex flex-col justify-center">
//           <div className="flex items-center gap-2 mb-1">
//             <Heart className="w-5 h-5 text-red-500" />
//             {doctor.departments.map((dept: any,index: number) => <span  key={index}  className="font-medium">{dept}</span>)}

//           </div>
//           <h2 className="text-lg font-bold">Dr {doctor.name}</h2>
//           <p className="text-gray-700">{doctor.degree}, {doctor.institution}</p>
//           {/* <p className="text-gray-700">MDS - Cardiology And Oral</p> */}
//         </div>
//       </div>

//       {/* Date Selection */}
//       <div className="mb-8">
//         <h3 className="text-lg font-medium mb-4">Schedule A Time</h3>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
//           {dates.map((date, index) => (
//             <button
//               key={index}
//               onClick={() => setSelectedDate(index)}
//               className={classNames(
//                 "p-3 rounded-lg border text-center transition-colors",
//                 selectedDate === index
//                   ? "bg-blue-500 text-white border-blue-500"
//                   : "bg-white hover:bg-gray-50 border-gray-200",
//               )}
//             >
//               <div className="font-medium">August 2024</div>
//               <div className="text-xl font-bold">{date.day}</div>
//               <div>{date.weekday}</div>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Time Slots */}
//       <div className="mb-8">
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
//           {Array(5)
//             .fill(0)
//             .map((_, rowIndex) =>
//               timeSlots.map((time, colIndex) => {
//                 const timeSlotIndex = `${rowIndex}-${colIndex}`
//                 return (
//                   <button
//                     key={timeSlotIndex}
//                     onClick={() => setSelectedTime(timeSlotIndex)}
//                     className={classNames(
//                       "py-2 px-4 rounded-lg border text-center transition-colors",
//                       selectedTime === timeSlotIndex
//                         ? "bg-blue-500 text-white border-blue-500"
//                         : rowIndex === 0 && colIndex === 0
//                           ? "bg-blue-500 text-white border-blue-500"
//                           : "bg-white hover:bg-gray-50 border-gray-200",
//                     )}
//                   >
//                     {time}
//                   </button>
//                 )
//               }),
//             )}
//         </div>
//       </div>




//       {/* Proceed Button */}
//       <div className="flex justify-end">
//         <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg transition-colors">
//           Proceed To Pay
//         </button>
//       </div>
//     </div>
//   )
// }


/////////////////


"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { Navigate, useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { fetchDoctorSlots } from "src/services/doctor/doctorapi"
import { loadStripe } from '@stripe/stripe-js';
import userApi from "src/utils/axios/axiosConfig"
import { walletBooking } from "src/services/user/userApi"
import { toast } from "sonner"
import Notiflix from "notiflix"
const classNames = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ")
}

export default function AppointmentBooking() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [docArray, setDocArray] = useState<any[]>([])

  const location = useLocation()
  const { doctorId, doctor } = location.state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docData = await fetchDoctorSlots(doctorId);
        setDocArray(docData.data)
      } catch (error) {
        console.error("Error fetching doctor slots:", error);
      }
    }
    fetchData();
  }, [doctorId])
  const navigate = useNavigate()
  // const uniqueDates = [...new Set(docArray.map(slot => slot.date))]
  const uniqueDates = [...new Set(
    docArray
      .map(slot => slot.date)
      .filter(date => new Date(date) >= new Date(new Date().toDateString()))
  )]

  // const availableTimeSlots = docArray.filter(slot => slot.date === selectedDate)
  const availableTimeSlots = docArray.filter(
    slot => slot.date === selectedDate && slot.isBooked === false
  )

  // const makeWalletPayment = async () => {
  //   try {
  //     if (!selectedDate || !selectedTime) {
  //       console.error("Please select a date and time before proceeding to payment.");
  //       return;
  //     }
  //     const userInfoString = localStorage.getItem("userInfo");
  //     const userInfo = userInfoString ? JSON.parse(userInfoString) : null;// Get user info (modify as per your auth system)
  //     if (!userInfo) {
  //       console.error("User not logged in.");
  //       return;
  //     }
  //     const selectedSlot = docArray.find(slot => slot.date === selectedDate && slot.startTime === selectedTime);
  //     if (!selectedSlot) {
  //       console.error("Selected slot not found.");
  //       return;
  //     }
  //     const body = {
  //       doctorId: doctorId,
  //       doctorFees: doctor.consultationFee,
  //       userId: userInfo._id,
  //       slotId: selectedSlot._id
  //     };

  //     const response: any = await walletBooking(body as any)


  //     if (response?.data == "Wallet Booking Successful") {
  //       navigate('/success')
  //     }
  //   } catch (error: any) {
  //     console.log(error.message);
  //     if (error.message === 'Insufficient Wallet Balance') {
  //       Notiflix.Notify.failure("Insufficient Wallet Balance");
  //     }
  //   }

  // }


  const makeWalletPayment = async () => {
    try {
      if (!selectedDate || !selectedTime) {
        console.error("Please select a date and time before proceeding to payment.");
        return;
      }

      const userInfoString = localStorage.getItem("userInfo");
      const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
      if (!userInfo) {
        console.error("User not logged in.");
        return;
      }

      const selectedSlot = docArray.find(
        slot => slot.date === selectedDate && slot.startTime === selectedTime
      );
      if (!selectedSlot) {
        console.error("Selected slot not found.");
        return;
      }

      // Show confirmation popup before proceeding
      Notiflix.Confirm.show(
        'Confirm Payment',
        `Are you sure you want to pay ₹${doctor.consultationFee} to book this slot?`,
        'Yes, Pay Now',
        'Cancel',
        async function okCb() {
          // Proceed with booking
          const body = {
            doctorId: doctorId,
            doctorFees: doctor.consultationFee,
            userId: userInfo._id,
            slotId: selectedSlot._id,
          };

          const response: any = await walletBooking(body as any);
          console.log("response", response);

          if (response?.data === "Wallet Booking Successful") {
            Notiflix.Notify.success("Wallet Booking Successful!");
            setTimeout(() => {
              navigate('/success');
            }, 1500); // 1500ms delay for user to see the toast
          } else {
            Notiflix.Notify.failure("Booking failed. Please try again.");
          }
        },
        function cancelCb() {
          Notiflix.Notify.info("Payment using wallet cancelled.");
        }
      );
    } catch (error: any) {
      console.log(error.message);
      if (error.message === 'Insufficient Wallet Balance') {
        Notiflix.Notify.failure("Insufficient Wallet Balance");
      } else {
        Notiflix.Notify.failure("Something went wrong. Please try again.");
      }
    }
  };


  const makePayment = async () => {
    const stripe = await loadStripe(process.env.STRIPE_PUBLISHABLE_KEY as string);
    if (!selectedDate || !selectedTime) {
      console.error("Please select a date and time before proceeding to payment.");
      return;
    }
    const userInfoString = localStorage.getItem("userInfo");
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;// Get user info (modify as per your auth system)
    if (!userInfo) {
      console.error("User not logged in.");
      return;
    }

    // Find the selected slot object from docArray
    const selectedSlot = docArray.find(slot => slot.date === selectedDate && slot.startTime === selectedTime);

    if (!selectedSlot) {
      console.error("Selected slot not found.");
      return;
    }

    const body = {
      doctorId: doctorId,
      doctorName: doctor.name,
      doctorImage: doctor.profileImage,
      doctorFees: doctor.consultationFee,
      selectedDate: selectedDate,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
      selectedSlot: selectedSlot,
      userInfo: userInfo,
      slotId: selectedSlot._id
    };
    const headers = {
      "Content-Type": "application/json"
    }

    const response = await userApi.post("/create-checkout-session", body, {
      headers: headers,
    });
    // console.log("stripe response", response?.data?.id);


    // console.log("stripe session",session);

    const result = stripe?.redirectToCheckout({
      sessionId: response?.data?.id
    })
    if (result?.error) {
      console.log(result?.error);

    }

  };



  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Book Appointment</h1>

      {/* Doctor Profile */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="w-32 h-32 relative rounded-lg overflow-hidden">
          <img src={doctor.profileImage} alt="Doctor" className="object-cover w-full h-full" />
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-1">
            <Heart className="w-5 h-5 text-red-500" />
            {doctor.departments.map((dept: any, index: number) => (
              <span key={index} className="font-medium">{dept}</span>
            ))}
          </div>
          <h2 className="text-lg font-bold">Dr {doctor.name}</h2>
          <p className="text-gray-700">{doctor.degree}, {doctor.institution}</p>
        </div>
      </div>

      {/* Date Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Schedule A Time</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {uniqueDates.map((date, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedDate(date)
                setSelectedTime(null)
              }}
              className={classNames(
                "p-3 rounded-lg border text-center transition-colors",
                selectedDate === date
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white hover:bg-gray-50 border-gray-200",
              )}
            >
              <div className="font-bold">{new Date(date).toLocaleDateString("en-GB")}</div>
              <div>{new Date(date).toLocaleDateString("en-US", { weekday: "long" })}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Available Time Slots</h3>
          {availableTimeSlots.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {availableTimeSlots.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedTime(slot.startTime)}
                  className={classNames(
                    "py-2 px-4 rounded-lg border text-center transition-colors",
                    selectedTime === slot.startTime
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white hover:bg-gray-50 border-gray-200",
                  )}
                >
                  {slot.startTime} - {slot.endTime}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No available slots for this date.</p>
          )}
        </div>
      )}

      {/* Proceed Button */}
      <div className="flex justify-end space-x-4">
        <button
          disabled={!selectedDate || !selectedTime}
          className={classNames(
            "py-3 px-6 rounded-lg transition-colors",
            selectedDate && selectedTime
              ? "bg-orange-400 hover:bg-orange-500 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          )}
          onClick={makeWalletPayment}>
          Pay by Wallet
        </button>
        <button
          disabled={!selectedDate || !selectedTime}
          className={classNames(
            "py-3 px-6 rounded-lg transition-colors",
            selectedDate && selectedTime
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          )}
          onClick={makePayment}>
          Pay Online
        </button>
      </div>

    </div>
  )
}
