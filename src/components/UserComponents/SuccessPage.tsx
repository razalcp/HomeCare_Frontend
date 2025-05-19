import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { saveBooking } from "src/services/user/userApi";

export default function SuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
 

    const query = new URLSearchParams(location.search);
    const slotId = query.get("slotId");
    const userId = query.get("userId");
    const doctorId = query.get("doctorId");


    // console.log(slotId, userId, doctorId);
    if (slotId && userId && doctorId) {
      async function callSaveBooking() {
        await saveBooking(slotId as string, userId as string, doctorId as string)
      }
      callSaveBooking()
    }
  }, [location.search]);
  // useEffect(() => {
  //   // Redirect after 5 seconds
  //   const timer = setTimeout(() => navigate("/"), 5000);
  //   return () => clearTimeout(timer);
  // }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-green-600">Payment Successful 🎉</h1>
      <p className="mt-4 text-gray-700">Your appointment has been booked successfully!</p>
      <button
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={() => navigate("/")}
      >
        Go to Home
      </button>
    </div>
  );
}
