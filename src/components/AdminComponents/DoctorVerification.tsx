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
    createdAt: String;
    updatedAt: String;
}
const DoctorVerification = () => {

    // Sample doctor data
    const [doctors, setDoctors] = useState<IDoctor[]>([]);
    useEffect(() => {
        const getDoctorData = async () => {
            const docData = await getDoctors()
            console.log("this is doc data ", docData);
            const data = docData.data
            setDoctors(data as IDoctor[])
            console.log("s", doctors);

        }
        getDoctorData()
    }, [])

    const navigate = useNavigate()


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
                            <td className={`border p-2 font-semibold ${doctor.kycStatus === "Approved" ? "text-green-600" : doctor.kycStatus === "Rejected" ? "text-red-600" : "text-yellow-600"}`}>
                                {doctor.kycStatus}
                            </td>
                            <td className="border p-2">{doctor.createdAt.toString().split("T")[0]}</td>
                            <td className="border p-2">
                                <button className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={() => {
                                    const doctorId = doctor._id
                                    navigate('/doctorVerificationDetails', { state: { doctorId, doctor } })

                                }}>View</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DoctorVerification;
