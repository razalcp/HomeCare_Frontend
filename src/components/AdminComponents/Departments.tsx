// import React, { useState, useEffect } from "react";
// import { adminDepartmentServ, getDepartments, updateListUnlistServ } from "src/services/admin/adminApi";
// import Swal from "sweetalert2";
// const Departments = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [newDepartment, setNewDepartment] = useState("");
//     const [departments, setDepartments] = useState<string[]>([])
//     const [fetchedDepartments, setFetchedDepartments] = useState<{ _id: string; departmentName: string; isListed: boolean; __v: number }[]>([]);
//     const [deptData, setDeptData] = useState<{ _id: string; departmentName: string; isListed: boolean; __v: number }[]>([]);

//     useEffect(() => {
//         const data = getDepartments()


//         data.then(async (result) => {
//             const depart = result?.data?.data
//             // console.log(depart);

//             await setDeptData(depart)


//         })

//     }, [])

//     const handleAddDepartment = async () => {
//         if (newDepartment.trim()) {

//             const result = await adminDepartmentServ(newDepartment)

//             console.log("backendData ", result);
//             const resultArray = result?.data?.data
//             await setFetchedDepartments(resultArray)

//             setNewDepartment("");
//             setIsModalOpen(false);
//         }
//     };


//     // const handleClick = async (clickedDepartment: String) => {

//     //     const changeListOrUnlist = await updateListUnlistServ(clickedDepartment)
//     //     console.log("changeListOrUnList", changeListOrUnlist);
//     //     const updateList = changeListOrUnlist?.data?.data
//     //     await setFetchedDepartments(updateList)
//     // }

//     const handleClick = async (clickedDepartment: string, btnName: String) => {
//         // console.log(btnName);

//         Swal.fire({
//             title: "Are you sure?",
//             text: `Do you want to ${btnName === "Unlist" ? `Unlist ${clickedDepartment}` : `List ${clickedDepartment}`} department ?`,
//             icon: "question",
//             showCancelButton: true,
//             confirmButtonColor: "#0D9488",
//             cancelButtonColor: "#aaa",
//             confirmButtonText: btnName === "Unlist" ? "Yes, Unlist it!" : "Yes, List it!",
//         }).then(async (result) => {
//             if (result.isConfirmed) {
//                 try {
//                     const changeListOrUnlist = await updateListUnlistServ(clickedDepartment);
//                     console.log("changeListOrUnlist", changeListOrUnlist);
//                     const updateList = changeListOrUnlist?.data?.data;
//                     await setFetchedDepartments(updateList);

//                     Swal.fire({
//                         title: "Updated!",
//                         text: `The ${clickedDepartment} department has been ${btnName === "Unlist" ? "Unlisted" : "Listed"} successfully.`,
//                         icon: "success",
//                     });
//                 } catch (error) {
//                     Swal.fire({
//                         title: "Error!",
//                         text: "Something went wrong while updating.",
//                         icon: "error",
//                     });
//                 }
//             }
//         });
//     };


//     return (
//         <div className="p-6 bg-white rounded-lg shadow-md">
//             {/* Header with Add Button */}
//             <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-semibold">Departments</h2>
//                 <button
//                     onClick={() => setIsModalOpen(true)}
//                     className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
//                 >
//                     + Add Department
//                 </button>
//             </div>

//             {/* Table */}
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
//                     {fetchedDepartments.length > 0 ? (
//                         fetchedDepartments.map((department, index) => (
//                             <tr key={index} className="border">
//                                 <td className="border p-3">{index + 1}</td>
//                                 <td className="border p-3">{department.departmentName}</td>
//                                 <td className={`border p-3 ${department.isListed ? "text-green-600" : "text-red-600"}`}>
//                                     {department.isListed ? "Listed" : "Unlisted"}
//                                 </td>
//                                 <td className="border p-3">
//                                     <button onClick={(e) => {

//                                         handleClick(department.departmentName, e.currentTarget.innerText)

//                                     }}
//                                         className={`w-20 px-4 py-2 text-white font-semibold rounded text-center ${department.isListed ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
//                                             }`}
//                                     >
//                                         {department.isListed ? "Unlist" : "List"}
//                                     </button>

//                                 </td>
//                             </tr>
//                         ))
//                     ) : deptData.length > 0 ? (
//                         deptData.map((department, index) => (
//                             <tr key={index} className="border">
//                                 <td className="border p-3">{index + 1}</td>
//                                 <td className="border p-3">{department.departmentName}</td>
//                                 <td className={`border p-3 ${department.isListed ? "text-green-600" : "text-red-600"}`}>
//                                     {department.isListed ? "Listed" : "Unlisted"}
//                                 </td>
//                                 <td className="border p-3">
//                                     <button onClick={(e) => {
//                                         handleClick(department.departmentName, e.currentTarget.innerText)


//                                     }}
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
//                             <td colSpan={4} className="border p-3 text-center text-gray-500">
//                                 No departments added yet
//                             </td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>


//             {/* Modal */}
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

// export default Departments



import React, { useState, useEffect } from "react";
import { adminDepartmentServ, getDepartments, updateListUnlistServ } from "src/services/admin/adminApi";
import Notiflix from "notiflix";

const Departments = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newDepartment, setNewDepartment] = useState("");
    const [departments, setDepartments] = useState<string[]>([]);
    const [fetchedDepartments, setFetchedDepartments] = useState<{ _id: string; departmentName: string; isListed: boolean; __v: number }[]>([]);
    const [deptData, setDeptData] = useState<{ _id: string; departmentName: string; isListed: boolean; __v: number }[]>([]);

    useEffect(() => {
        const data = getDepartments();
        data.then(async (result) => {
            const depart = result?.data?.data;
            await setDeptData(depart);
        });
    }, []);

    const handleAddDepartment = async () => {
        if (newDepartment.trim()) {
            const result = await adminDepartmentServ(newDepartment);
            console.log("backendData ", result);
            const resultArray = result?.data?.data;
            await setFetchedDepartments(resultArray);
            setNewDepartment("");
            setIsModalOpen(false);
        }
    };


    const handleClick = async (clickedDepartment: string, btnName: string) => {
        const isUnlist = btnName === "Unlist";

        // Dynamically set button color based on action
        Notiflix.Confirm.init({
            okButtonBackground: isUnlist ? "#dc2626" : "#16a34a", // Red for Unlist, Green for List
            okButtonColor: "#ffffff", // White text
            okButtonBackground: isUnlist ? "#b91c1c" : "#15803d", // Darker red/green on hover
        });

        Notiflix.Confirm.show(
            "Are you sure?",
            `Do you want to ${isUnlist ? `Unlist ${clickedDepartment}` : `List ${clickedDepartment}`} department?`,
            isUnlist ? "Yes, Unlist it!" : "Yes, List it!",
            "Cancel",
            async () => {
                try {
                    const changeListOrUnlist = await updateListUnlistServ(clickedDepartment);
                    const updateList = changeListOrUnlist?.data?.data;
                    await setFetchedDepartments(updateList);

                    Notiflix.Notify.success(
                        `The ${clickedDepartment} department has been ${isUnlist ? "Unlisted" : "Listed"} successfully.`
                    );
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
                    {fetchedDepartments.length > 0 ? (
                        fetchedDepartments.map((department, index) => (
                            <tr key={index} className="border">
                                <td className="border p-3">{index + 1}</td>
                                <td className="border p-3">{department.departmentName}</td>
                                <td className={`border p-3 ${department.isListed ? "text-green-600" : "text-red-600"}`}>
                                    {department.isListed ? "Listed" : "Unlisted"}
                                </td>
                                <td className="border p-3">
                                    <button
                                        onClick={(e) => handleClick(department.departmentName, e.currentTarget.innerText)}
                                        className={`w-20 px-4 py-2 text-white font-semibold rounded text-center ${department.isListed ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
                                    >
                                        {department.isListed ? "Unlist" : "List"}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : deptData.length > 0 ? (
                        deptData.map((department, index) => (
                            <tr key={index} className="border">
                                <td className="border p-3">{index + 1}</td>
                                <td className="border p-3">{department.departmentName}</td>
                                <td className={`border p-3 ${department.isListed ? "text-green-600" : "text-red-600"}`}>
                                    {department.isListed ? "Listed" : "Unlisted"}
                                </td>
                                <td className="border p-3">
                                    <button
                                        onClick={(e) => handleClick(department.departmentName, e.currentTarget.innerText)}
                                        className={`w-20 px-4 py-2 text-white font-semibold rounded text-center ${department.isListed ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
                                    >
                                        {department.isListed ? "Unlist" : "List"}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="border p-3 text-center text-gray-500">No departments added yet</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {isModalOpen && (
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
            )}
        </div>
    );
};

export default Departments;

