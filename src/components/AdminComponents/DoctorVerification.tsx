


// import { useState, useEffect } from "react";
// import { getDoctors } from "src/services/admin/adminApi";
// import { useNavigate } from "react-router-dom";

// interface IDoctor {
//     _id?: string;
//     name: string;
//     profileImage: string;
//     certifications0?: string;
//     certifications1?: string;
//     certifications2?: string;
//     certifications3?: string;
//     doctorImage: string;
//     mobileNumber: string;
//     email: string;
//     state: string;
//     country: string;
//     slotId: string[];
//     experience: string;
//     dateOfBirth: string;
//     bio: string;
//     departments: string[];
//     knownLanguages: string[];
//     degree: string;
//     institution: string;
//     year: string;
//     medicalLicenceNumber: string;
//     consultationType: string[];
//     consultationFee: number;
//     certifications: string[];
//     isVerified: boolean;
//     kycStatus: string;
//     createdAt: String;
//     updatedAt: String;
// }

// const DoctorVerification = () => {
//     const [doctors, setDoctors] = useState<IDoctor[]>([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const doctorsPerPage = 8;

//     useEffect(() => {
//         const getDoctorData = async () => {
//             const docData = await getDoctors();
//             console.log("this is doc data ", docData);
//             const data = docData.data;
//             setDoctors(data as IDoctor[]);
//         };
//         getDoctorData();
//     }, []);

//     const navigate = useNavigate();

//     // Pagination logic
//     const indexOfLastDoctor = currentPage * doctorsPerPage;
//     const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
//     const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
//     const totalPages = Math.ceil(doctors.length / doctorsPerPage);

//     const goToNextPage = () => {
//         if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
//     };

//     const goToPrevPage = () => {
//         if (currentPage > 1) setCurrentPage(prev => prev - 1);
//     };

//     return (
//         <div className="p-6 bg-white shadow-lg rounded-lg">
//             <h2 className="text-xl font-semibold mb-4">Doctor Verification</h2>
//             <table className="w-full border-collapse border border-gray-300">
//                 <thead>
//                     <tr className="bg-gray-200">
//                         <th className="border p-2">Name</th>
//                         <th className="border p-2">Department</th>
//                         <th className="border p-2">Status</th>
//                         <th className="border p-2">Date</th>
//                         <th className="border p-2">Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {currentDoctors.map((doctor) => (
//                         <tr key={doctor._id} className="text-center">
//                             <td className="border p-2">{doctor.name}</td>
//                             <td className="border p-2">{doctor.departments[0]}</td>
//                             <td className={`border p-2 font-semibold ${doctor.kycStatus === "Approved" ? "text-green-600" : doctor.kycStatus === "Rejected" ? "text-red-600" : "text-yellow-600"}`}>
//                                 {doctor.kycStatus}
//                             </td>
//                             <td className="border p-2">{doctor.createdAt.toString().split("T")[0]}</td>
//                             <td className="border p-2">
//                                 <button
//                                     className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
//                                     onClick={() => {
//                                         const doctorId = doctor._id;
//                                         navigate('/doctorVerificationDetails', { state: { doctorId, doctor } });
//                                     }}
//                                 >
//                                     View
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {/* Pagination Controls */}
//             <div className="flex justify-center items-center mt-4 gap-4">
//                 <button
//                     className={`px-4 py-1 border rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-white hover:bg-gray-100'}`}
//                     onClick={goToPrevPage}
//                     disabled={currentPage === 1}
//                 >
//                     Previous
//                 </button>
//                 <span className="font-medium">Page {currentPage} of {totalPages}</span>
//                 <button
//                     className={`px-4 py-1 border rounded ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-white hover:bg-gray-100'}`}
//                     onClick={goToNextPage}
//                     disabled={currentPage === totalPages}
//                 >
//                     Next
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default DoctorVerification;


import { useState, useEffect } from "react";
import { getDoctors } from "src/services/admin/adminApi";
import { useNavigate } from "react-router-dom";

interface IDoctor {
    _id?: string;
    name: string;
    profileImage: string;
    certifications0?: string;
    certifications1?: string;
    certifications2?: string;
    certifications3?: string;
    doctorImage: string;
    mobileNumber: string;
    email: string;
    state: string;
    country: string;
    slotId: string[];
    experience: string;
    dateOfBirth: string;
    bio: string;
    departments: string[];
    knownLanguages: string[];
    degree: string;
    institution: string;
    year: string;
    medicalLicenceNumber: string;
    consultationType: string[];
    consultationFee: number;
    certifications: string[];
    isVerified: boolean;
    kycStatus: string;
    createdAt: string;
    updatedAt: string;
}

const DoctorVerification = () => {
    const [doctors, setDoctors] = useState<IDoctor[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const doctorsPerPage = 8;

    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await getDoctors(currentPage, doctorsPerPage);
                console.log("this is response ", res);

                setDoctors(res.data.data);
                setTotalPages(res.data.totalPages);
            } catch (error) {
                console.error("Failed to fetch doctors", error);
            }
        };
        fetchDoctors();
    }, [currentPage]);

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const goToPrevPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Doctor Verification</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Department</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Date</th>
                        <th className="border p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map((doctor) => (
                        <tr key={doctor._id} className="text-center">
                            <td className="border p-2">{doctor.name}</td>
                            <td className="border p-2">{doctor.departments[0]}</td>
                            <td className={`border p-2 font-semibold ${doctor.kycStatus === "Approved"
                                ? "text-green-600"
                                : doctor.kycStatus === "Rejected"
                                    ? "text-red-600"
                                    : "text-yellow-600"}`}>
                                {doctor.kycStatus}
                            </td>
                            <td className="border p-2">{doctor.createdAt.toString().split("T")[0]}</td>
                            <td className="border p-2">
                                <button
                                    className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    onClick={() => navigate('/doctorVerificationDetails', {
                                        state: { doctorId: doctor._id, doctor }
                                    })}
                                >
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-4 gap-4">
                <button
                    className={`px-4 py-1 border rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-white hover:bg-gray-100'}`}
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="font-medium">Page {currentPage} of {totalPages}</span>
                <button
                    className={`px-4 py-1 border rounded ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-white hover:bg-gray-100'}`}
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default DoctorVerification;


