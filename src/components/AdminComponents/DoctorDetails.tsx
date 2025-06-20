
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateKycStatus } from "src/services/admin/adminApi";
import toast, { Toaster } from "react-hot-toast";
import Notiflix from "notiflix";

const DoctorDetails = () => {
    const location = useLocation();
    const { doctorId, doctor } = location.state;
    const [status, setStatus] = useState<string | null>(doctor.status || null);
    const navigate = useNavigate();


    const handleApprove = async () => {
        Notiflix.Confirm.show(
            "Confirmation",
            "Do you want to approve this doctor?",
            "Yes, Approve",
            "Cancel",
            async () => {
                const statusResponse = await updateKycStatus("Approved", doctorId);
                if (statusResponse) {
                    setStatus("Approved");
                    toast.success("Doctor approved successfully!");
                    setTimeout(() => navigate("/doctorVerification"), 2000);
                } else {
                    toast.error("Failed to approve doctor. Please try again.");
                }
            }
        );
    };

    const handleReject = async () => {
        Notiflix.Confirm.show(
            "Confirmation",
            "Do you want to reject this doctor?",
            "Yes, Reject",
            "Cancel",
            async () => {
                const statusResponse = await updateKycStatus("Rejected", doctorId);
                if (statusResponse) {
                    setStatus("Rejected");
                    Notiflix.Notify.success("Doctor rejected successfully!");
                    setTimeout(() => navigate("/doctorVerification"), 2000);
                } else {
                    Notiflix.Notify.failure("Failed to reject doctor. Please try again.");
                }
            },
            () => { }, // Cancel callback (empty if not needed)
            {
                okButtonBackground: "#ff0000", // 🔴 Set "Yes, Reject" button to red
                cancelButtonBackground: "#cccccc", // ⚫ Grey cancel button
            }
        );
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <Toaster position="top-right" />
            <img src={doctor.profileImage} alt="Doctor" className="w-32 h-32 rounded-full mx-auto" />

            <h2 className="text-xl font-bold text-center mt-4">{doctor.name}</h2>
            <p className="text-center text-gray-600">{doctor.email}</p>
            <p className="text-center">{doctor.country}, {doctor.state}</p>

            <div className="mt-4">
                <h3 className="font-semibold">Departments:</h3>
                <p>{doctor.departments.join(", ")}</p>
            </div>

            <div className="mt-2">
                <h3 className="font-semibold">Experience:</h3>
                <p>{doctor.experience} years</p>
            </div>

            <div className="mt-2">
                <h3 className="font-semibold">Date of Birth:</h3>
                <p>{doctor.dateOfBirth}</p>
            </div>

            <div className="mt-2">
                <h3 className="font-semibold">Bio:</h3>
                <p>{doctor.bio}</p>
            </div>

            <div className="mt-2">
                <h3 className="font-semibold">Languages Known:</h3>
                <p>{doctor.knownLanguages.join(", ")}</p>
            </div>

            <div className="mt-2">
                <h3 className="font-semibold">Education:</h3>
                <p>{doctor.degree} from {doctor.institution}, {doctor.year}</p>
            </div>

            <div className="mt-2">
                <h3 className="font-semibold">Medical Licence Number:</h3>
                <p>{doctor.medicalLicenceNumber}</p>
            </div>

            <div className="mt-2">
                <h3 className="font-semibold">Consultation Types:</h3>
                <p>{doctor.consultationType.join(", ")}</p>
            </div>

            <div className="mt-2">
                <h3 className="font-semibold">Consultation Fee:</h3>
                <p>₹ {doctor.consultationFee}</p>
            </div>

            <div className="mt-4">
                <h3 className="font-semibold">Certificates:</h3>
                <div className="flex gap-4 mt-2">
                    <a href={doctor.certifications0} target="_blank" rel="noopener noreferrer">
                        <img
                            src={doctor.certifications0}
                            alt="Certificate 1"
                            className="w-32 h-32 object-contain border cursor-pointer"
                        />
                    </a>
                    <a href={doctor.certifications1} target="_blank" rel="noopener noreferrer">
                        <img
                            src={doctor.certifications1}
                            alt="Certificate 2"
                            className="w-32 h-32 object-contain border cursor-pointer"
                        />
                    </a>
                </div>
            </div>
            <div className="ml-[31px]">
                <p className="text-slate-600">Click on the image to view</p>
            </div>

            <div className="flex justify-center mt-6 gap-4">
                {doctor.kycStatus !== "Approved" && doctor.kycStatus !== "Rejected" && (
                    <>
                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600" onClick={handleApprove}>
                            Approve
                        </button>
                        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600" onClick={handleReject}>
                            Reject
                        </button>
                    </>
                )}
            </div>

            {doctor.kycStatus && <p className="text-center mt-4 font-semibold">{doctor.kycStatus}</p>}
        </div>
    );
};

export default DoctorDetails;
