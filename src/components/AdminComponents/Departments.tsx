
// import React, { useState, useEffect } from "react";
// import { adminDepartmentServ, getDepartments, updateListUnlistServ } from "src/services/admin/adminApi";
// import Notiflix from "notiflix";

// const Departments = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [newDepartment, setNewDepartment] = useState("");
//     const [departments, setDepartments] = useState<string[]>([]);
//     const [fetchedDepartments, setFetchedDepartments] = useState<{ _id: string; departmentName: string; isListed: boolean; __v: number }[]>([]);
//     const [deptData, setDeptData] = useState<{ _id: string; departmentName: string; isListed: boolean; __v: number }[]>([]);

//     // Pagination states
//     const [currentPage, setCurrentPage] = useState(1);
//     const departmentsPerPage = 5;

//     useEffect(() => {
//         const data = getDepartments();
//         data.then(async (result) => {
//             const depart = result?.data?.data;
//             await setDeptData(depart);
//         });
//     }, []);

//     const handleAddDepartment = async () => {
//         if (newDepartment.trim()) {
//             const result = await adminDepartmentServ(newDepartment);
//             const resultArray = result?.data?.data;
//             await setFetchedDepartments(resultArray);
//             setNewDepartment("");
//             setIsModalOpen(false);
//             setCurrentPage(1); // Reset to first page after add
//         }
//     };

//     const handleClick = async (clickedDepartment: string, btnName: string) => {
//         const isUnlist = btnName === "Unlist";

//         Notiflix.Confirm.init({
//             okButtonBackground: isUnlist ? "#dc2626" : "#16a34a",
//             okButtonColor: "#ffffff",
//             okButtonBackground: isUnlist ? "#b91c1c" : "#15803d",
//         });

//         Notiflix.Confirm.show(
//             "Are you sure?",
//             `Do you want to ${isUnlist ? `Unlist ${clickedDepartment}` : `List ${clickedDepartment}`} department?`,
//             isUnlist ? "Yes, Unlist it!" : "Yes, List it!",
//             "Cancel",
//             async () => {
//                 try {
//                     const changeListOrUnlist = await updateListUnlistServ(clickedDepartment);
//                     const updateList = changeListOrUnlist?.data?.data;
//                     await setFetchedDepartments(updateList);
//                     Notiflix.Notify.success(
//                         `The ${clickedDepartment} department has been ${isUnlist ? "Unlisted" : "Listed"} successfully.`
//                     );
//                 } catch (error) {
//                     Notiflix.Notify.failure("Something went wrong while updating.");
//                 }
//             }
//         );
//     };

//     // Determine which data to show
//     const activeDepartments = fetchedDepartments.length > 0 ? fetchedDepartments : deptData;

//     // Pagination logic
//     const indexOfLastDept = currentPage * departmentsPerPage;
//     const indexOfFirstDept = indexOfLastDept - departmentsPerPage;
//     const currentDepartments = activeDepartments.slice(indexOfFirstDept, indexOfLastDept);
//     const totalPages = Math.ceil(activeDepartments.length / departmentsPerPage);

//     const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

//     return (
//         <div className="p-6 bg-white rounded-lg shadow-md">
//             <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-semibold">Departments</h2>
//                 <button
//                     onClick={() => setIsModalOpen(true)}
//                     className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
//                 >
//                     + Add Department
//                 </button>
//             </div>

//             <table className="w-full border-collapse border border-gray-300">
//                 <thead>
//                     <tr className="bg-gray-200">
//                         <th className="border p-3 text-left">#</th>
//                         <th className="border p-3 text-left">Department Name</th>
//                         <th className="border p-3 text-left">Status</th>
//                         <th className="border p-3 text-left">Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {currentDepartments.length > 0 ? (
//                         currentDepartments.map((department, index) => (
//                             <tr key={department._id} className="border">
//                                 <td className="border p-3">{indexOfFirstDept + index + 1}</td>
//                                 <td className="border p-3">{department.departmentName}</td>
//                                 <td className={`border p-3 ${department.isListed ? "text-green-600" : "text-red-600"}`}>
//                                     {department.isListed ? "Listed" : "Unlisted"}
//                                 </td>
//                                 <td className="border p-3">
//                                     <button
//                                         onClick={(e) => handleClick(department.departmentName, e.currentTarget.innerText)}
//                                         className={`w-20 px-4 py-2 text-white font-semibold rounded text-center ${department.isListed ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
//                                     >
//                                         {department.isListed ? "Unlist" : "List"}
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan={4} className="border p-3 text-center text-gray-500">No departments added yet</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>

//             {/* Pagination Controls */}
//             {activeDepartments.length > departmentsPerPage && (
//                 <div className="flex justify-center mt-4 space-x-2">
//                     {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
//                         <button
//                             key={number}
//                             onClick={() => paginate(number)}
//                             className={`px-3 py-1 rounded ${
//                                 number === currentPage
//                                     ? "bg-teal-600 text-white"
//                                     : "bg-gray-200 hover:bg-gray-300"
//                             }`}
//                         >
//                             {number}
//                         </button>
//                     ))}
//                 </div>
//             )}

//             {isModalOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//                     <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
//                         <h3 className="text-lg font-semibold mb-4">Add New Department</h3>
//                         <input
//                             type="text"
//                             value={newDepartment}
//                             onChange={(e) => setNewDepartment(e.target.value)}
//                             className="w-full border p-2 rounded-md mb-4"
//                             placeholder="Enter department name"
//                         />
//                         <div className="flex justify-end space-x-2">
//                             <button
//                                 onClick={() => setIsModalOpen(false)}
//                                 className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleAddDepartment}
//                                 className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
//                             >
//                                 Add
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Departments;


// import React, { useState, useEffect } from "react";
// import { adminDepartmentServ, getDepartments, updateListUnlistServ } from "src/services/admin/adminApi";
// import Notiflix from "notiflix";

// const Departments = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [newDepartment, setNewDepartment] = useState("");
//     const [departments, setDepartments] = useState([]);
//     const [totalPages, setTotalPages] = useState(1);
//     const [currentPage, setCurrentPage] = useState(1);
//     const departmentsPerPage = 5;

//     const fetchDepartments = async (page: number) => {
//         try {
//             const result = await getDepartments(page, departmentsPerPage);
//             const { data, totalPages } = result.data;
//             setDepartments(data);
//             setTotalPages(totalPages);
//         } catch (error) {
//             Notiflix.Notify.failure("Failed to fetch departments.");
//         }
//     };

//     useEffect(() => {
//         fetchDepartments(currentPage);
//     }, [currentPage]);

//     // const handleAddDepartment = async () => {
//     //     if (newDepartment.trim()) {
//     //         const result = await adminDepartmentServ(newDepartment);
//     //         Notiflix.Notify.success("Department added.");
//     //         setNewDepartment("");
//     //         setIsModalOpen(false);
//     //         setCurrentPage(1);
//     //         fetchDepartments(1); // Reset to page 1
//     //     }
//     // };

//     const handleAddDepartment = async () => {
//         if (newDepartment.trim()) {
//             // Check if department already exists (case-insensitive)
//             const isDuplicate = departments.some(
//                 (dept) => dept.departmentName.toLowerCase() === newDepartment.trim().toLowerCase()
//             );

//             if (isDuplicate) {
//                 Notiflix.Notify.failure("Department already added.");
//                 return;
//             }

//             try {
//                 const result = await adminDepartmentServ(newDepartment);
//                 Notiflix.Notify.success("Department added.");
//                 setNewDepartment("");
//                 setIsModalOpen(false);
//                 setCurrentPage(1);
//                 fetchDepartments(1); // Reset to page 1
//             } catch (error) {
//                 Notiflix.Notify.failure("Failed to add department.");
//             }
//         }
//     };

//     const handleClick = async (clickedDepartment: string, btnName: string) => {
//         const isUnlist = btnName === "Unlist";

//         Notiflix.Confirm.init({
//             okButtonBackground: isUnlist ? "#dc2626" : "#16a34a",
//             okButtonColor: "#ffffff",
//         });

//         Notiflix.Confirm.show(
//             "Are you sure?",
//             `Do you want to ${isUnlist ? `Unlist` : `List`} ${clickedDepartment}?`,
//             isUnlist ? "Yes, Unlist it!" : "Yes, List it!",
//             "Cancel",
//             async () => {
//                 try {
//                     await updateListUnlistServ(clickedDepartment);
//                     Notiflix.Notify.success(`The ${clickedDepartment} department has been ${isUnlist ? "Unlisted" : "Listed"} successfully.`);
//                     fetchDepartments(currentPage); // Refresh
//                 } catch (error) {
//                     Notiflix.Notify.failure("Something went wrong while updating.");
//                 }
//             }
//         );
//     };

//     return (
//         <div className="p-6 bg-white rounded-lg shadow-md">
//             <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-semibold">Departments</h2>
//                 <button
//                     onClick={() => setIsModalOpen(true)}
//                     className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
//                 >
//                     + Add Department
//                 </button>
//             </div>

//             <table className="w-full border-collapse border border-gray-300">
//                 <thead>
//                     <tr className="bg-gray-200">
//                         <th className="border p-3 text-left">#</th>
//                         <th className="border p-3 text-left">Department Name</th>
//                         <th className="border p-3 text-left">Status</th>
//                         <th className="border p-3 text-left">Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {departments.length > 0 ? (
//                         departments.map((department, index) => (
//                             <tr key={department._id} className="border">
//                                 <td className="border p-3">{(currentPage - 1) * departmentsPerPage + index + 1}</td>
//                                 <td className="border p-3">{department.departmentName}</td>
//                                 <td className={`border p-3 ${department.isListed ? "text-green-600" : "text-red-600"}`}>
//                                     {department.isListed ? "Listed" : "Unlisted"}
//                                 </td>
//                                 <td className="border p-3">
//                                     <button
//                                         onClick={(e) => handleClick(department.departmentName, e.currentTarget.innerText)}
//                                         className={`w-20 px-4 py-2 text-white font-semibold rounded text-center ${department.isListed ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
//                                             }`}
//                                     >
//                                         {department.isListed ? "Unlist" : "List"}
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan={4} className="border p-3 text-center text-gray-500">No departments added yet</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>

//             {totalPages > 1 && (
//                 <div className="flex justify-center mt-4 space-x-2">
//                     {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
//                         <button
//                             key={number}
//                             onClick={() => setCurrentPage(number)}
//                             className={`px-3 py-1 rounded ${number === currentPage
//                                     ? "bg-teal-600 text-white"
//                                     : "bg-gray-200 hover:bg-gray-300"
//                                 }`}
//                         >
//                             {number}
//                         </button>
//                     ))}
//                 </div>
//             )}

//             {isModalOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//                     <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
//                         <h3 className="text-lg font-semibold mb-4">Add New Department</h3>
//                         <input
//                             type="text"
//                             value={newDepartment}
//                             onChange={(e) => setNewDepartment(e.target.value)}
//                             className="w-full border p-2 rounded-md mb-4"
//                             placeholder="Enter department name"
//                         />
//                         <div className="flex justify-end space-x-2">
//                             <button
//                                 onClick={() => setIsModalOpen(false)}
//                                 className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleAddDepartment}
//                                 className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
//                             >
//                                 Add
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Departments;


/////////////////////////////////////

import React, { useState, useEffect } from "react";
import { adminDepartmentServ, getDepartments, updateListUnlistServ } from "src/services/admin/adminApi";
import Notiflix from "notiflix";
import { editDepartmentServ } from "src/services/doctor/doctorapi";

const Departments = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newDepartment, setNewDepartment] = useState("");
    const [departments, setDepartments] = useState([]);
    const [allDepartments, setAllDepartments] = useState([]); // ✅ for duplicate check
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [editDepartmentId, setEditDepartmentId] = useState<string | null>(null);
    const [editDepartmentName, setEditDepartmentName] = useState("");

    const departmentsPerPage = 5;

    // ✅ Fetch paginated departments for display
    const fetchDepartments = async (page: number) => {
        try {
            const result = await getDepartments(page, departmentsPerPage);
            const { data, totalPages } = result.data;
            setDepartments(data);
            setTotalPages(totalPages);
        } catch (error) {
            Notiflix.Notify.failure("Failed to fetch departments.");
        }
    };

    // ✅ Fetch all departments (unpaginated) for checking duplicates
    const fetchAllDepartments = async () => {
        try {
            const result = await getDepartments(page, departmentsPerPage); // assuming this returns all if no pagination params passed
            const { data } = result.data;
            setAllDepartments(data);
        } catch (error) {
            console.error("Failed to fetch all departments for duplicate check");
        }
    };

    useEffect(() => {
        fetchDepartments(currentPage);
    }, [currentPage]);

    useEffect(() => {
        fetchAllDepartments();
    }, []);

    const handleEditDepartment = async () => {
        if (editDepartmentName.trim()) {
            try {
                // Check for duplicate (excluding current item)
                const isDuplicate = allDepartments.some(
                    (dept: any) =>
                        dept.departmentName.toLowerCase() === editDepartmentName.trim().toLowerCase() &&
                        dept._id !== editDepartmentId
                );

                if (isDuplicate) {
                    Notiflix.Notify.failure("Department name already exists.");
                    return;
                }
                console.log(editDepartmentId!, editDepartmentName.trim());

                await editDepartmentServ(editDepartmentId!, editDepartmentName.trim());
                Notiflix.Notify.success("Department updated.");
                setEditDepartmentId(null);
                setEditDepartmentName("");
                setIsModalOpen(false);
                fetchDepartments(currentPage);
                fetchAllDepartments();
            } catch (error) {
                Notiflix.Notify.failure("Failed to update department.");
            }
        }
    };


    const handleAddDepartment = async () => {
        if (newDepartment.trim()) {
            const isDuplicate = allDepartments.some(
                (dept: any) => dept.departmentName.toLowerCase() === newDepartment.trim().toLowerCase()
            );

            if (isDuplicate) {
                Notiflix.Notify.failure("Department already added.");
                return;
            }

            try {
                await adminDepartmentServ(newDepartment);
                Notiflix.Notify.success("Department added.");
                setNewDepartment("");
                setIsModalOpen(false);
                setCurrentPage(1);
                await fetchDepartments(1);
                await fetchAllDepartments(); // ✅ update after add
            } catch (error) {
                Notiflix.Notify.failure("Failed to add department.");
            }
        }
    };

    const handleClick = async (clickedDepartment: string, btnName: string) => {
        const isUnlist = btnName === "Unlist";

        Notiflix.Confirm.init({
            okButtonBackground: isUnlist ? "#dc2626" : "#16a34a",
            okButtonColor: "#ffffff",
        });

        Notiflix.Confirm.show(
            "Are you sure?",
            `Do you want to ${isUnlist ? `Unlist` : `List`} ${clickedDepartment}?`,
            isUnlist ? "Yes, Unlist it!" : "Yes, List it!",
            "Cancel",
            async () => {
                try {
                    await updateListUnlistServ(clickedDepartment);
                    Notiflix.Notify.success(`The ${clickedDepartment} department has been ${isUnlist ? "Unlisted" : "Listed"} successfully.`);
                    fetchDepartments(currentPage);
                    fetchAllDepartments(); // ✅ also update full list
                } catch (error) {
                    Notiflix.Notify.failure("Something went wrong while updating.");
                }
            }
        );
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Departments</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
                >
                    + Add Department
                </button>
            </div>

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-3 text-left">#</th>
                        <th className="border p-3 text-left">Department Name</th>
                        <th className="border p-3 text-left">Status</th>
                        <th className="border p-3 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.length > 0 ? (
                        departments.map((department, index) => (
                            <tr key={department._id} className="border">
                                <td className="border p-3">{(currentPage - 1) * departmentsPerPage + index + 1}</td>
                                <td className="border p-3">{department.departmentName}</td>
                                <td className={`border p-3 ${department.isListed ? "text-green-600" : "text-red-600"}`}>
                                    {department.isListed ? "Listed" : "Unlisted"}
                                </td>

                                <td className="border p-3 space-x-2">
                                    <button
                                        onClick={(e) => handleClick(department.departmentName, e.currentTarget.innerText)}
                                        className={`w-20 px-4 py-2 text-white font-semibold rounded ${department.isListed
                                            ? "bg-red-500 hover:bg-red-600"
                                            : "bg-green-500 hover:bg-green-600"
                                            }`}
                                    >
                                        {department.isListed ? "Unlist" : "List"}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setEditDepartmentId(department._id);
                                            setEditDepartmentName(department.departmentName);
                                            setIsModalOpen(true);
                                        }}
                                        className="w-20 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
                                    >
                                        Edit
                                    </button>
                                </td>



                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="border p-3 text-center text-gray-500">
                                No departments added yet
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {totalPages > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                        <button
                            key={number}
                            onClick={() => setCurrentPage(number)}
                            className={`px-3 py-1 rounded ${number === currentPage ? "bg-teal-600 text-white" : "bg-gray-200 hover:bg-gray-300"
                                }`}
                        >
                            {number}
                        </button>
                    ))}
                </div>
            )}

            {/* {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h3 className="text-lg font-semibold mb-4">Add New Department</h3>
                        <input
                            type="text"
                            value={newDepartment}
                            onChange={(e) => setNewDepartment(e.target.value)}
                            className="w-full border p-2 rounded-md mb-4"
                            placeholder="Enter department name"
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddDepartment}
                                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )} */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h3 className="text-lg font-semibold mb-4">
                            {editDepartmentId ? "Edit Department" : "Add New Department"}
                        </h3>
                        <input
                            type="text"
                            value={editDepartmentId ? editDepartmentName : newDepartment}
                            onChange={(e) =>
                                editDepartmentId
                                    ? setEditDepartmentName(e.target.value)
                                    : setNewDepartment(e.target.value)
                            }
                            className="w-full border p-2 rounded-md mb-4"
                            placeholder="Enter department name"
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setEditDepartmentId(null);
                                    setEditDepartmentName("");
                                    setNewDepartment("");
                                }}
                                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={editDepartmentId ? handleEditDepartment : handleAddDepartment}
                                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                            >
                                {editDepartmentId ? "Update" : "Add"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Departments;
