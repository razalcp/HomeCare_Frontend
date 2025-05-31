
// import { useContext } from 'react'
// import doctorProfileImage from 'src/assets/female-doctor-hospital-with-stethoscope_profile-image.jpg';
// import { useEffect, useState } from 'react'
// import { getVerifiedDoctors } from 'src/services/user/userApi';
// import { Eye } from "lucide-react";
// import { useNavigate } from "react-router-dom"

// interface IDoctor {
//   _id?: string;
//   name: string;
//   profileImage: string;
//   certifications0?: string;
//   certifications1?: string;
//   certifications2?: string;
//   certifications3?: string;
//   doctorImage: string;
//   mobileNumber: string;
//   email: string;
//   state: string;
//   country: string;
//   slotId: string[];
//   experience: string;
//   dateOfBirth: string;
//   bio: string;
//   departments: string[];
//   knownLanguages: string[];
//   degree: string;
//   institution: string;
//   year: string;
//   medicalLicenceNumber: string;
//   consultationType: string[];
//   consultationFee: number;
//   certifications: string[];
//   isVerified: boolean;
//   kycStatus: string;
//   createdAt: String;
//   updatedAt: String;
// }

// const DoctorCard = () => {
//   const [doctorData, setDoctorData] = useState<IDoctor[]>([]);
//   const [searchText, setSearchText] = useState("")
//   const [filteredDoctor, setFilteredDoctor] = useState([])
//   const [searchAttempted, setSearchAttempted] = useState(false);

//   useEffect(() => {
//     const getVerifiedDocs = async () => {
//       const docData = await getVerifiedDoctors()
//       console.log("front doc ", docData);
//       const docArray: any = docData?.data
//       await setDoctorData(docArray)
//     }
//     getVerifiedDocs()
//   }, [])


//   const navigate = useNavigate()

//   return (

//     <div className="flex flex-wrap gap-4 justify-center">
//       <div className="w-full flex justify-center my-6 mx-2">
//         <div className="flex gap-2">
//           <input
//             type="text"
//             placeholder="Search doctor by name"
//             className="px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             value={searchText}
//             onChange={(e) => {
//               setSearchText(e.target.value);
//               if (e.target.value.trim() === "") setSearchAttempted(false);
//             }}
//           />
//           <button
//             className="px-4 py-2 bg-green-400 text-white rounded-md hover:bg-indigo-700 transition-all"
//             onClick={() => {
//               const filteredData = doctorData.filter((res) =>
//                 res.name.toLowerCase().includes(searchText.toLowerCase())
//               );
//               setFilteredDoctor(filteredData as any);
//               setSearchAttempted(true);
//             }}

//           >
//             Search
//           </button>
//         </div>
//       </div>

//       {searchAttempted && filteredDoctor.length === 0 && (
//         <div className="w-full flex justify-center my-6">
//           <div className="bg-gray-200 bg-opacity-70 text-gray-700 px-6 py-3 rounded-lg shadow-md text-lg font-semibold">
//             No results found for "{searchText}"
//           </div>
//         </div>
//       )}


//       {(filteredDoctor.length > 0 ? filteredDoctor : doctorData).map((doctor) => (
//         <div
//           key={doctor._id}
//           className="m-4 p-4 w-[230px] h-auto rounded-lg shadow-xl bg-gray-100 hover:bg-gray-200 flex flex-col items-center"
//         >
//           <img
//             src={doctor.profileImage}
//             alt="doc image here"
//             className="h-[150px] w-full rounded-lg"
//           />
//           <h3 className="font-bold py-4 text-lg">{doctor.name}</h3>
//           <h4>{doctor.departments.join(", ")}</h4>
//           <h4>Languages Known: {doctor.knownLanguages.join(", ")}</h4>
//           <h4>Consultation Fees: ₹{doctor.consultationFee}</h4>
//           <h3>Consultation Type: {doctor.consultationType.join(", ")}</h3>

//           <button
//             className="border border-zinc-700 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-800 mt-4"
//             onClick={() => {
//               const doctorId = doctor._id;
//               navigate('/userSideDoctorDetails', {
//                 state: { doctorId, doctor },
//                 replace: false  // Ensure a new entry is pushed into the history stack
//               });
//             }}
//           >
//             <Eye className="w-5 h-5" />
//           </button>
//         </div>
//       ))}
//     </div>



//   )
// }



// export default DoctorCard

//////////////////////////////////////////////////////////////////////////////////////////////////////////////


// import { useEffect, useState } from 'react';
// import { getVerifiedDoctors } from 'src/services/user/userApi';
// import { Eye } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import doctorProfileImage from 'src/assets/female-doctor-hospital-with-stethoscope_profile-image.jpg';

// interface IDoctor {
//   _id?: string;
//   name: string;
//   profileImage: string;
//   certifications0?: string;
//   certifications1?: string;
//   certifications2?: string;
//   certifications3?: string;
//   doctorImage: string;
//   mobileNumber: string;
//   email: string;
//   state: string;
//   country: string;
//   slotId: string[];
//   experience: string;
//   dateOfBirth: string;
//   bio: string;
//   departments: string[];
//   knownLanguages: string[];
//   degree: string;
//   institution: string;
//   year: string;
//   medicalLicenceNumber: string;
//   consultationType: string[];
//   consultationFee: number;
//   certifications: string[];
//   isVerified: boolean;
//   kycStatus: string;
//   createdAt: String;
//   updatedAt: String;
// }

// const DoctorCard = () => {
//   const [doctorData, setDoctorData] = useState<IDoctor[]>([]);
//   const [searchText, setSearchText] = useState("");
//   const [filteredDoctor, setFilteredDoctor] = useState<IDoctor[]>([]);
//   const [searchAttempted, setSearchAttempted] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const doctorsPerPage = 5;

//   const navigate = useNavigate();

//   useEffect(() => {
//     const getVerifiedDocs = async () => {
//       const docData = await getVerifiedDoctors();
//       const docArray: any = docData?.data;
//       await setDoctorData(docArray);
//     };
//     getVerifiedDocs();
//   }, []);

//   const handleSearch = () => {
//     const filteredData = doctorData.filter((res) =>
//       res.name.toLowerCase().includes(searchText.toLowerCase())
//     );
//     setFilteredDoctor(filteredData as any);
//     setSearchAttempted(true);
//     setCurrentPage(1); // Reset to first page on new search
//   };

//   const indexOfLastDoctor = currentPage * doctorsPerPage;
//   const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
//   const allDoctors = filteredDoctor.length > 0 ? filteredDoctor : doctorData;
//   const currentDoctors = allDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
//   const totalPages = Math.ceil(allDoctors.length / doctorsPerPage);

//   return (
//     <div className="flex flex-wrap gap-4 justify-center">
//       <div className="w-full flex justify-center my-6 mx-2">
//         <div className="flex gap-2">
//           <input
//             type="text"
//             placeholder="Search doctor by name"
//             className="px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             value={searchText}
//             onChange={(e) => {
//               setSearchText(e.target.value);
//               if (e.target.value.trim() === "") {
//                 setSearchAttempted(false);
//                 setFilteredDoctor([]);
//               }
//             }}
//           />
//           <button
//             className="px-4 py-2 bg-green-400 text-white rounded-md hover:bg-indigo-700 transition-all"
//             onClick={handleSearch}
//           >
//             Search
//           </button>
//         </div>
//       </div>

//       {searchAttempted && filteredDoctor.length === 0 && (
//         <div className="w-full flex justify-center my-6">
//           <div className="bg-gray-200 bg-opacity-70 text-gray-700 px-6 py-3 rounded-lg shadow-md text-lg font-semibold">
//             No results found for "{searchText}"
//           </div>
//         </div>
//       )}

//       {currentDoctors.map((doctor) => (
//         <div
//           key={doctor._id}
//           className="m-4 p-4 w-[230px] h-auto rounded-lg shadow-xl bg-gray-100 hover:bg-gray-200 flex flex-col items-center"
//         >
//           <img
//             src={doctor.profileImage}
//             alt="doc image here"
//             className="h-[150px] w-full rounded-lg"
//           />
//           <h3 className="font-bold py-4 text-lg">{doctor.name}</h3>
//           <h4>{doctor.departments.join(", ")}</h4>
//           <h4>Languages Known: {doctor.knownLanguages.join(", ")}</h4>
//           <h4>Consultation Fees: ₹{doctor.consultationFee}</h4>
//           <h3>Consultation Type: {doctor.consultationType.join(", ")}</h3>

//           <button
//             className="border border-zinc-700 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-800 mt-4"
//             onClick={() => {
//               const doctorId = doctor._id;
//               navigate('/userSideDoctorDetails', {
//                 state: { doctorId, doctor },
//                 replace: false
//               });
//             }}
//           >
//             <Eye className="w-5 h-5" />
//           </button>
//         </div>
//       ))}

//       {/* Pagination Controls */}
//       {allDoctors.length > doctorsPerPage && (
//         <div className="w-full flex justify-center gap-4 my-6">
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
//           >
//             Prev
//           </button>
//           <span className="px-4 py-2 font-medium text-gray-700">
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DoctorCard;

//////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////

import { useEffect, useState } from 'react';
import { getVerifiedDoctors } from 'src/services/user/userApi';
import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import doctorProfileImage from 'src/assets/female-doctor-hospital-with-stethoscope_profile-image.jpg';

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

const DoctorCard = () => {
  const [doctorData, setDoctorData] = useState<IDoctor[]>([]);
  const [searchText, setSearchText] = useState('');
  const [filteredDoctor, setFilteredDoctor] = useState<IDoctor[]>([]);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);

  const doctorsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    const getVerifiedDocs = async () => {
      try {
        setLoading(true);
        const docData = await getVerifiedDoctors();
        const docArray: IDoctor[] = docData?.data || [];
        setDoctorData(docArray);
        setLoading(false);
      } catch {
        setError('Failed to load doctors. Please try again later.');
        setLoading(false);
      }
    };
    getVerifiedDocs();
  }, []);

  const handleSearch = () => {
    const filteredData = doctorData.filter((res) =>
      res.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredDoctor(filteredData);
    setSearchAttempted(true);
    setCurrentPage(1);
  };

  const handleDepartmentFilter = () => {
    let filteredData = doctorData;

    if (selectedDepartments.length > 0) {
      filteredData = filteredData.filter((doctor) =>
        selectedDepartments.some((dep) => doctor.departments.includes(dep))
      );
    }

    filteredData = filteredData.filter(
      (doctor) =>
        doctor.consultationFee >= priceRange[0] &&
        doctor.consultationFee <= priceRange[1]
    );

    setFilteredDoctor(filteredData);
    setSearchAttempted(true);
    setCurrentPage(1);
  };

  const getSortedDoctors = (doctors: IDoctor[]) => {
    const sortedDoctors = [...doctors];
    switch (sortOption) {
      case 'name-asc':
        return sortedDoctors.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sortedDoctors.sort((a, b) => b.name.localeCompare(a.name));
      case 'fee-asc':
        return sortedDoctors.sort((a, b) => a.consultationFee - b.consultationFee);
      case 'fee-desc':
        return sortedDoctors.sort((a, b) => b.consultationFee - a.consultationFee);
      case 'experience-asc':
        return sortedDoctors.sort((a, b) => +a.experience - +b.experience);
      case 'experience-desc':
        return sortedDoctors.sort((a, b) => +b.experience - +a.experience);
      default:
        return doctors;
    }
  };

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const allDoctors = filteredDoctor.length > 0 || searchAttempted ? filteredDoctor : doctorData;
  const sortedDoctors = getSortedDoctors(allDoctors);
  const currentDoctors = sortedDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
  const totalPages = Math.ceil(sortedDoctors.length / doctorsPerPage);
  const allDepartments = Array.from(new Set(doctorData.flatMap((d) => d.departments)));

  return (
    <div className="flex w-full p-6">
      {/* Sidebar */}
      <div className="w-[20%] pr-6 border-r border-gray-300">


        {/* Sort */}
        <div className="mb-6">
          <label className="block mb-1 text-gray-700 font-medium">Sort By</label>
          <select
            value={sortOption}
            onChange={(e) => {
              setSortOption(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-4 py-2 border border-gray-400 rounded-md"
          >
            <option value="">None</option>
            <option value="name-asc">Name (A–Z)</option>
            <option value="name-desc">Name (Z–A)</option>
            <option value="fee-asc">Fee (Low to High)</option>
            <option value="fee-desc">Fee (High to Low)</option>
            {/* <option value="experience-asc">Experience (Low to High)</option>
            <option value="experience-desc">Experience (High to Low)</option> */}
          </select>
        </div>

        {/* Departments */}
        <div className="mb-6">
          <label className="block mb-1 text-gray-700 font-medium">Departments</label>
          <div className="flex flex-col gap-1 max-h-48 overflow-y-auto pr-1">
            {allDepartments.map((dep) => (
              <label key={dep} className="flex items-center text-sm">
                <input
                  type="checkbox"
                  value={dep}
                  checked={selectedDepartments.includes(dep)}
                  onChange={(e) => {
                    const updated = e.target.checked
                      ? [...selectedDepartments, dep]
                      : selectedDepartments.filter((d) => d !== dep);
                    setSelectedDepartments(updated);
                  }}
                  className="mr-2"
                />
                {dep}
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <label className="block mb-1 text-gray-700 font-medium">Price Range</label>
          <input
            type="range"
            min={0}
            max={5000}
            step={100}
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
            className="w-full"
          />
          <p className="text-sm mt-1 text-gray-600">
            ₹{priceRange[0]} - ₹{priceRange[1]}
          </p>
        </div>

        <button
          onClick={handleDepartmentFilter}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Apply Filters
        </button>
      </div>

      {/* Main Content */}
      <div className="w-3/4 pl-6">
        <div className="w-full flex justify-center mb-6">
          <div className="flex gap-2 w-[500px]">
            <input
              type="text"
              placeholder="Search doctor by name"
              className="flex-1 px-4 py-2 border border-gray-400 rounded-md"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                if (e.target.value.trim() === '') {
                  setSearchAttempted(false);
                  setFilteredDoctor([]);
                }
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              className="px-4 py-2 bg-green-400 text-white rounded-md hover:bg-green-700"
              onClick={handleSearch}
            >
              Search
            </button>
            {searchText.trim() && (
              <button
                className="px-4 py-2 bg-red-400 text-white rounded-md hover:bg-red-600"
                onClick={() => {
                  setSearchText('');
                  setFilteredDoctor([]);
                  setSearchAttempted(false);
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {loading && (
            <div className="w-full text-center text-lg text-gray-700">Loading doctors...</div>
          )}

          {error && <div className="w-full text-center text-red-600">{error}</div>}

          {!loading && searchAttempted && filteredDoctor.length === 0 && (
            <div className="w-full text-center text-gray-700 font-semibold">
              No results found
            </div>
          )}

          {!loading &&
            currentDoctors.map((doctor) => (
              <div
                key={doctor._id}
                className="m-4 p-4 w-[230px] rounded-lg shadow-xl bg-gray-100 hover:bg-gray-200 flex flex-col items-center"
              >
                <img
                  src={doctor.profileImage || doctorProfileImage}
                  alt="doctor"
                  className="h-[150px] w-full rounded-lg object-cover"
                />
                <h3 className="font-bold py-2 text-lg text-center">{doctor.name}</h3>
                <h4 className="text-sm text-gray-700 text-center">
                  {doctor.departments.join(', ') || 'No departments'}
                </h4>
                <h4 className="text-sm text-gray-700 text-center">
                  Languages: {doctor.knownLanguages?.join(', ') || 'N/A'}
                </h4>
                <h4 className="text-sm text-gray-700 text-center">
                  Fee: ₹{doctor.consultationFee}
                </h4>
                <h4 className="text-sm text-gray-700 text-center mb-2">
                  Type: {doctor.consultationType?.join(', ') || 'N/A'}
                </h4>
                <button
                  className="border bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-800"
                  onClick={() =>
                    navigate('/userSideDoctorDetails', {
                      state: { doctorId: doctor._id, doctor },
                    })
                  }
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            ))}
        </div>

        {/* Pagination */}
        {!loading && allDoctors.length > doctorsPerPage && (
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
    </div>
  );
};

export default DoctorCard;


