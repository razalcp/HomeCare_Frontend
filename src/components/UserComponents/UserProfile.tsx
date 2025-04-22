
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { updateUserProfile } from "src/services/user/userApi";
import userProfileImage from '../../assets/userProfile.jpg';
import userApi from "src/utils/axios/axiosConfig";
import { toast } from 'sonner';
import * as Yup from 'yup'; // Import Yup



const validationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[A-Za-z]+(?:\s[A-Za-z]+)?$/, "Enter a valid Name")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .matches(/^([a-zA-Z][a-zA-Z0-9._-]*)@(gmail\.com|yahoo\.com|outlook\.com)$/, "Invalid email format")
    .required("Email is required"),
  mobile: Yup.string()
    .matches(/^(?!0{10})[6789]\d{9}$/, "Phone number must be valid 10 digit Indian number")
    .required("Phone number is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters long, include one uppercase letter, one number, and one special character"
    )

});

const UserProfile = () => {
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function getUserData() {
      const localUser = localStorage.getItem("userInfo");
      if (localUser) {
        try {
          const parsedUser = JSON.parse(localUser);
          const getUser = await userApi.get(`/getUser/${parsedUser.email}`);
          console.log("user from database", getUser);
          setUserData(getUser.data);
        } catch (error) {
          console.error("Failed to parse userInfo from localStorage", error);
        }
      }
    }
    getUserData();
  }, []);

  const handleSubmit = async (values) => {
    console.log("Form Values", values);

    const form = new FormData();
    form.append("name", values.name);
    form.append("email", values.email);
    form.append("mobile", values.mobile);
    if (values.password) {
      form.append("password", values.password);
    }
    if (values.profileImage instanceof File) {
      form.append("profileImage", values.profileImage);
    }

    try {
      console.log("form after update", form);

      const updatedData = await updateUserProfile(form);
      console.log("Updated User Data:", updatedData);

      if (typeof updatedData === "object" && updatedData !== null) {
        setUserData((prevData) => ({
          ...prevData,
          ...updatedData,
        }));
        toast.success("Profile updated successfully!");
      } else {
        console.error("updatedData is not a valid object", updatedData);
        toast.error("Failed to update profile. Please try again.");
      }

      setIsEditing(false);
    } catch (error) {
      console.error("User Update Failed:", error);
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
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <Formik
        enableReinitialize
        initialValues={{
          profileImage: userData?.profileIMG || "",
          name: userData?.name || "",
          email: userData?.email || "",
          mobile: userData?.mobile || "",
          password: "",
        }}
        validationSchema={validationSchema} // Add validation schema here
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form className="space-y-4">
            <div className="text-center">
              <label htmlFor="profileImageUpload" className="cursor-pointer">
                <img
                  src={
                    values.profileImage instanceof File
                      ? URL.createObjectURL(values.profileImage)
                      : values.profileImage || userProfileImage
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
              <label className="block font-semibold">Name:</label>
              <Field
                name="name"
                type="text"
                className="border p-2 w-full"
                disabled={!isEditing}
              />
              {errors.name && touched.name && (
                <div className="text-red-500 text-sm">{errors.name}</div>
              )}
            </div>

            <div>
              <label className="block font-semibold">Email:</label>
              <Field
                name="email"
                type="email"
                className="border p-2 w-full"
                disabled={!isEditing}
              />
              {errors.email && touched.email && (
                <div className="text-red-500 text-sm">{errors.email}</div>
              )}
            </div>

            <div>
              <label className="block font-semibold">Mobile:</label>
              <Field
                name="mobile"
                type="text"
                className="border p-2 w-full"
                disabled={!isEditing}
              />
              {errors.mobile && touched.mobile && (
                <div className="text-red-500 text-sm">{errors.mobile}</div>
              )}
            </div>

            {isEditing && (
              <div>
                <label className="block font-semibold">Change Password:</label>
                <Field
                  name="password"
                  type="password"
                  className="border p-2 w-full"
                />
                {errors.password && touched.password && (
                  <div className="text-red-500 text-sm">{errors.password}</div>
                )}
              </div>
            )}

            {isEditing ? (
              <div className="flex space-x-2">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserProfile;
