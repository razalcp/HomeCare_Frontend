

// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { getMyBookings } from 'src/services/doctor/doctorapi';
// import { getUserBookings } from 'src/services/user/userApi';
// import userApi from 'src/utils/axios/axiosConfig';

// const DoctorAppointments = () => {
//     const doctorInfo = useSelector((state: any) => state.doctor.doctorInfo);
//     // console.log("doc info",doctorInfo._id);
    
//     const [bookings, setBookings] = useState<any[]>([]);

//     useEffect(() => {
//         async function getData() {
//             try {
//                 const response = await getMyBookings(doctorInfo._id);
//                 console.log("doc side",response);
                
//                 setBookings(response as any); // Assuming response is the array of bookings
//             } catch (error) {
//                 console.error('Error fetching bookings:', error);
//             }
//         }
//         if (doctorInfo?._id) getData();
//     }, [doctorInfo]);

//     const handleCancelBooking = async(bookingId: string) => {
//         // You can call an API to cancel booking here
//         const response= await userApi.post('/cancelBooking', { bookingId: bookingId })
//         // console.log('Cancel booking for ID:', bookingId);
//         // You may want to update the state or refetch data after cancellation
//     };
    

//     return (
//         <div className="p-4">
//             <h1 className="text-2xl md:text-3xl font-extrabold text-center text-customHeaderBlue mb-6">
//                 🗓️ My Appointments 
//             </h1>

//             <div className="overflow-x-auto">
//                 <table className="min-w-full border text-sm text-left">
//                     <thead className="bg-gray-100">
//                         <tr>
//                             {/* <th className="p-2 border">Doctor Image</th> */}
//                             <th className="p-2 border">Doctor Name</th>
//                             <th className="p-2 border">Date of Booking</th>
//                             <th className="p-2 border">Appointment Date</th>
//                             <th className="p-2 border">Time</th>
//                             <th className="p-2 border">Payment Status</th>
                      
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {bookings.length > 0 ? (
//                             bookings.map((booking: any, index: number) => (
//                                 <tr key={index} className="border hover:bg-gray-50">
//                                 {/* <td className="p-2 border">
//                                     <img
//                                         src={booking?.doctorId?.profileImage}
//                                         alt="Doctor"
//                                         className="w-12 h-12 rounded-full object-cover"
//                                     />
//                                 </td> */}
//                                 <td className="p-2 border">{booking?.userId?.name}</td>
//                                 <td className="p-2 border">
//                                     {new Date(booking?.createdAt).toLocaleDateString()}
//                                 </td>
//                                 <td className="p-2 border">
//                                     {new Date(booking?.slotId.date).toLocaleDateString()}
//                                 </td>
//                                 <td className="p-2 border">
//                                     {booking?.slotId?.startTime} - {booking?.slotId?.endTime}
//                                 </td>
//                                 <td className="p-2 border capitalize text-green-600 font-medium">
//                                     {booking?.paymentStatus}
//                                 </td>
                              
//                             </tr>
                            
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan={5} className="p-4 text-center text-gray-500">
//                                     No bookings found.
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default DoctorAppointments;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getMyBookings } from 'src/services/doctor/doctorapi';
import userApi from 'src/utils/axios/axiosConfig';

const DoctorAppointments = () => {
    const doctorInfo = useSelector((state: any) => state.doctor.doctorInfo);
    const [bookings, setBookings] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const bookingsPerPage = 6; // Number of bookings to display per page

    useEffect(() => {
        async function getData() {
            try {
                const response = await getMyBookings(doctorInfo._id);
                console.log("doc side", response);
                setBookings(response as any); // Assuming response is the array of bookings
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        }
        if (doctorInfo?._id) getData();
    }, [doctorInfo]);

    const handleCancelBooking = async (bookingId: string) => {
        const response = await userApi.post('/cancelBooking', { bookingId: bookingId });
        // You may want to update the state or refetch data after cancellation
    };

    // Get the current page's bookings
    const currentBookings = bookings.slice(
        (currentPage - 1) * bookingsPerPage,
        currentPage * bookingsPerPage
    );

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Total number of pages
    const totalPages = Math.ceil(bookings.length / bookingsPerPage);

    return (
        <div className="p-4">
            <h1 className="text-2xl md:text-3xl font-extrabold text-center text-customHeaderBlue mb-6">
                🗓️ My Appointments
            </h1>

            <div className="overflow-x-auto">
                <table className="min-w-full border text-sm text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">Doctor Name</th>
                            <th className="p-2 border">Date of Booking</th>
                            <th className="p-2 border">Appointment Date</th>
                            <th className="p-2 border">Time</th>
                            <th className="p-2 border">Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentBookings.length > 0 ? (
                            currentBookings.map((booking: any, index: number) => (
                                <tr key={index} className="border hover:bg-gray-50">
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

            {/* Pagination Controls - Only show if more than 1 page */}
            {totalPages > 1 && (
                <div className="mt-4 text-center">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 mx-2 bg-gray-300 text-gray-700 rounded"
                    >
                        Previous
                    </button>
                    <span className="mx-2">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 mx-2 bg-gray-300 text-gray-700 rounded"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default DoctorAppointments;
