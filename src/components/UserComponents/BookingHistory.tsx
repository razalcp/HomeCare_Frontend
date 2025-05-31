
// import Notiflix from 'notiflix';
// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { toast } from 'sonner';
// import { getUserBookings } from 'src/services/user/userApi';
// import userApi from 'src/utils/axios/axiosConfig';

// const BookingHistory = () => {
//     const userInfo = useSelector((state: any) => state.user.userInfo);
//     const [bookings, setBookings] = useState<any[]>([]);
//     const [status, setStatus] = useState(true);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const bookingsPerPage = 5;

//     useEffect(() => {
//         async function getData() {
//             try {
//                 const response = await getUserBookings(userInfo._id);
//                 console.log("booking details", response);

//                 setBookings(response as any); // Assuming response is the array of bookings
//             } catch (error) {
//                 console.error('Error fetching bookings:', error);
//             }
//         }
//         if (userInfo?._id) getData();
//     }, [userInfo, status]);
//     const openModal = (booking: any) => {
//         setSelectedBooking(booking);
//         setIsModalOpen(true);
//     };

//     const closeModal = () => {
//         setIsModalOpen(false);
//         setSelectedBooking(null);
//     };

//     const indexOfLastBooking = currentPage * bookingsPerPage;
//     const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
//     const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);
//     const totalPages = Math.ceil(bookings.length / bookingsPerPage);

//     interface CancelBookingResponse {
//         message: string;
//     }

//     const handleCancelBooking = (bookingId: string) => {
//         Notiflix.Confirm.show(
//             'Cancel Booking',
//             'Are you sure you want to cancel this booking?',
//             'Yes',
//             'No',
//             async () => {
//                 try {
//                     const response = await userApi.post<CancelBookingResponse>('/cancelBooking', { bookingId });
//                     if (response.data.message === "Booking Cancelled Successfully") {
//                         setStatus(prev => !prev);
//                         toast.success("Booking Cancelled Successfully!");
//                     }
//                 } catch (error: any) {
//                     toast.error(error.response?.data?.message || "Something went wrong");
//                 }
//             },
//             () => {
//                 // ❌ User clicked "No"
//                 console.log('User cancelled the confirmation dialog');
//             }
//         );
//     };

//     return (
//         <div className="p-4">
//             <h1 className="text-2xl md:text-3xl font-extrabold text-center text-customHeaderBlue mb-6">
//                 🗓️ Booking History
//             </h1>

//             <div className="overflow-hidden whitespace-nowrap mb-4">
//                 <div className="inline-block animate-marquee text-sm text-blue-600 font-semibold">
//                     ⚠️ You can cancel bookings only if more than 3 hours are left for the consultation. No cancellation allowed after that.
//                 </div>
//             </div>

//             <div className="overflow-x-auto">
//                 <table className="min-w-full border text-sm text-left">
//                     <thead className="bg-gray-100">
//                         <tr>
//                             <th className="p-2 border">Doctor Image</th>
//                             <th className="p-2 border">Doctor Name</th>
//                             <th className="p-2 border">Date of Booking</th>
//                             <th className="p-2 border">Appointment Date</th>
//                             <th className="p-2 border">Time</th>
//                             <th className="p-2 border">Payment Status</th>
//                             <th className="p-2 border">Action</th>
//                             <th className="p-2 border">Details</th>

//                         </tr>
//                     </thead>
//                     <tbody>
//                         {currentBookings.length > 0 ? (
//                             currentBookings.map((booking: any, index: number) => (
//                                 <tr key={index} className="border hover:bg-gray-50">
//                                     <td className="p-2 border">
//                                         <img
//                                             src={booking?.doctorId?.profileImage}
//                                             alt="Doctor"
//                                             className="w-12 h-12 rounded-full object-cover"
//                                         />
//                                     </td>
//                                     <td className="p-2 border">{booking?.doctorId?.name}</td>
//                                     <td className="p-2 border">
//                                         {new Date(booking?.createdAt).toLocaleDateString()}
//                                     </td>
//                                     <td className="p-2 border">
//                                         {new Date(booking?.slotId.date).toLocaleDateString()}
//                                     </td>
//                                     <td className="p-2 border">
//                                         {booking?.slotId?.startTime} - {booking?.slotId?.endTime}
//                                     </td>

//                                     <td
//                                         className={`p-2 border capitalize font-medium ${booking?.paymentStatus === 'refunded'
//                                             ? 'text-orange-500'
//                                             : 'text-green-600'
//                                             }`}
//                                     >
//                                         {booking?.paymentStatus}
//                                     </td>


//                                     <td className="p-2 border">
//                                         <div className="flex items-center gap-2 flex-wrap">
//                                             {booking.bookingStatus === 'cancelled' ? (
//                                                 <span className="text-xs text-red-500 font-semibold">
//                                                     Booking Cancelled
//                                                 </span>
//                                             ) : (
//                                                 (() => {
//                                                     const [hour, minute] = booking?.slotId?.startTime.split(':');
//                                                     const appointmentDate = new Date(booking.slotId.date);
//                                                     appointmentDate.setHours(parseInt(hour), parseInt(minute), 0, 0);

//                                                     const now = new Date();
//                                                     const diffInMs = appointmentDate.getTime() - now.getTime();
//                                                     const diffInHours = diffInMs / (1000 * 60 * 60);

//                                                     return diffInHours > 3 ? (
//                                                         <button
//                                                             className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
//                                                             onClick={() => handleCancelBooking(booking._id)}
//                                                         >
//                                                             Cancel
//                                                         </button>
//                                                     ) : (
//                                                         <span className="text-xs text-gray-500">
//                                                             No Cancel
//                                                         </span>
//                                                     );
//                                                 })()
//                                             )}
//                                         </div>
//                                     </td>

//                                     <td className="p-2 border">
//                                         <button
//                                             className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded"
//                                             onClick={() => openModal(booking)}
//                                         >
//                                             Details
//                                         </button>
//                                     </td>




//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan={8} className="p-4 text-center text-gray-500" />


//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//                 {isModalOpen && selectedBooking && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                         <div className="relative bg-gradient-to-tl from-customCardBlue via-white to-customBlue p-6 rounded-lg w-[90%] max-w-md shadow-2xl transition-all duration-500 ease-in-out">

//                             {selectedBooking?.bookingStatus && (
//                                 <div className="absolute top-3 left-3 z-10">
//                                     <span
//                                         className={`inline-block px-3 py-1 text-xs font-bold rounded shadow ${selectedBooking.bookingStatus === 'booked'
//                                                 ? 'bg-green-600 text-white'
//                                                 : 'bg-red-500 text-white'
//                                             }`}
//                                     >
//                                         {selectedBooking.bookingStatus === 'booked' ? 'Booked' : 'Cancelled'}
//                                     </span>
//                                 </div>
//                             )}



//                             <button
//                                 className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl font-bold"
//                                 onClick={closeModal}
//                             >
//                                 ×
//                             </button>

//                             <div className="text-center">
//                                 <img
//                                     src={selectedBooking?.doctorId?.profileImage}
//                                     alt="Doctor"
//                                     className="w-24 h-24 rounded-full mx-auto mb-4 object-cover animate-bounce-once"
//                                 />
//                                 <h2 className="text-2xl font-bold text-rose-950 mb-4 tracking-wide">
//                                     Dr. {selectedBooking?.doctorId?.name}
//                                 </h2>
//                                 <p className="text-sm text-gray-600 font-medium text-center mb-6">
//                                     Your Consulting Specialist
//                                 </p>

//                                 <p className="capitalize mb-2"><strong>Booking Id:</strong> {selectedBooking?._id}</p>
//                                 <p className="mb-2"><strong>Consultation Date:</strong> {new Date(selectedBooking?.slotId?.date).toLocaleDateString()}</p>
//                                 <p className="mb-2"><strong>Consultation Time:</strong> {selectedBooking?.slotId?.startTime} - {selectedBooking?.slotId?.endTime}</p>
//                                 <p className="mb-2"><strong>Consultation Fee:</strong> ₹{selectedBooking?.doctorId?.consultationFee}</p>
//                                 <p className="mb-2"><strong>Consultation Type:</strong> {selectedBooking?.doctorId?.consultationType?.join(', ')}</p>

//                                 <hr className="my-3 border-t-2 border-gray-200" />

//                                 <p className="mb-2"><strong>Doctor Degree:</strong> {selectedBooking?.doctorId?.degree}</p>
//                                 <p className="mb-2"><strong>Department:</strong> {selectedBooking?.doctorId?.departments?.join(', ')}</p>
//                                 <p className="mb-2"><strong>Languages Known:</strong> {selectedBooking?.doctorId?.knownLanguages?.join(', ')}</p>

//                                 <p className="capitalize mb-2">
//                                     <strong>Payment Status:</strong>
//                                     <span
//                                         className={
//                                             selectedBooking?.paymentStatus === 'paid'
//                                                 ? 'text-green-600 font-semibold'
//                                                 : selectedBooking?.paymentStatus === 'refunded'
//                                                     ? 'text-orange-500 font-semibold'
//                                                     : ''
//                                         }
//                                     >
//                                         {selectedBooking?.paymentStatus}
//                                     </span>
//                                 </p>

//                                 <p className="capitalize mb-4">
//                                     <strong>Booking Status:</strong>
//                                     <span
//                                         className={
//                                             selectedBooking?.bookingStatus === 'booked'
//                                                 ? 'text-green-600 font-semibold'
//                                                 : selectedBooking?.bookingStatus === 'cancelled'
//                                                     ? 'text-red-500 font-semibold'
//                                                     : ''
//                                         }
//                                     >
//                                         {selectedBooking?.bookingStatus}
//                                     </span>
//                                 </p>

//                                 <p><strong>Booked On:</strong> {new Date(selectedBooking?.createdAt).toLocaleString()}</p>
//                             </div>
//                         </div>
//                     </div>
//                 )}


//             </div>

//             {/* Pagination Controls */}
//             {bookings.length > bookingsPerPage && (
//                 <div className="w-full flex justify-center gap-4 my-6">
//                     <button
//                         onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                         disabled={currentPage === 1}
//                         className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
//                     >
//                         Prev
//                     </button>
//                     <span className="px-4 py-2 font-medium text-gray-700">
//                         Page {currentPage} of {totalPages}
//                     </span>
//                     <button
//                         onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//                         disabled={currentPage === totalPages}
//                         className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
//                     >
//                         Next
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default BookingHistory;


///////////////////////////////////////////////////////////////////////////////////////

// import Notiflix from 'notiflix';
// import React, { useEffect, useRef, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { toast } from 'sonner';
// import { getPrescription, getUserBookings } from 'src/services/user/userApi';
// import userApi from 'src/utils/axios/axiosConfig';
// import html2pdf from 'html2pdf.js';
// import PrescriptionPDF from './PrescriptionPDF';
// const BookingHistory = () => {
//     const userInfo = useSelector((state: any) => state.user.userInfo);
//     const [bookings, setBookings] = useState<any[]>([]);
//     const [status, setStatus] = useState(true);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const bookingsPerPage = 5;
//     const printRef = useRef(null);
//     const [presData, setPresData] = React.useState(null);
//     useEffect(() => {
//         async function getData() {
//             try {
//                 const response = await getUserBookings(userInfo._id);
//                 console.log("booking details", response);

//                 setBookings(response as any); // Assuming response is the array of bookings
//             } catch (error) {
//                 console.error('Error fetching bookings:', error);
//             }
//         }
//         if (userInfo?._id) getData();
//     }, [userInfo, status]);

//     const openModal = (booking: any) => {
//         setSelectedBooking(booking);
//         setIsModalOpen(true);
//     };

//     const closeModal = () => {
//         setIsModalOpen(false);
//         setSelectedBooking(null);
//     };

//     const indexOfLastBooking = currentPage * bookingsPerPage;
//     const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
//     const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);
//     const totalPages = Math.ceil(bookings.length / bookingsPerPage);

//     interface CancelBookingResponse {
//         message: string;
//     }

//     const handleCancelBooking = (bookingId: string) => {
//         Notiflix.Confirm.show(
//             'Cancel Booking',
//             'Are you sure you want to cancel this booking?',
//             'Yes',
//             'No',
//             async () => {
//                 try {
//                     const response = await userApi.post<CancelBookingResponse>('/cancelBooking', { bookingId });
//                     if (response.data.message === "Booking Cancelled Successfully") {
//                         setStatus(prev => !prev);
//                         toast.success("Booking Cancelled Successfully!");
//                     }
//                 } catch (error: any) {
//                     toast.error(error.response?.data?.message || "Something went wrong");
//                 }
//             },
//             () => {
//                 // ❌ User clicked "No"
//                 console.log('User cancelled the confirmation dialog');
//             }
//         );
//     };


//     const handleDownloadPrescription = async (bookingId: string) => {
//         const data = await getPrescription(bookingId);



//     };


//     return (

//         <div className="p-4">
//             {presData && (
//                 <div style={{ display: 'none' }}>
//                     <PrescriptionPDF data={presData} ref={printRef} />
//                 </div>
//             )}
//             <h1 className="text-2xl md:text-3xl font-extrabold text-center text-customHeaderBlue mb-6">
//                 🗓️ Booking History
//             </h1>

//             <div className="overflow-hidden whitespace-nowrap mb-4">
//                 <div className="inline-block animate-marquee text-sm text-blue-600 font-semibold">
//                     ⚠️ You can cancel bookings only if more than 3 hours are left for the consultation. No cancellation allowed after that.
//                 </div>
//             </div>

//             <div className="overflow-x-auto">
//                 <table className="min-w-full border text-sm text-left">
//                     <thead className="bg-gray-100">
//                         <tr>
//                             <th className="p-2 border">Doctor Image</th>
//                             <th className="p-2 border">Doctor Name</th>
//                             <th className="p-2 border">Date of Booking</th>
//                             <th className="p-2 border">Appointment Date</th>
//                             <th className="p-2 border">Time</th>
//                             <th className="p-2 border">Payment Status</th>
//                             <th className="p-2 border">Action</th>
//                             <th className="p-2 border">Details</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {currentBookings.length > 0 ? (
//                             currentBookings.map((booking: any, index: number) => (
//                                 <tr key={index} className="border hover:bg-gray-50">
//                                     <td className="p-2 border">
//                                         <img
//                                             src={booking?.doctorId?.profileImage}
//                                             alt="Doctor"
//                                             className="w-12 h-12 rounded-full object-cover"
//                                         />
//                                     </td>
//                                     <td className="p-2 border">{booking?.doctorId?.name}</td>
//                                     <td className="p-2 border">
//                                         {new Date(booking?.createdAt).toLocaleDateString()}
//                                     </td>
//                                     <td className="p-2 border">
//                                         {new Date(booking?.slotId.date).toLocaleDateString()}
//                                     </td>
//                                     <td className="p-2 border">
//                                         {booking?.slotId?.startTime} - {booking?.slotId?.endTime}
//                                     </td>

//                                     <td
//                                         className={`p-2 border capitalize font-medium ${booking?.paymentStatus === 'refunded'
//                                             ? 'text-orange-500'
//                                             : 'text-green-600'
//                                             }`}
//                                     >
//                                         {booking?.paymentStatus}
//                                     </td>

//                                     <td className="p-2 border">
//                                         <div className="flex items-center gap-2 flex-wrap">
//                                             {booking.consultationStatus === 'completed' ? (
//                                                 <button
//                                                     className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded"
//                                                     onClick={() => handleDownloadPrescription(booking._id)}
//                                                 >
//                                                     Download Prescription
//                                                 </button>

//                                             ) : booking.bookingStatus === 'cancelled' ? (
//                                                 <span className="text-xs text-red-500 font-semibold">
//                                                     Booking Cancelled
//                                                 </span>
//                                             ) : (
//                                                 (() => {
//                                                     const [hour, minute] = booking?.slotId?.startTime.split(':');
//                                                     const appointmentDate = new Date(booking.slotId.date);
//                                                     appointmentDate.setHours(parseInt(hour), parseInt(minute), 0, 0);

//                                                     const now = new Date();
//                                                     const diffInMs = appointmentDate.getTime() - now.getTime();
//                                                     const diffInHours = diffInMs / (1000 * 60 * 60);

//                                                     return diffInHours > 3 ? (
//                                                         <button
//                                                             className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
//                                                             onClick={() => handleCancelBooking(booking._id)}
//                                                         >
//                                                             Cancel
//                                                         </button>
//                                                     ) : (
//                                                         <span className="text-xs text-gray-500">
//                                                             No Cancel
//                                                         </span>
//                                                     );
//                                                 })()
//                                             )}
//                                         </div>
//                                     </td>

//                                     <td className="p-2 border">
//                                         <button
//                                             className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded"
//                                             onClick={() => openModal(booking)}
//                                         >
//                                             Details
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan={8} className="p-4 text-center text-gray-500">
//                                     No bookings found
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//                 {isModalOpen && selectedBooking && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                         <div className="relative bg-gradient-to-tl from-customCardBlue via-white to-customBlue p-6 rounded-lg w-[90%] max-w-md shadow-2xl transition-all duration-500 ease-in-out">

//                             {selectedBooking?.bookingStatus && (
//                                 <div className="absolute top-3 left-3 z-10">
//                                     <span
//                                         className={`inline-block px-3 py-1 text-xs font-bold rounded shadow ${selectedBooking.bookingStatus === 'booked'
//                                             ? 'bg-green-600 text-white'
//                                             : 'bg-red-500 text-white'
//                                             }`}
//                                     >
//                                         {selectedBooking.bookingStatus === 'booked' ? 'Booked' : 'Cancelled'}
//                                     </span>
//                                 </div>
//                             )}

//                             <button
//                                 className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl font-bold"
//                                 onClick={closeModal}
//                             >
//                                 ×
//                             </button>

//                             <div className="text-center">
//                                 <img
//                                     src={selectedBooking?.doctorId?.profileImage}
//                                     alt="Doctor"
//                                     className="w-24 h-24 rounded-full mx-auto mb-4 object-cover animate-bounce-once"
//                                 />
//                                 <h2 className="text-2xl font-bold text-rose-950 mb-4 tracking-wide">
//                                     Dr. {selectedBooking?.doctorId?.name}
//                                 </h2>
//                                 <p className="text-sm text-gray-600 font-medium text-center mb-6">
//                                     Your Consulting Specialist
//                                 </p>

//                                 <p className="capitalize mb-2"><strong>Booking Id:</strong> {selectedBooking?._id}</p>
//                                 <p className="mb-2"><strong>Consultation Date:</strong> {new Date(selectedBooking?.slotId?.date).toLocaleDateString()}</p>
//                                 <p className="mb-2"><strong>Consultation Time:</strong> {selectedBooking?.slotId?.startTime} - {selectedBooking?.slotId?.endTime}</p>
//                                 <p className="mb-2"><strong>Consultation Fee:</strong> ₹{selectedBooking?.doctorId?.consultationFee}</p>
//                                 <p className="mb-2"><strong>Consultation Type:</strong> {selectedBooking?.doctorId?.consultationType?.join(', ')}</p>

//                                 <hr className="my-3 border-t-2 border-gray-200" />

//                                 <p className="mb-2"><strong>Doctor Degree:</strong> {selectedBooking?.doctorId?.degree}</p>
//                                 <p className="mb-2"><strong>Department:</strong> {selectedBooking?.doctorId?.departments?.join(', ')}</p>
//                                 <p className="mb-2"><strong>Languages Known:</strong> {selectedBooking?.doctorId?.knownLanguages?.join(', ')}</p>

//                                 <p className="capitalize mb-2">
//                                     <strong>Payment Status:</strong>
//                                     <span
//                                         className={
//                                             selectedBooking?.paymentStatus === 'paid'
//                                                 ? 'text-green-600 font-semibold'
//                                                 : selectedBooking?.paymentStatus === 'refunded'
//                                                     ? 'text-orange-500 font-semibold'
//                                                     : ''
//                                         }
//                                     >
//                                         {selectedBooking?.paymentStatus}
//                                     </span>
//                                 </p>

//                                 <p className="capitalize mb-4">
//                                     <strong>Booking Status:</strong>
//                                     <span
//                                         className={
//                                             selectedBooking?.bookingStatus === 'booked'
//                                                 ? 'text-green-600 font-semibold'
//                                                 : selectedBooking?.bookingStatus === 'cancelled'
//                                                     ? 'text-red-500 font-semibold'
//                                                     : ''
//                                         }
//                                     >
//                                         {selectedBooking?.bookingStatus}
//                                     </span>
//                                 </p>

//                                 <p><strong>Booked On:</strong> {new Date(selectedBooking?.createdAt).toLocaleString()}</p>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>

//             {/* Pagination Controls */}
//             {bookings.length > bookingsPerPage && (
//                 <div className="w-full flex justify-center gap-4 my-6">
//                     <button
//                         onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                         disabled={currentPage === 1}
//                         className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
//                     >
//                         Prev
//                     </button>
//                     <span className="px-4 py-2 font-medium text-gray-700">
//                         Page {currentPage} of {totalPages}
//                     </span>
//                     <button
//                         onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//                         disabled={currentPage === totalPages}
//                         className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
//                     >
//                         Next
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default BookingHistory;



import Notiflix from 'notiflix';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { getPrescription, getUserBookings } from 'src/services/user/userApi';
import userApi from 'src/utils/axios/axiosConfig';
import jsPDF from 'jspdf';

const BookingHistory = () => {
    const userInfo = useSelector((state: any) => state.user.userInfo);
    const [bookings, setBookings] = useState<any[]>([]);
    const [status, setStatus] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const bookingsPerPage = 5;

    useEffect(() => {
        async function getData() {
            try {
                const response = await getUserBookings(userInfo._id);
                console.log("booking details", response);
                setBookings(response as any);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        }
        if (userInfo?._id) getData();
    }, [userInfo, status]);

    const openModal = (booking: any) => {
        setSelectedBooking(booking);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedBooking(null);
    };

    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);
    const totalPages = Math.ceil(bookings.length / bookingsPerPage);

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
                console.log('User cancelled the confirmation dialog');
            }
        );
    };

    // Enhanced prescription PDF generator
    const generatePrescriptionPDF = async (prescriptionData: any, bookingData: any) => {
        const pdf = new jsPDF();
        const pageWidth = pdf.internal.pageSize.width;
        const pageHeight = pdf.internal.pageSize.height;

        // Define colors
        const primaryColor = [41, 98, 255]; // Blue
        const textColor = [51, 51, 51]; // Dark gray
        const lightGray = [240, 240, 240];
        const borderColor = [200, 200, 200];

        // Header Section
        pdf.setFillColor(...primaryColor);
        pdf.rect(0, 0, pageWidth, 40, 'F');

        // Clinic/Hospital Name
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(24);
        pdf.setFont('helvetica', 'bold');
        pdf.text('HomeCare Online', 20, 25);

        // Date
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        const currentDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        pdf.text(`Date: ${currentDate}`, pageWidth - 20, 25, { align: 'right' });

        // Reset text color for body
        pdf.setTextColor(...textColor);

        // Doctor Information Section
        let yPosition = 60;
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`Dr. ${bookingData?.doctorId?.name || 'Unknown Doctor'}`, 20, yPosition);

        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`${bookingData?.doctorId?.degree || 'Medical Degree'}`, 20, yPosition + 8);
        pdf.text(`Department: ${bookingData?.doctorId?.departments?.[0] || 'General Medicine'}`, 20, yPosition + 16);
        pdf.text(`Consultation Fee:${bookingData?.doctorId?.consultationFee || 'N/A'}`, 20, yPosition + 24);

        // Prescription ID and Booking Info
        pdf.setFontSize(10);
        pdf.text(`Prescription ID: ${prescriptionData._id || prescriptionData.id}`, pageWidth - 20, yPosition, { align: 'right' });
        pdf.text(`Booking ID: ${bookingData._id}`, pageWidth - 20, yPosition + 8, { align: 'right' });

        // Divider Line
        yPosition += 40;
        pdf.setDrawColor(...borderColor);
        pdf.setLineWidth(0.5);
        pdf.line(20, yPosition, pageWidth - 20, yPosition);

        // Patient Information Section
        yPosition += 20;
        pdf.setFillColor(...lightGray);
        pdf.rect(15, yPosition - 5, pageWidth - 30, 15, 'F');

        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text('PRESCRIPTION', 20, yPosition + 5);

        yPosition += 20;
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`Patient ID: ${prescriptionData.userId || userInfo._id}`, 20, yPosition);
        pdf.text(`Consultation Date: ${new Date(bookingData.slotId.date).toLocaleDateString()}`, 20, yPosition + 8);
        pdf.text(`Prescribed on: ${new Date(prescriptionData.createdAt).toLocaleDateString()}`, 20, yPosition + 16);

        // Medications Section
        yPosition += 35;
        pdf.setFillColor(...lightGray);
        pdf.rect(15, yPosition - 5, pageWidth - 30, 15, 'F');

        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text('MEDICATIONS', 20, yPosition + 5);

        yPosition += 20;

        // Medication Table Headers
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Medication', 20, yPosition);
        pdf.text('Dosage', 80, yPosition);
        pdf.text('Count', 130, yPosition);
        pdf.text('Instructions', 160, yPosition);

        // Underline headers
        pdf.setLineWidth(0.3);
        pdf.line(20, yPosition + 2, pageWidth - 20, yPosition + 2);

        yPosition += 12;
        pdf.setFont('helvetica', 'normal');

        // Medication entries
        if (prescriptionData.medications && prescriptionData.medications.length > 0) {
            prescriptionData.medications.forEach((medication: any, index: number) => {
                // Alternate row background
                if (index % 2 === 0) {
                    pdf.setFillColor(250, 250, 250);
                    pdf.rect(15, yPosition - 4, pageWidth - 30, 12, 'F');
                }

                pdf.text(medication.name || 'N/A', 20, yPosition);
                pdf.text(medication.dosage || 'N/A', 80, yPosition);
                pdf.text(medication.count || 'N/A', 130, yPosition);

                // Handle long instructions
                const instructions = pdf.splitTextToSize(medication.instruction || 'As directed', 50);
                pdf.text(instructions, 160, yPosition);

                yPosition += 15;
            });
        } else {
            pdf.text('No medications prescribed', 20, yPosition);
            yPosition += 15;
        }

        // Patient Advice Section
        if (prescriptionData.patientAdvice) {
            yPosition += 10;
            pdf.setFillColor(...lightGray);
            pdf.rect(15, yPosition - 5, pageWidth - 30, 15, 'F');

            pdf.setFontSize(12);
            pdf.setFont('helvetica', 'bold');
            pdf.text('PATIENT ADVICE', 20, yPosition + 5);

            yPosition += 20;
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'normal');

            const adviceLines = pdf.splitTextToSize(prescriptionData.patientAdvice, pageWidth - 40);
            pdf.text(adviceLines, 20, yPosition);
            yPosition += adviceLines.length * 5;
        }

        // Footer Section
        yPosition = pageHeight - 60;

        // Doctor Signature Line
        pdf.setLineWidth(0.5);
        pdf.line(pageWidth - 120, yPosition, pageWidth - 20, yPosition);
        pdf.setFontSize(10);
        pdf.text("Doctor's Signature", pageWidth - 120, yPosition + 8);

        // Important Notes
        yPosition += 25;
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'italic');
        pdf.text('Important: Take medications as prescribed. Contact your doctor if you experience any adverse effects.', 20, yPosition);
        pdf.text('This prescription is valid for 30 days from the date of issue.', 20, yPosition + 8);

        // Watermark
        // pdf.setTextColor(220, 220, 220);
        // pdf.setFontSize(40);
        // pdf.setFont('helvetica', 'bold');
        // pdf.text('PRESCRIPTION', pageWidth/2, pageHeight/2, { 
        //     align: 'center', 
        //     angle: 45,
        //     renderingMode: 'stroke'
        // });

        // Generate filename
        const filename = `Prescription_${bookingData._id}_${new Date().toISOString().split('T')[0]}.pdf`;

        // Save the PDF
        pdf.save(filename);
    };

    const handleDownloadPrescription = async (bookingId: string) => {
        try {
            toast.loading("Generating prescription PDF...");

            console.log('Downloading prescription for booking:', bookingId);
            const presData = await getPrescription(bookingId);
            console.log('Prescription data:', presData);

            if (!presData) {
                toast.error("No prescription found for this booking");
                return;
            }

            // Find the booking data for additional information
            const bookingData = bookings.find(booking => booking._id === bookingId);

            if (!bookingData) {
                toast.error("Booking information not found");
                return;
            }

            // Generate and download PDF
            await generatePrescriptionPDF(presData, bookingData);

            toast.dismiss();
            toast.success("Prescription downloaded successfully!");

        } catch (error: any) {
            console.error('Error downloading prescription:', error);
            toast.dismiss();
            toast.error(error.response?.data?.message || "Failed to download prescription");
        }
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
                            <th className="p-2 border">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentBookings.length > 0 ? (
                            currentBookings.map((booking: any, index: number) => (
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

                                    <td
                                        className={`p-2 border capitalize font-medium ${booking?.paymentStatus === 'refunded'
                                            ? 'text-orange-500'
                                            : 'text-green-600'
                                            }`}
                                    >
                                        {booking?.paymentStatus}
                                    </td>

                                    <td className="p-2 border">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            {booking.consultationStatus === 'completed' ? (
                                                <button
                                                    className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded transition-colors duration-200"
                                                    onClick={() => handleDownloadPrescription(booking._id)}
                                                >
                                                    Download Prescription
                                                </button>
                                            ) : booking.bookingStatus === 'cancelled' ? (
                                                <span className="text-xs text-red-500 font-semibold">
                                                    Booking Cancelled
                                                </span>
                                            ) : (
                                                (() => {
                                                    const [hour, minute] = booking?.slotId?.startTime.split(':');
                                                    const appointmentDate = new Date(booking.slotId.date);
                                                    appointmentDate.setHours(parseInt(hour), parseInt(minute), 0, 0);

                                                    const now = new Date();
                                                    const diffInMs = appointmentDate.getTime() - now.getTime();
                                                    const diffInHours = diffInMs / (1000 * 60 * 60);

                                                    return diffInHours > 3 ? (
                                                        <button
                                                            className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
                                                            onClick={() => handleCancelBooking(booking._id)}
                                                        >
                                                            Cancel
                                                        </button>
                                                    ) : (
                                                        <span className="text-xs text-gray-500">
                                                            No Cancel
                                                        </span>
                                                    );
                                                })()
                                            )}
                                        </div>
                                    </td>

                                    <td className="p-2 border">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded"
                                            onClick={() => openModal(booking)}
                                        >
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="p-4 text-center text-gray-500">
                                    No bookings found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Modal for booking details */}
                {isModalOpen && selectedBooking && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="relative bg-gradient-to-tl from-customCardBlue via-white to-customBlue p-6 rounded-lg w-[90%] max-w-md shadow-2xl transition-all duration-500 ease-in-out">
                            {selectedBooking?.bookingStatus && (
                                <div className="absolute top-3 left-3 z-10">
                                    <span
                                        className={`inline-block px-3 py-1 text-xs font-bold rounded shadow ${selectedBooking.bookingStatus === 'booked'
                                            ? 'bg-green-600 text-white'
                                            : 'bg-red-500 text-white'
                                            }`}
                                    >
                                        {selectedBooking.bookingStatus === 'booked' ? 'Booked' : 'Cancelled'}
                                    </span>
                                </div>
                            )}

                            <button
                                className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl font-bold"
                                onClick={closeModal}
                            >
                                ×
                            </button>

                            <div className="text-center">
                                <img
                                    src={selectedBooking?.doctorId?.profileImage}
                                    alt="Doctor"
                                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover animate-bounce-once"
                                />
                                <h2 className="text-2xl font-bold text-rose-950 mb-4 tracking-wide">
                                    Dr. {selectedBooking?.doctorId?.name}
                                </h2>
                                <p className="text-sm text-gray-600 font-medium text-center mb-6">
                                    Your Consulting Specialist
                                </p>

                                <p className="capitalize mb-2"><strong>Booking Id:</strong> {selectedBooking?._id}</p>
                                <p className="mb-2"><strong>Consultation Date:</strong> {new Date(selectedBooking?.slotId?.date).toLocaleDateString()}</p>
                                <p className="mb-2"><strong>Consultation Time:</strong> {selectedBooking?.slotId?.startTime} - {selectedBooking?.slotId?.endTime}</p>
                                <p className="mb-2"><strong>Consultation Fee:</strong> ₹{selectedBooking?.doctorId?.consultationFee}</p>
                                <p className="mb-2"><strong>Consultation Type:</strong> {selectedBooking?.doctorId?.consultationType?.join(', ')}</p>

                                <hr className="my-3 border-t-2 border-gray-200" />

                                <p className="mb-2"><strong>Doctor Degree:</strong> {selectedBooking?.doctorId?.degree}</p>
                                <p className="mb-2"><strong>Department:</strong> {selectedBooking?.doctorId?.departments?.join(', ')}</p>
                                <p className="mb-2"><strong>Languages Known:</strong> {selectedBooking?.doctorId?.knownLanguages?.join(', ')}</p>

                                <p className="capitalize mb-2">
                                    <strong>Payment Status:</strong>
                                    <span
                                        className={
                                            selectedBooking?.paymentStatus === 'paid'
                                                ? 'text-green-600 font-semibold'
                                                : selectedBooking?.paymentStatus === 'refunded'
                                                    ? 'text-orange-500 font-semibold'
                                                    : ''
                                        }
                                    >
                                        {selectedBooking?.paymentStatus}
                                    </span>
                                </p>

                                <p className="capitalize mb-4">
                                    <strong>Booking Status:</strong>
                                    <span
                                        className={
                                            selectedBooking?.bookingStatus === 'booked'
                                                ? 'text-green-600 font-semibold'
                                                : selectedBooking?.bookingStatus === 'cancelled'
                                                    ? 'text-red-500 font-semibold'
                                                    : ''
                                        }
                                    >
                                        {selectedBooking?.bookingStatus}
                                    </span>
                                </p>

                                <p><strong>Booked On:</strong> {new Date(selectedBooking?.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            {bookings.length > bookingsPerPage && (
                <div className="w-full flex justify-center gap-4 my-6">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <span className="px-4 py-2 font-medium text-gray-700">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default BookingHistory;