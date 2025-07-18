
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { updateDoctorProfile } from "src/services/doctor/doctorapi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/Redux/appStore";
import { addDoctorData } from "src/Redux/Slice/doctorSlice";
import { toast } from "sonner";

const DoctorProfile = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    // Get doctor data from Redux or fallback to location.state
    const reduxDoctor = useSelector((state: RootState) => state.doctor.doctorInfo);
    const initialDoctorData = reduxDoctor || location.state?.doctorData;

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

        try {
            const updatedData = await updateDoctorProfile(form);
            console.log("Updated Profile Data:", updatedData);

            // ✅ Update Redux state
            dispatch(addDoctorData(updatedData));

            // ✅ Update local component state
            setDoctorData((prevData) => ({
                ...prevData,
                ...updatedData,
            }));
            toast.success("Profile updated successfully!", {
                position: "top-center",
                duration: 5000,
            });

            setIsEditing(false);
        } catch (error) {
            console.error("Update Failed:", error);
            toast.error("Failed to update profile. Please try again.", {
                position: "top-center",
                duration: 5000,
            });
        }
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: Function) => {
        const file = event.target.files?.[0];
        if (file) {
            setFieldValue("profileImage", file);
        }
    };

    return (
        <div className="mt-10 p-6 max-w-lg mx-auto bg-white shadow-2xl rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Doctor Profile</h1>
            <Formik
                initialValues={{
                    profileImage: doctorData?.profileImage || "",
                    email: doctorData?.email || "",
                    dateOfBirth: doctorData?.dateOfBirth || "",
                    experience: doctorData?.experience || "",
                    bio: doctorData?.bio || ""
                }}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({ values, setFieldValue }) => (
                    <Form className="space-y-4">
                        <div className="text-center">
                            <label htmlFor="profileImageUpload" className="cursor-pointer">
                                <img
                                    src={
                                        values.profileImage instanceof File
                                            ? URL.createObjectURL(values.profileImage)
                                            : values.profileImage
                                    }
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full mx-auto mb-4"
                                />
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

