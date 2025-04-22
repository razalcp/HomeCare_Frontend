

import Notiflix from 'notiflix';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { getUserBookings } from 'src/services/user/userApi';
import userApi from 'src/utils/axios/axiosConfig';

const BookingHistory = () => {
    const userInfo = useSelector((state: any) => state.user.userInfo);
    const [bookings, setBookings] = useState<any[]>([]);
    const [status, setStatus] = useState(true)
    useEffect(() => {
        async function getData() {
            try {
                const response = await getUserBookings(userInfo._id);
                setBookings(response as any); // Assuming response is the array of bookings
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        }
        if (userInfo?._id) getData();
    }, [userInfo, status]);

    // const handleCancelBooking = async (bookingId: string) => {
    //     try {
    //         const response = await userApi.post('/cancelBooking', { bookingId: bookingId })
    //         // console.log('Cancel booking for ID:', bookingId);
    //         console.log(response?.data?.message);
    //         if (response.data.message === "Booking Cancelled Successfully") {
    //             setStatus(prev => !prev);

    //             toast.success("Booking Cancelled Successfully!");
    //         }
    //         // You may want to update the state or refetch data after cancellation

    //     } catch (error: any) {
    //         toast.error(error.response?.data?.message || "Something went wrong")
    //     }
    //     // You can call an API to cancel booking here
    // }
    interface CancelBookingResponse {
        message: string;
      }
    const handleCancelBooking = (bookingId: string) => {
        Notiflix.Confirm.show(
            'Cancel Booking',
            'Are you sure you want to cancel this booking?',
            'Yes',
            'No',
            async () => {
                try {
                    const response = await userApi.post<CancelBookingResponse>('/cancelBooking', { bookingId });
                    if (response.data.message === "Booking Cancelled Successfully") {
                        setStatus(prev => !prev);
                        toast.success("Booking Cancelled Successfully!");
                    }
                } catch (error: any) {
                    toast.error(error.response?.data?.message || "Something went wrong");
                }
            },
            () => {
                // ❌ User clicked "No"
                console.log('User cancelled the confirmation dialog');
            }
        );
    };


    return (
        <div className="p-4">
            <h1 className="text-2xl md:text-3xl font-extrabold text-center text-customHeaderBlue mb-6">
                🗓️ Booking History
            </h1>

            <div className="overflow-hidden whitespace-nowrap mb-4">
                <div className="inline-block animate-marquee text-sm text-blue-600 font-semibold">
                    ⚠️ You can cancel bookings only if more than 3 hours are left for the consultation. No cancellation allowed after that.
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border text-sm text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">Doctor Image</th>
                            <th className="p-2 border">Doctor Name</th>
                            <th className="p-2 border">Date of Booking</th>
                            <th className="p-2 border">Appointment Date</th>
                            <th className="p-2 border">Time</th>
                            <th className="p-2 border">Payment Status</th>
                            <th className="p-2 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length > 0 ? (
                            bookings.map((booking: any, index: number) => (
                                <tr key={index} className="border hover:bg-gray-50">
                                    <td className="p-2 border">
                                        <img
                                            src={booking?.doctorId?.profileImage}
                                            alt="Doctor"
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                    </td>
                                    <td className="p-2 border">{booking?.doctorId?.name}</td>
                                    <td className="p-2 border">
                                        {new Date(booking?.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-2 border">
                                        {new Date(booking?.slotId.date).toLocaleDateString()}
                                    </td>
                                    <td className="p-2 border">
                                        {booking?.slotId?.startTime} - {booking?.slotId?.endTime}
                                    </td>
                                    <td className="p-2 border capitalize text-green-600 font-medium">
                                        {booking?.paymentStatus}
                                    </td>
                                    <td className="p-2 border">

                                        {(() => {
                                            const [hour, minute] = booking?.slotId?.startTime.split(':');
                                            const appointmentDate = new Date(booking.slotId.date); // "YYYY-MM-DD"
                                            appointmentDate.setHours(parseInt(hour), parseInt(minute), 0, 0);

                                            const now = new Date();
                                            const diffInMs = appointmentDate.getTime() - now.getTime();
                                            const diffInHours = diffInMs / (1000 * 60 * 60);
                                            // console.log("diffInHours", diffInHours);

                                            if (diffInHours > 3) {
                                                return (
                                                    <button
                                                        className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
                                                        onClick={() => handleCancelBooking(booking._id)}
                                                    >
                                                        Cancel Booking
                                                    </button>
                                                );
                                            } else {
                                                return (
                                                    <span className="text-xs text-gray-500">
                                                        Booking Confirmed – No Cancellation available
                                                    </span>
                                                );
                                            }
                                        })()}

                                    </td>
                                </tr>

                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="p-4 text-center text-gray-500">
                                    No bookings found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookingHistory;
