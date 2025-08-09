import { useState, useEffect, useRef } from "react";
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
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const patientsPerPage = 7;

  const dispatch = useDispatch();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const fetchPatients = async (page: number, searchTerm: string = "") => {
    try {
      const data = await getPatientData(page, patientsPerPage, searchTerm);
      setPatients(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to fetch patients", error);
    }
  };

  // Debounced effect for search input
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      fetchPatients(currentPage, search);
    }, 1000);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search, currentPage]);

  const toggleBlock = async (buttonName: string, id: string) => {
    const action = buttonName === "Block" ? "block" : "unblock";
    const okButtonColor = action === "block" ? "#d33" : "#28a745";

    Notiflix.Confirm.show(
      "Are you sure?",
      `Do you want to ${action} this patient?`,
      `Yes, ${action}!`,
      "Cancel",
      async () => {
        try {
          await updatePatients(buttonName, id);
          if (action === "block") {
            dispatch(removeUserData());
          }
          fetchPatients(currentPage, search); // Refresh after toggle
          Notiflix.Notify.success(`Patient has been ${action}ed successfully.`);
        } catch (error) {
          Notiflix.Notify.failure("Something went wrong.");
        }
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

  return (
    <div className="p-4">
      <div className="p-4 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold mb-4 text-center">Patient Management</h2>
      </div>
      {/* Search input */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search by name, email, or mobile"
          className="p-2 border rounded w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button
            onClick={() => {
              setSearch("");
              setCurrentPage(1);
            }}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Clear
          </button>
        )}
      </div>

      {/* Table */}
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
          {patients.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center p-4">
                No patients found.
              </td>
            </tr>
          ) : (
            patients.map((patient) => (
              <tr key={patient._id} className="text-center">
                <td className="border p-2">{patient.name}</td>
                <td className="border p-2">{patient.email}</td>
                <td className="border p-2">{patient.mobile}</td>
                <td className="border p-2">
                  <button
                    className={`px-4 py-2 text-white rounded ${patient.isUserBlocked ? "bg-red-500" : "bg-green-500"
                      }`}
                    onClick={(e) => {
                      const buttonName = e.currentTarget.textContent!;
                      toggleBlock(buttonName, patient._id!);
                    }}
                  >
                    {patient.isUserBlocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
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
