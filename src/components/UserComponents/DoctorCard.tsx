// import { CDN_URL } from '../utils/constant'
// import UserContext from '../utils/UserContext'
import { useContext } from 'react'
import doctorProfileImage from 'src/assets/female-doctor-hospital-with-stethoscope_profile-image.jpg';
import { useEffect, useState } from 'react'
import { getVerifiedDoctors } from 'src/services/user/userApi';
import { Eye } from "lucide-react";
import {  useNavigate } from "react-router-dom"

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

const DoctorCard = () => {
  const [doctorData, setDoctorData] = useState<IDoctor[]>([]);

  useEffect(() => {
    const getVerifiedDocs = async () => {
      const docData = await getVerifiedDoctors()
      console.log("front doc ", docData);
      const docArray: any = docData?.data
      await setDoctorData(docArray)
      console.log("state", doctorData);




    }
    getVerifiedDocs()
  }, [])


    const navigate = useNavigate()
    
  return (


   
    <div className="flex flex-wrap gap-4 justify-center">
  {doctorData.map((doctor) => (
    <div key={doctor._id} className="m-4 p-4 w-[230px] h-auto rounded-lg shadow-xl bg-gray-100 hover:bg-gray-200 flex flex-col items-center">
      
   
      <img src={doctor.profileImage} alt="doc image here" className="h-[150px] w-full rounded-lg" />

      <h3 className="font-bold py-4 text-lg">{doctor.name}</h3>
      <h4>{doctor.departments.join(", ")}</h4>
      <h4>Languages Known: {doctor.knownLanguages.join(", ")}</h4>
      <h4>Consultation Fees: ₹{doctor.consultationFee}</h4>
      <h3>Consultation Type: {doctor.consultationType.join(", ")}</h3>

      
      <button className="border border-zinc-700 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-800 mt-4"
       onClick={() => {
        const doctorId = doctor._id
        navigate('/userSideDoctorDetails', { state: { doctorId, doctor } })}}
>
      <Eye className="w-5 h-5" />
      </button>

    </div>
  ))}
</div>



  )
}



export default DoctorCard