import { Calendar, GraduationCap, Languages, BriefcaseMedical, User, MapPin, DollarSign, FileText, IndianRupee } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom"
const UserSideDoctorDetails = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { doctorId, doctor } = location.state
    return (
        <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-xl">
            {/* Profile Image */}
            <div className="flex flex-col items-center">
                <img src={doctor.profileImage} alt="Doctor" className="w-32 h-32 rounded-full shadow-md" />
                <h2 className="text-2xl font-bold mt-4">{doctor.name}</h2>
                <p className="text-gray-600">{doctor.email}</p>
                <p className="text-sm text-gray-500">{doctor.country}, {doctor.state}</p>
            </div>

            {/* Details Section */}
            <div className="mt-6 space-y-4">
                {/* Departments */}
                <div className="flex items-center space-x-2">
                    <BriefcaseMedical className="w-5 h-5 text-indigo-600" />
                    <p><strong>Departments:</strong> {doctor.departments.join(", ")}</p>
                </div>

                {/* Experience */}
                <div className="flex items-center space-x-2">
                    <User className="w-10 h-10  text-indigo-600 " />
                    <p><strong>Experience:</strong> {doctor.experience} years</p>
                </div>

                {/* Date of Birth */}
                <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                    <p><strong>Date of Birth:</strong> {doctor.dateOfBirth}</p>
                </div>

                {/* Bio */}
                <div className="flex items-start space-x-2">
                    <FileText className="w-28 h-10 text-indigo-600" />
                    <p><strong>Bio:</strong> {doctor.bio}</p>
                </div>

                {/* Languages */}
                <div className="flex items-center space-x-2">
                    <Languages className="w-5 h-5 text-indigo-600" />
                    <p><strong>Languages Known:</strong> {doctor.knownLanguages.join(", ")}</p>
                </div>

                {/* Education */}
                <div className="flex items-center space-x-2">
                    <GraduationCap className="w-5 h-5 text-indigo-600" />
                    <p><strong>Education:</strong> {doctor.degree} from {doctor.institution} ({doctor.year})</p>
                </div>

                {/* License Number */}
                <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-indigo-600" />
                    <p><strong>Medical License Number:</strong> {doctor.medicalLicenceNumber}</p>
                </div>

                {/* Consultation Types */}
                <div className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-indigo-600" />
                    <p><strong>Consultation Types:</strong> {doctor.consultationType.join(", ")}</p>
                </div>

                {/* Consultation Fee */}
                <div className="flex items-center space-x-2">
                    {/* <DollarSign className="w-5 h-5 text-indigo-600" /> */}
                    <IndianRupee className="w-5 h-5 text-indigo-600" />
                    <p><strong>Consultation Fee:</strong> ₹ {doctor.consultationFee}</p>
                </div>
            </div>

            {/* Book Appointment Button */}
            <div className="mt-6 flex justify-center">
                <button onClick={() => navigate("/booking",{ state: { doctorId, doctor } })} className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 shadow-md transition-all">
                    Book Appointment
                </button>
            </div>
        </div>
    );
};

export default UserSideDoctorDetails;


