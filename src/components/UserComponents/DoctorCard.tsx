// import { useEffect, useState } from 'react';
// import { getVerifiedDoctors } from 'src/services/user/userApi';
// import { Eye } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import doctorProfileImage from 'src/assets/female-doctor-hospital-with-stethoscope_profile-image.jpg';

// interface IDoctor {
//   _id?: string;
//   name: string;
//   profileImage: string;
//   departments: string[];
//   knownLanguages: string[];
//   consultationType: string[];
//   consultationFee: number;
// }

// const DoctorCard = () => {
//   const [allDoctorData, setAllDoctorData] = useState<IDoctor[]>([]);
//   const [doctorData, setDoctorData] = useState<IDoctor[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [total, setTotal] = useState(0);

//   const [searchText, setSearchText] = useState('');
//   const [sortOption, setSortOption] = useState('');
//   const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
//   const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);

//   const [allDepartments, setAllDepartments] = useState<string[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const doctorsPerPage = 8;
//   const navigate = useNavigate();

//   // Fetch all doctors on initial load
//   useEffect(() => {
//     const fetchDoctors = async () => {
//       setLoading(true);
//       setError('');
//       try {
//         const res = await getVerifiedDoctors({
//           page: currentPage,
//           limit: doctorsPerPage,
//           search: searchText,
//           sort: sortOption,
//           minFee: priceRange[0],
//           maxFee: priceRange[1],
//         });

//         const payload: any = res.data;
//         setAllDoctorData(payload.data);
//         setTotal(payload.total);
//         setDoctorData(payload.data);

//         // Get unique departments for filter list
//         const uniqueDeps = Array.from(new Set(payload.data.flatMap((d: IDoctor) => d.departments)));
//         setAllDepartments(uniqueDeps);

//       } catch (err) {
//         setError('Failed to load doctors. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDoctors();
//   }, [currentPage, searchText, sortOption, priceRange]);

//   // Filter doctorData based on selected departments (frontend)
//   useEffect(() => {
//     if (selectedDepartments.length === 0) {
//       setDoctorData(allDoctorData);
//     } else {
//       const filtered = allDoctorData.filter(doctor =>
//         doctor.departments.some(dep => selectedDepartments.includes(dep))
//       );
//       setDoctorData(filtered);
//     }
//   }, [selectedDepartments, allDoctorData]);

//   const totalPages = Math.ceil(total / doctorsPerPage);

//   return (
//     <div className="flex w-full p-6">
//       {/* Sidebar */}
//       <div className="w-[20%] pr-6 border-r border-gray-300">
//         {/* Sort */}
//         <div className="mb-6">
//           <label className="block mb-1 text-gray-700 font-medium">Sort By</label>
//           <select
//             value={sortOption}
//             onChange={(e) => { setSortOption(e.target.value); setCurrentPage(1); }}
//             className="w-full px-4 py-2 border border-gray-400 rounded-md"
//           >
//             <option value="">None</option>
//             {/* <option value="name-asc">Name (A–Z)</option>
//             <option value="name-desc">Name (Z–A)</option> */}
//             <option value="fee-asc">Fee (Low to High)</option>
//             <option value="fee-desc">Fee (High to Low)</option>
//           </select>
//         </div>

//         {/* Departments */}
//         <div className="mb-6">
//           <label className="block mb-1 text-gray-700 font-medium">Departments</label>
//           <div className="flex flex-col gap-1 max-h-48 overflow-y-auto pr-1">
//             {allDepartments.map(dep => (
//               <label key={dep} className="flex items-center text-sm">
//                 <input
//                   type="checkbox"
//                   value={dep}
//                   checked={selectedDepartments.includes(dep)}
//                   onChange={(e) => {
//                     const updated = e.target.checked
//                       ? [...selectedDepartments, dep]
//                       : selectedDepartments.filter(d => d !== dep);
//                     setSelectedDepartments(updated);
//                     setCurrentPage(1);
//                   }}
//                   className="mr-2"
//                 />
//                 {dep}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Price Range */}
//         <div className="mb-6">
//           <label className="block mb-1 text-gray-700 font-medium">Max Fee</label>
//           <input
//             type="range"
//             min={0}
//             max={10000}
//             step={100}
//             value={priceRange[1]}
//             onChange={(e) => {
//               setPriceRange([priceRange[0], Number(e.target.value)]);
//               setCurrentPage(1);
//             }}
//             className="w-full"
//           />
//           <p className="text-sm mt-1 text-gray-600">
//             ₹{priceRange[0]} - ₹{priceRange[1]}
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="w-3/4 pl-6">
//         {/* Search */}
//         <div className="w-full flex justify-center mb-6">
//           <div className="flex gap-2 w-[500px]">
//             <input
//               type="text"
//               placeholder="Search doctor by name"
//               className="flex-1 px-4 py-2 border border-gray-400 rounded-md"
//               value={searchText}
//               onChange={(e) => {
//                 setSearchText(e.target.value);
//                 setCurrentPage(1);
//               }}
//               onKeyDown={(e) => { if (e.key === 'Enter') setCurrentPage(1); }}
//             />
//             <button
//               className="px-4 py-2 bg-green-400 text-white rounded-md hover:bg-green-700"
//               onClick={() => setCurrentPage(1)}
//             >
//               Search
//             </button>
//             {searchText && (
//               <button
//                 className="px-4 py-2 bg-red-400 text-white rounded-md hover:bg-red-600"
//                 onClick={() => { setSearchText(''); setCurrentPage(1); }}
//               >
//                 Clear
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Doctor Cards */}
//         <div className="flex flex-wrap justify-center gap-6">
//           {loading && <div className="w-full text-center text-lg text-gray-700">Loading...</div>}
//           {error && <div className="w-full text-center text-red-600">{error}</div>}
//           {!loading && doctorData.length === 0 && (
//             <div className="w-full text-center text-gray-700 font-semibold">No results found</div>
//           )}

//           {!loading && doctorData.map(doctor => (
//             <div
//               key={doctor._id}
//               className="m-4 p-4 w-[230px] rounded-lg shadow-xl bg-gray-100 hover:bg-gray-200 flex flex-col items-center"
//             >
//               <img
//                 src={doctor.profileImage || doctorProfileImage}
//                 alt="doctor"
//                 className="h-[150px] w-full rounded-lg object-cover"
//               />
//               <h3 className="font-bold py-2 text-lg text-center">{doctor.name}</h3>
//               <h4 className="text-sm text-gray-700 text-center">{doctor.departments.join(', ')}</h4>
//               <h4 className="text-sm text-gray-700 text-center">
//                 Languages: {doctor.knownLanguages.slice(0, 2).join(', ')}
//               </h4>
//               <h4 className="text-sm text-gray-700 text-center">Fee: ₹{doctor.consultationFee}</h4>
//               <h4 className="text-sm text-gray-700 text-center mb-2">
//                 Type: {doctor.consultationType.join(', ')}
//               </h4>
//               <button
//                 className="border bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-800"
//                 onClick={() => navigate('/userSideDoctorDetails', {
//                   state: { doctorId: doctor._id, doctor }
//                 })}
//               >
//                 <Eye className="w-5 h-5" />
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* Pagination Controls */}
//         {!loading && total > doctorsPerPage && (
//           <div className="w-full flex justify-center gap-4 my-6">
//             <button
//               onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
//               disabled={currentPage === 1}
//               className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
//             >
//               Prev
//             </button>
//             <span className="px-4 py-2 font-medium text-gray-700">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
//               disabled={currentPage === totalPages}
//               className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DoctorCard;

import { useEffect, useState, useRef } from 'react';
import { getVerifiedDoctors } from 'src/services/user/userApi';
import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import doctorProfileImage from 'src/assets/female-doctor-hospital-with-stethoscope_profile-image.jpg';

interface IDoctor {
  _id?: string;
  name: string;
  profileImage: string;
  departments: string[];
  knownLanguages: string[];
  consultationType: string[];
  consultationFee: number;
}

const DoctorCard = () => {
  const [allDoctorData, setAllDoctorData] = useState<IDoctor[]>([]);
  const [doctorData, setDoctorData] = useState<IDoctor[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);

  const [allDepartments, setAllDepartments] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const doctorsPerPage = 8;
  const navigate = useNavigate();

  // Debounce effect
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 1000);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchText]);

  // Fetch all doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await getVerifiedDoctors({
          page: currentPage,
          limit: doctorsPerPage,
          search: debouncedSearchText,
          sort: sortOption,
          minFee: priceRange[0],
          maxFee: priceRange[1],
        });

        const payload: any = res.data;
        setAllDoctorData(payload.data);
        setTotal(payload.total);
        setDoctorData(payload.data);

        const uniqueDeps = Array.from(new Set(payload.data.flatMap((d: IDoctor) => d.departments)));
        setAllDepartments(uniqueDeps);

      } catch (err) {
        setError('Failed to load doctors. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [currentPage, debouncedSearchText, sortOption, priceRange]);

  // Filter doctorData based on selected departments (frontend filter)
  useEffect(() => {
    if (selectedDepartments.length === 0) {
      setDoctorData(allDoctorData);
    } else {
      const filtered = allDoctorData.filter(doctor =>
        doctor.departments.some(dep => selectedDepartments.includes(dep))
      );
      setDoctorData(filtered);
    }
  }, [selectedDepartments, allDoctorData]);

  const totalPages = Math.ceil(total / doctorsPerPage);

  return (
    <div className="flex w-full p-6">
      {/* Sidebar */}
      <div className="w-[20%] pr-6 border-r border-gray-300">
        {/* Sort */}
        <div className="mb-6">
          <label className="block mb-1 text-gray-700 font-medium">Sort By</label>
          <select
            value={sortOption}
            onChange={(e) => { setSortOption(e.target.value); setCurrentPage(1); }}
            className="w-full px-4 py-2 border border-gray-400 rounded-md"
          >
            <option value="">None</option>
            <option value="fee-asc">Fee (Low to High)</option>
            <option value="fee-desc">Fee (High to Low)</option>
          </select>
        </div>

        {/* Departments */}
        <div className="mb-6">
          <label className="block mb-1 text-gray-700 font-medium">Departments</label>
          <div className="flex flex-col gap-1 max-h-48 overflow-y-auto pr-1">
            {allDepartments.map(dep => (
              <label key={dep} className="flex items-center text-sm">
                <input
                  type="checkbox"
                  value={dep}
                  checked={selectedDepartments.includes(dep)}
                  onChange={(e) => {
                    const updated = e.target.checked
                      ? [...selectedDepartments, dep]
                      : selectedDepartments.filter(d => d !== dep);
                    setSelectedDepartments(updated);
                    setCurrentPage(1);
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
          <label className="block mb-1 text-gray-700 font-medium">Max Fee</label>
          <input
            type="range"
            min={0}
            max={10000}
            step={100}
            value={priceRange[1]}
            onChange={(e) => {
              setPriceRange([priceRange[0], Number(e.target.value)]);
              setCurrentPage(1);
            }}
            className="w-full"
          />
          <p className="text-sm mt-1 text-gray-600">
            ₹{priceRange[0]} - ₹{priceRange[1]}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 pl-6">
        {/* Search */}
        <div className="w-full flex justify-center mb-6">
          <div className="flex gap-2 w-[500px]">
            <input
              type="text"
              placeholder="Search doctor by name"
              className="flex-1 px-4 py-2 border border-gray-400 rounded-md"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setCurrentPage(1);
              }}
            />
            <button
              className="px-4 py-2 bg-green-400 text-white rounded-md hover:bg-green-700"
              onClick={() => setCurrentPage(1)}
            >
              Search
            </button>
            {searchText && (
              <button
                className="px-4 py-2 bg-red-400 text-white rounded-md hover:bg-red-600"
                onClick={() => { setSearchText(''); setCurrentPage(1); }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Doctor Cards */}
        <div className="flex flex-wrap justify-center gap-6">
          {loading && <div className="w-full text-center text-lg text-gray-700">Loading...</div>}
          {error && <div className="w-full text-center text-red-600">{error}</div>}
          {!loading && doctorData.length === 0 && (
            <div className="w-full text-center text-gray-700 font-semibold">No results found</div>
          )}

          {!loading && doctorData.map(doctor => (
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
              <h4 className="text-sm text-gray-700 text-center">{doctor.departments.join(', ')}</h4>
              <h4 className="text-sm text-gray-700 text-center">
                Languages: {doctor.knownLanguages.slice(0, 2).join(', ')}
              </h4>
              <h4 className="text-sm text-gray-700 text-center">Fee: ₹{doctor.consultationFee}</h4>
              <h4 className="text-sm text-gray-700 text-center mb-2">
                Type: {doctor.consultationType.join(', ')}
              </h4>
              <button
                className="border bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-800"
                onClick={() => navigate('/userSideDoctorDetails', {
                  state: { doctorId: doctor._id, doctor }
                })}
              >
                <Eye className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {!loading && total > doctorsPerPage && (
          <div className="w-full flex justify-center gap-4 my-6">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-4 py-2 font-medium text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
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
