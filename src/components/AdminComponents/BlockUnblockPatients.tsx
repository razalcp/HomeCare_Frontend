// // import { useState, useEffect } from "react";
// // import Swal from "sweetalert2";
// // import { getPatientData, updatePatients } from "src/services/admin/adminApi";

// // export interface IMedicalRecords {
// //   fileName: string;
// //   fileUrl: string;
// //   uploadDate: Date;
// // }

// // export interface IUserAuth {
// //   _id?: string;
// //   name: string;
// //   email: string;
// //   mobile: string;
// //   password?: string;
// //   dob?: Date;
// //   profileIMG?: string;
// //   walletBalance?: number;
// //   medicalRecords?: IMedicalRecords[];
// //   isUserBlocked?: boolean;
// // }

// // const BlockUnblockPatients = () => {
// //   const [patients, setPatients] = useState<IUserAuth[]>([]);

// //   useEffect(() => {
// //     const getUserData = async () => {
// //       const data = await getPatientData();
// //       setPatients(data.data);
// //     };
// //     getUserData();
// //   }, []);

// //   const toggleBlock = async (buttonName: string, id: string) => {
// //     const action = buttonName === "Block" ? "block" : "unblock";

// //     const result = await Swal.fire({
// //       title: `Are you sure?`,
// //       text: `Do you want to ${action} this patient?`,
// //       icon: "warning",
// //       showCancelButton: true,
// //       confirmButtonColor: action === "block" ? "#d33" : "#28a745",
// //       cancelButtonColor: "#6c757d",
// //       confirmButtonText: `Yes, ${action}!`,
// //     });

// //     if (result.isConfirmed) {
// //       const update = await updatePatients(buttonName, id);
// //       setPatients((prevPatients) =>
// //         prevPatients.map((patient) =>
// //           patient._id === id ? { ...patient, isUserBlocked: !patient.isUserBlocked } : patient
// //         )
// //       );

// //       Swal.fire({
// //         title: "Success!",
// //         text: `Patient has been ${action}ed successfully.`,
// //         icon: "success",
// //       });
// //     }
// //   };

// //   return (
// //     <div className="p-4">
// //       <table className="w-full border-collapse border border-gray-300">
// //         <thead>
// //           <tr className="bg-gray-200">
// //             <th className="border p-2">Name</th>
// //             <th className="border p-2">Email</th>
// //             <th className="border p-2">Contact Number</th>
// //             <th className="border p-2">Block/Unblock Patient</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {patients.map((patient) => (
// //             <tr key={patient._id} className="text-center">
// //               <td className="border p-2">{patient.name}</td>
// //               <td className="border p-2">{patient.email}</td>
// //               <td className="border p-2">{patient.mobile}</td>
// //               <td className="border p-2">
// //                 <button
// //                   className={`px-4 py-2 text-white rounded ${patient.isUserBlocked ? "bg-red-500" : "bg-green-500"}`}
// //                   onClick={(e) => {
// //                     const buttonName = e.currentTarget.textContent!;
// //                     toggleBlock(buttonName, patient._id!);
// //                   }}
// //                 >
// //                   {patient.isUserBlocked ? "Unblock" : "Block"}
// //                 </button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default BlockUnblockPatients;


// import { useState, useEffect } from "react";
// import Notiflix from "notiflix";
// import { getPatientData, updatePatients } from "src/services/admin/adminApi";
// import { removeUserData } from "src/Redux/Slice/userSlice";
// import {useDispatch} from 'react-redux'

// export interface IMedicalRecords {
//   fileName: string;
//   fileUrl: string;
//   uploadDate: Date;
// }

// export interface IUserAuth {
//   _id?: string;
//   name: string;
//   email: string;
//   mobile: string;
//   password?: string;
//   dob?: Date;
//   profileIMG?: string;
//   walletBalance?: number;
//   medicalRecords?: IMedicalRecords[];
//   isUserBlocked?: boolean;
// }

// const BlockUnblockPatients = () => {
//   const [patients, setPatients] = useState<IUserAuth[]>([]);

//   useEffect(() => {
//     const getUserData = async () => {
//       const data = await getPatientData();
//       setPatients(data.data);
//     };
//     getUserData();
//   }, []);

//   const dispatch = useDispatch()
//   const toggleBlock = async (buttonName: string, id: string) => {
//     const action = buttonName === "Block" ? "block" : "unblock";
//     const okButtonColor = action === "block" ? "#d33" : "#28a745"; // Red for block, green for unblock

//     Notiflix.Confirm.show(
//       "Are you sure?",
//       `Do you want to ${action} this patient?`,
//       `Yes, ${action}!`,
//       "Cancel",
//       async () => {
//         const update = await updatePatients(buttonName, id);
//         dispatch(removeUserData())
//         setPatients((prevPatients) =>
//           prevPatients.map((patient) =>
//             patient._id === id ? { ...patient, isUserBlocked: !patient.isUserBlocked } : patient
//           )
//         );

//         Notiflix.Notify.success(`Patient has been ${action}ed successfully.`);
//       },
//       () => {
//         Notiflix.Notify.failure("Action canceled.");
//       },
//       {
//         okButtonBackground: okButtonColor, // Dynamically set button color
//         cancelButtonBackground: "#6c757d",
//       }
//     );
//   };


//   return (
//     <div className="p-4">
//       <table className="w-full border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border p-2">Name</th>
//             <th className="border p-2">Email</th>
//             <th className="border p-2">Contact Number</th>
//             <th className="border p-2">Block/Unblock Patient</th>
//           </tr>
//         </thead>
//         <tbody>
//           {patients.map((patient) => (
//             <tr key={patient._id} className="text-center">
//               <td className="border p-2">{patient.name}</td>
//               <td className="border p-2">{patient.email}</td>
//               <td className="border p-2">{patient.mobile}</td>
//               <td className="border p-2">
//                 <button
//                   className={`px-4 py-2 text-white rounded ${patient.isUserBlocked ? "bg-red-500" : "bg-green-500"}`}
//                   onClick={(e) => {
//                     const buttonName = e.currentTarget.textContent!;
//                     toggleBlock(buttonName, patient._id!);
//                   }}
//                 >
//                   {patient.isUserBlocked ? "Unblock" : "Block"}
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default BlockUnblockPatients;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import { useState, useEffect } from "react";
import Notiflix from "notiflix";
import { getPatientData, updatePatients } from "src/services/admin/adminApi";
import { removeUserData } from "src/Redux/Slice/userSlice";
import { useDispatch } from "react-redux";

export interface IMedicalRecords {
  fileName: string;
  fileUrl: string;
  uploadDate: Date;
}

export interface IUserAuth {
  _id?: string;
  name: string;
  email: string;
  mobile: string;
  password?: string;
  dob?: Date;
  profileIMG?: string;
  walletBalance?: number;
  medicalRecords?: IMedicalRecords[];
  isUserBlocked?: boolean;
}

const BlockUnblockPatients = () => {
  const [patients, setPatients] = useState<IUserAuth[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 7;

  const dispatch = useDispatch();

  useEffect(() => {
    const getUserData = async () => {
      const data: any = await getPatientData();
      setPatients(data.data);
    };
    getUserData();
  }, []);

  const toggleBlock = async (buttonName: string, id: string) => {
    const action = buttonName === "Block" ? "block" : "unblock";
    const okButtonColor = action === "block" ? "#d33" : "#28a745";

    Notiflix.Confirm.show(
      "Are you sure?",
      `Do you want to ${action} this patient?`,
      `Yes, ${action}!`,
      "Cancel",
      async () => {
        const update = await updatePatients(buttonName, id);
        // console.log(action);
        if (action === "block") {
          dispatch(removeUserData());

        }
        setPatients((prevPatients) =>
          prevPatients.map((patient) =>
            patient._id === id ? { ...patient, isUserBlocked: !patient.isUserBlocked } : patient
          )
        );
        Notiflix.Notify.success(`Patient has been ${action}ed successfully.`);
      },
      () => {
        Notiflix.Notify.failure("Action canceled.");
      },
      {
        okButtonBackground: okButtonColor,
        cancelButtonBackground: "#6c757d",
      }
    );
  };

  // Pagination logic
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = patients.slice(indexOfFirstPatient, indexOfLastPatient);
  const totalPages = Math.ceil(patients.length / patientsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-4">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Contact Number</th>
            <th className="border p-2">Block/Unblock Patient</th>
          </tr>
        </thead>
        <tbody>
          {currentPatients.map((patient) => (
            <tr key={patient._id} className="text-center">
              <td className="border p-2">{patient.name}</td>
              <td className="border p-2">{patient.email}</td>
              <td className="border p-2">{patient.mobile}</td>
              <td className="border p-2">
                <button
                  className={`px-4 py-2 text-white rounded ${patient.isUserBlocked ? "bg-red-500" : "bg-green-500"}`}
                  onClick={(e) => {
                    const buttonName = e.currentTarget.textContent!;
                    toggleBlock(buttonName, patient._id!);
                  }}
                >
                  {patient.isUserBlocked ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlockUnblockPatients;
