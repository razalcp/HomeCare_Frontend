

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getMyBookings } from 'src/services/doctor/doctorapi';
import { getUserBookings } from 'src/services/user/userApi';
import userApi from 'src/utils/axios/axiosConfig';

const DoctorAppointments = () => {
    const doctorInfo = useSelector((state: any) => state.doctor.doctorInfo);
    // console.log("doc info",doctorInfo._id);
    
    const [bookings, setBookings] = useState<any[]>([]);

    useEffect(() => {
        async function getData() {
            try {
                const response = await getMyBookings(doctorInfo._id);
                console.log("doc side",response);
                
                setBookings(response as any); // Assuming response is the array of bookings
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        }
        if (doctorInfo?._id) getData();
    }, [doctorInfo]);

    const handleCancelBooking = async(bookingId: string) => {
        // You can call an API to cancel booking here
        const response= await userApi.post('/cancelBooking', { bookingId: bookingId })
        // console.log('Cancel booking for ID:', bookingId);
        // You may want to update the state or refetch data after cancellation
    };
    

    return (
        <div className="p-4">
            <h1 className="text-2xl md:text-3xl font-extrabold text-center text-customHeaderBlue mb-6">
                🗓️ My Appointments 
            </h1>

            <div className="overflow-x-auto">
                <table className="min-w-full border text-sm text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            {/* <th className="p-2 border">Doctor Image</th> */}
                            <th className="p-2 border">Doctor Name</th>
                            <th className="p-2 border">Date of Booking</th>
                            <th className="p-2 border">Appointment Date</th>
                            <th className="p-2 border">Time</th>
                            <th className="p-2 border">Payment Status</th>
                      
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length > 0 ? (
                            bookings.map((booking: any, index: number) => (
                                <tr key={index} className="border hover:bg-gray-50">
                                {/* <td className="p-2 border">
                                    <img
                                        src={booking?.doctorId?.profileImage}
                                        alt="Doctor"
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                </td> */}
                                <td className="p-2 border">{booking?.userId?.name}</td>
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

export default DoctorAppointments;
