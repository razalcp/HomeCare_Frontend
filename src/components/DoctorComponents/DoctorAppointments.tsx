

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getMyBookings } from 'src/services/doctor/doctorapi';
import userApi from 'src/utils/axios/axiosConfig';

const DoctorAppointments = () => {
    const doctorInfo = useSelector((state: any) => state.doctor.doctorInfo);
    const [bookings, setBookings] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const bookingsPerPage = 7;

    const [consultationFilter, setConsultationFilter] = useState("all");
    const [paymentFilter, setPaymentFilter] = useState("all");
    const [appointmentDateFilter, setAppointmentDateFilter] = useState("");

    useEffect(() => {
        async function getData() {
            try {
                const response: any = await getMyBookings(doctorInfo._id, currentPage, bookingsPerPage);
                setBookings(response.bookings);
                setTotalPages(response.totalPages);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        }
        if (doctorInfo?._id) getData();
    }, [doctorInfo, currentPage]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const filteredBookings = bookings.filter((booking) => {
        const consultationMatch =
            consultationFilter === "all" || booking.consultationStatus === consultationFilter;

        const paymentMatch =
            paymentFilter === "all" || booking.paymentStatus === paymentFilter;

        const appointmentDateMatch =
            appointmentDateFilter === "" ||
            new Date(booking?.slotId?.date).toLocaleDateString() === appointmentDateFilter;

        return consultationMatch && paymentMatch && appointmentDateMatch;
    });

    return (
        <div className="p-4">
            <h1 className="text-2xl md:text-3xl font-extrabold text-center text-customHeaderBlue mb-6">
                🗓️ My Appointments
            </h1>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-4 justify-end">
                <select
                    value={consultationFilter}
                    onChange={(e) => setConsultationFilter(e.target.value)}
                    className="border p-2 rounded-md"
                >
                    <option value="all">All Consultation Status</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>

                <select
                    value={paymentFilter}
                    onChange={(e) => setPaymentFilter(e.target.value)}
                    className="border p-2 rounded-md"
                >
                    <option value="all">All Payment Status</option>
                    <option value="paid">Paid</option>
                    <option value="refunded">Refunded</option>
                </select>

                <input
                    type="date"
                    value={appointmentDateFilter}
                    onChange={(e) =>
                        setAppointmentDateFilter(
                            e.target.value ? new Date(e.target.value).toLocaleDateString() : ""
                        )
                    }
                    className="border p-2 rounded-md"
                />
                <button
                    onClick={() => {
                        setConsultationFilter("all");
                        setPaymentFilter("all");
                        setAppointmentDateFilter("");
                    }}
                    className="bg-slate-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                    Clear Filters
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border text-sm text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">Patient Name</th>
                            <th className="p-2 border">Date of Booking</th>
                            <th className="p-2 border">Appointment Date</th>
                            <th className="p-2 border">Time</th>
                            <th className="p-2 border">Payment Status</th>
                            <th className="p-2 border">Consultation Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBookings.length > 0 ? (
                            filteredBookings.map((booking: any, index: number) => (
                                <tr key={index} className="border hover:bg-gray-50">
                                    <td className="p-2 border">{booking?.userId?.name}</td>
                                    <td className="p-2 border">
                                        {new Date(booking?.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-2 border">
                                        {new Date(booking?.slotId?.date).toLocaleDateString()}
                                    </td>
                                    <td className="p-2 border">
                                        {booking?.slotId?.startTime} - {booking?.slotId?.endTime}
                                    </td>
                                    <td
                                        className={`p-2 border capitalize font-medium ${booking?.paymentStatus === "refunded"
                                            ? "text-amber-500"
                                            : "text-green-600"
                                            }`}
                                    >
                                        {booking?.paymentStatus}
                                    </td>
                                    <td className="p-2 border capitalize text-blue-950 font-medium">
                                        {booking?.consultationStatus}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="p-4 text-center text-gray-500">
                                    No bookings found for selected filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

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
