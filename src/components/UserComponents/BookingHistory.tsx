
import Notiflix from 'notiflix';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { getUserBookings } from 'src/services/user/userApi';
import userApi from 'src/utils/axios/axiosConfig';

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

                setBookings(response as any); // Assuming response is the array of bookings
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
                                            {booking.bookingStatus === 'cancelled' ? (
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
                                <td colSpan={8} className="p-4 text-center text-gray-500" />


                            </tr>
                        )}
                    </tbody>
                </table>
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
