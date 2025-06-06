// import { useLocation } from "react-router-dom";

// const DoctorProfile = () => {
//     const location = useLocation();
//     const doctorData = location.state?.doctorData; // Retrieve the passed data
//     console.log("Inside doc profile", doctorData);

//     return (
//         <div>
//             <h1>Profile Page</h1>
//             <p>Name: {doctorData?.name}</p>
//             <p>Specialty: {doctorData?.email}</p>
//         </div>
//     );
// };

// export default DoctorProfile;




/////////////////////////////////



import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { updateDoctorProfile } from "src/services/doctor/doctorapi";
import DoctorHome from "./DoctorHome";
import { adminApi } from "src/utils/axios/axiosConfig";
import { getDoctors } from "src/services/admin/adminApi";

const DoctorProfile = () => {


    const location = useLocation();

    const initialDoctorData = location.state?.doctorData;

    const [doctorData, setDoctorData] = useState(initialDoctorData);

    const [isEditing, setIsEditing] = useState(false);

    const handleSubmit = async (values: any) => {
        const form = new FormData();
        form.append("email", values.email);
        form.append("dateOfBirth", values.dateOfBirth);
        form.append("experience", values.experience);
        form.append("bio", values.bio);
        if (values.profileImage instanceof File) {
            form.append("profileImage", values.profileImage);
        }

        console.log("Updated Data:", Object.fromEntries(form));
        setIsEditing(false);
        // Here you can send the form data to your backend API
        // updateDoctorProfile(form)
        //     .then((updatedData) => {
        //         console.log("Updated Profile Data:", updatedData);
        //         setIsEditing(false);
        //     })
        //     .catch((error) => {
        //         console.error("Update Failed:", error);
        //     });
        try {
            const updatedData = await updateDoctorProfile(form);
            console.log("Updated Profile Data:", updatedData);


            setDoctorData((prevData) => ({
                ...prevData,
                ...updatedData,
            }));

            setIsEditing(false);
        } catch (error) {
            console.error("Update Failed:", error);
        }
    };

    const handleImageUpload = (event, setFieldValue) => {
        const file = event.target.files[0];
        if (file) {
            setFieldValue("profileImage", file);
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Doctor Profile</h1>
            <Formik initialValues={{
                profileImage: doctorData?.profileImage || "",
                email: doctorData?.email || "",
                dateOfBirth: doctorData?.dateOfBirth || "",
                experience: doctorData?.experience || "",
                bio: doctorData?.bio || ""
            }}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue }) => (
                    <Form className="space-y-4">
                        <div className="text-center">
                            <label htmlFor="profileImageUpload" className="cursor-pointer">
                                <img src={values.profileImage instanceof File ? URL.createObjectURL(values.profileImage) : values.profileImage} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-4" />
                            </label>
                            {isEditing && (
                                <input
                                    id="profileImageUpload"
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => handleImageUpload(event, setFieldValue)}
                                    className="border p-2 w-full"
                                />
                            )}
                        </div>

                        <div>
                            <label className="block font-semibold">Email:</label>
                            <Field name="email" type="email" className="border p-2 w-full" disabled={!isEditing} />
                        </div>

                        <div>
                            <label className="block font-semibold">Date of Birth:</label>
                            <Field name="dateOfBirth" type="date" className="border p-2 w-full" disabled={!isEditing} />
                        </div>

                        <div>
                            <label className="block font-semibold">Experience:</label>
                            <Field name="experience" as="textarea" className="border p-2 w-full" disabled={!isEditing} />
                        </div>

                        <div>
                            <label className="block font-semibold">Bio:</label>
                            <Field name="bio" as="textarea" className="border p-2 w-full" disabled={!isEditing} />
                        </div>

                        {isEditing ? (
                            <div className="flex space-x-2">
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                                <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                            </div>
                        ) : (
                            <button type="button" onClick={() => setIsEditing(true)} className="bg-green-500 text-white px-4 py-2 rounded">Edit</button>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default DoctorProfile;
