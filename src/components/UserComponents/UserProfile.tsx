
// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { Formik, Form, Field } from "formik";
// import { updateUserProfile } from "src/services/user/userApi";
// import userProfileImage from '../../assets/userProfile.jpg';
// import userApi from "src/utils/axios/axiosConfig";
// import { toast } from 'sonner';
// import * as Yup from 'yup'; // Import Yup
// import Select from 'react-select';
// import CreatableSelect from 'react-select/creatable';


// export interface IMedicalRecord {
//   fileName?: string;
//   fileUrl?: string;
//   uploadDate?: Date;
// }

// export interface IUserModel {
//   _id?: string;
//   name: string;
//   email: string;
//   mobile: string;
//   password?: string;
//   dob?: Date;
//   profileIMG?: File | string;
//   walletBalance?: number;
//   medicalRecords?: IMedicalRecord[];
//   isUserBlocked?: boolean;

//   // Additional fields used in frontend form
//   gender?: 'Male' | 'Female' | 'Other';
//   age?: number;
//   bloodGroup?: string;
//   allergies?: string[];
//   currentMedications?: string[];
// }



// const validationSchema = Yup.object({
//   name: Yup.string()
//     .matches(/^[A-Za-z]+(?:\s[A-Za-z]+)?$/, "Enter a valid Name")
//     .required("Name is required"),
//   email: Yup.string()
//     .email("Invalid email address")
//     .matches(/^([a-zA-Z][a-zA-Z0-9._-]*)@(gmail\.com|yahoo\.com|outlook\.com)$/, "Invalid email format")
//     .required("Email is required"),
//   mobile: Yup.string()
//     .matches(/^(?!0{10})[6789]\d{9}$/, "Phone number must be valid 10 digit Indian number")
//     .required("Phone number is required"),
//   password: Yup.string()
//     .matches(
//       /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//       "Password must be at least 8 characters long, include one uppercase letter, one number, and one special character"
//     ),
//   gender: Yup.string().oneOf(['Male', 'Female', 'Other'], 'Invalid gender'),
//   age: Yup.number().min(0, "Invalid age").max(120, "Unrealistic age"),
//   bloodGroup: Yup.string().matches(/^(A|B|AB|O)[+-]$/, 'Invalid blood group'),
//   allergies: Yup.array().of(Yup.string()),
//   currentMedications: Yup.array().of(Yup.string())



// });

// const UserProfile = () => {
//   const location = useLocation();
//   const [userData, setUserData] = useState<IUserModel | null>(null);
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     async function getUserData() {
//       const localUser = localStorage.getItem("userInfo");
//       if (localUser) {
//         try {
//           const parsedUser = JSON.parse(localUser);
//           const getUser = await userApi.get(`/getUser/${parsedUser.email}`);
//           console.log("user from database", getUser);
//           setUserData(getUser.data as any);
//         } catch (error) {
//           console.error("Failed to parse userInfo from localStorage", error);
//         }
//       }
//     }
//     getUserData();
//   }, []);

//   const handleSubmit = async (values :any) => {
//     console.log("Form Values", values);

//     const form = new FormData();
//     form.append("name", values.name);
//     form.append("email", values.email);
//     form.append("mobile", values.mobile);
//     if (values.password) {
//       form.append("password", values.password);
//     }
//     if (values.profileImage instanceof File) {
//       form.append("profileImage", values.profileImage);
//     }
//     form.append("gender", values.gender);
//     form.append("age", values.age);
//     form.append("bloodGroup", values.bloodGroup);
//     values.allergies.forEach((allergy: any) => {
//       form.append("allergies", allergy);
//     });

//     values.currentMedications.forEach((med : any) => {
//       form.append("currentMedications", med); // appending each medication to FormData
//     });




//     try {
//       console.log("form after update", form);

//       const updatedData = await updateUserProfile(form);
//       console.log("Updated User Data:", updatedData);

//       if (typeof updatedData === "object" && updatedData !== null) {
//         setUserData((prevData) => ({
//           ...(prevData as any),
//           ...updatedData,
//         }));
//         toast.success("Profile updated successfully!");
//       } else {
//         console.error("updatedData is not a valid object", updatedData);
//         toast.error("Failed to update profile. Please try again.");
//       }

//       setIsEditing(false);
//     } catch (error) {
//       console.error("User Update Failed:", error);
//     }
//   };

//   const handleImageUpload = (event: any, setFieldValue: any) => {
//     const file = event.target.files[0];
//     if (file) {
//       setFieldValue("profileImage", file);
//     }
//   };

//   return (
//     <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
//       <h1 className="text-2xl font-bold mb-4">My Profile</h1>
//       <Formik
//         enableReinitialize
//         initialValues={{
//           profileImage: userData?.profileIMG || "",
//           name: userData?.name || "",
//           email: userData?.email || "",
//           mobile: userData?.mobile || "",
//           password: "",
//           gender: userData?.gender || "",
//           age: userData?.age || "",
//           bloodGroup: userData?.bloodGroup || "",
//           allergies: userData?.allergies || [],
//           currentMedications: userData?.currentMedications || [],  // Ensure this is properly populated
//         }}

//         validationSchema={validationSchema} // Add validation schema here
//         onSubmit={handleSubmit}
//       >
//         {({ values, setFieldValue, errors, touched }) => (
//           <Form className="space-y-4">
//             <div className="text-center">
//               <label htmlFor="profileImageUpload" className="cursor-pointer">
//                 <img
//                   src={
//                     values.profileImage instanceof File
//                       ? URL.createObjectURL(values.profileImage)
//                       : values.profileImage || userProfileImage
//                   }
//                   alt="Profile"
//                   className="w-32 h-32 rounded-full mx-auto mb-4"
//                 />
//               </label>
//               {isEditing && (
//                 <input
//                   id="profileImageUpload"
//                   type="file"
//                   accept="image/*"
//                   onChange={(event) => handleImageUpload(event, setFieldValue)}
//                   className="border p-2 w-full"
//                 />
//               )}
//             </div>

//             <div>
//               <label className="block font-semibold">Name:</label>
//               <Field
//                 name="name"
//                 type="text"
//                 className="border p-2 w-full"
//                 disabled={!isEditing}
//               />
//               {errors.name && touched.name && (
//                 <div className="text-red-500 text-sm">{errors.name}</div>
//               )}
//             </div>

//             <div>
//               <label className="block font-semibold">Email:</label>
//               <Field
//                 name="email"
//                 type="email"
//                 className="border p-2 w-full"
//                 disabled={!isEditing}
//               />
//               {errors.email && touched.email && (
//                 <div className="text-red-500 text-sm">{errors.email}</div>
//               )}
//             </div>

//             <div>
//               <label className="block font-semibold">Mobile:</label>
//               <Field
//                 name="mobile"
//                 type="text"
//                 className="border p-2 w-full"
//                 disabled={!isEditing}
//               />
//               {errors.mobile && touched.mobile && (
//                 <div className="text-red-500 text-sm">{errors.mobile}</div>
//               )}
//             </div>

//             {isEditing && (
//               <div>
//                 <label className="block font-semibold">Change Password:</label>
//                 <Field
//                   name="password"
//                   type="password"
//                   className="border p-2 w-full"
//                 />
//                 {errors.password && touched.password && (
//                   <div className="text-red-500 text-sm">{errors.password}</div>
//                 )}
//               </div>
//             )}
//             <div>
//               <label className="block font-semibold">Gender:</label>
//               <Field as="select" name="gender" className="border p-2 w-full" disabled={!isEditing}>
//                 <option value="">Select</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </Field>
//               {errors.gender && touched.gender && (
//                 <div className="text-red-500 text-sm">{errors.gender}</div>
//               )}
//             </div>

//             <div>
//               <label className="block font-semibold">Age:</label>
//               <Field name="age" type="number" className="border p-2 w-full" disabled={!isEditing} />
//               {errors.age && touched.age && (
//                 <div className="text-red-500 text-sm">{errors.age}</div>
//               )}
//             </div>

//             <div>
//               <label className="block font-semibold">Blood Group:</label>
//               <Field name="bloodGroup" type="text" className="border p-2 w-full" disabled={!isEditing} />
//               {errors.bloodGroup && touched.bloodGroup && (
//                 <div className="text-red-500 text-sm">{errors.bloodGroup}</div>
//               )}
//             </div>



//             <div>
//               <label className="block font-semibold mb-1">Known Allergies:</label>
//               <Select
//                 isMulti
//                 name="allergies"
//                 options={[
//                   { value: 'Peanuts', label: 'Peanuts' },
//                   { value: 'Seafood', label: 'Seafood' },
//                   { value: 'Milk', label: 'Milk' },
//                   { value: 'Eggs', label: 'Eggs' },
//                   { value: 'Pollen', label: 'Pollen' },
//                   { value: 'Dust', label: 'Dust' },
//                   { value: 'Latex', label: 'Latex' },
//                   { value: 'Penicillin', label: 'Penicillin' },
//                 ]}
//                 isDisabled={!isEditing}
//                 className="basic-multi-select"
//                 classNamePrefix="select"
//                 value={values.allergies.map((a) => ({ value: a, label: a }))}
//                 onChange={(selectedOptions) => {
//                   const selectedValues = selectedOptions.map((option) => option.value);
//                   setFieldValue("allergies", selectedValues);
//                 }}
//               />
//               {errors.allergies && touched.allergies && (
//                 <div className="text-red-500 text-sm">{errors.allergies}</div>
//               )}
//             </div>

//             <div>
//               <label className="block font-semibold mb-1">Current Medications:</label>
//               <CreatableSelect
//                 isMulti
//                 name="currentMedications"
//                 isDisabled={!isEditing}
//                 value={values.currentMedications.map((med) => ({ value: med, label: med }))} // mapping to ensure proper select options
//                 onChange={(selectedOptions) => {
//                   const meds = selectedOptions.map((option) => option.value); // extracting selected medications
//                   setFieldValue("currentMedications", meds); // updating the form field
//                 }}
//                 className="basic-multi-select"
//                 classNamePrefix="select"
//                 placeholder="Type and press Enter to add medications"
//               />

//               {errors.currentMedications && touched.currentMedications && (
//                 <div className="text-red-500 text-sm">{errors.currentMedications}</div>
//               )}
//             </div>





//             {isEditing ? (
//               <div className="flex space-x-2">
//                 <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//                   Save
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setIsEditing(false)}
//                   className="bg-gray-500 text-white px-4 py-2 rounded"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             ) : (
//               <button
//                 type="button"
//                 onClick={() => setIsEditing(true)}
//                 className="bg-green-500 text-white px-4 py-2 rounded"
//               >
//                 Edit
//               </button>
//             )}
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default UserProfile;

/////////////////////////////////////////////


import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { updateUserProfile } from "src/services/user/userApi";
import userProfileImage from '../../assets/userProfile.jpg';
import userApi from "src/utils/axios/axiosConfig";
import { toast } from 'sonner';
import * as Yup from 'yup'; // Import Yup
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useSelector } from "react-redux";

export interface IMedicalRecord {
  fileName?: string;
  fileUrl?: string;
  uploadDate?: Date;
}

export interface IUserModel {
  _id?: string;
  name: string;
  email: string;
  mobile: string;
  password?: string;
  dob?: Date;
  profileIMG?: File | string;
  walletBalance?: number;
  medicalRecords?: IMedicalRecord[];
  isUserBlocked?: boolean;

  // Additional fields used in frontend form
  gender?: 'Male' | 'Female' | 'Other';
  age?: number;
  bloodGroup?: string;
  allergies?: string[];
  currentMedications?: string[];
}

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
    ),
  gender: Yup.string().oneOf(['Male', 'Female', 'Other'], 'Invalid gender'),
  age: Yup.number().min(0, "Invalid age").max(120, "Unrealistic age"),
  bloodGroup: Yup.string().matches(/^(A|B|AB|O)[+-]$/, 'Invalid blood group'),
  allergies: Yup.array().of(Yup.string()),
  currentMedications: Yup.array().of(Yup.string())
});

const UserProfile = () => {
  const location = useLocation();
  const [userData, setUserData] = useState<IUserModel | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [wallet, setWallet] = useState(null);
  const userInfo = useSelector((state: any) => state.user.userInfo);

  useEffect(() => {
    async function getUserData() {
      const localUser = localStorage.getItem("userInfo");
      if (localUser) {
        try {
          const parsedUser = JSON.parse(localUser);
          const getUser = await userApi.get(`/getUser/${parsedUser.email}`);
          // console.log("user from database", getUser);
          setUserData(getUser.data as any);
          const res: any = await userApi.get(`/getWalletData/${userInfo._id}`);

          setWallet(res.data as any);


        } catch (error) {
          console.error("Failed to parse userInfo from localStorage", error);
        }
      }
    }
    getUserData();
  }, []);

  const handleSubmit = async (values: any) => {
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
    form.append("gender", values.gender);
    form.append("age", values.age);
    form.append("bloodGroup", values.bloodGroup);
    values.allergies.forEach((allergy: any) => {
      form.append("allergies", allergy);
    });

    values.currentMedications.forEach((med: any) => {
      form.append("currentMedications", med); // appending each medication to FormData
    });

    try {
      console.log("form after update", form);

      const updatedData = await updateUserProfile(form);
      console.log("Updated User Data:", updatedData);

      if (typeof updatedData === "object" && updatedData !== null) {
        setUserData((prevData) => ({
          ...(prevData as any),
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

  const handleImageUpload = (event: any, setFieldValue: any) => {
    const file = event.target.files[0];
    if (file) {
      setFieldValue("profileImage", file);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col p-8 max-w-2xl mx-auto bg-white/60 backdrop-blur-md shadow-2xl rounded-2xl transition-transform hover:scale-[1.01]">

      {wallet?.balance !== undefined && (
        <div className="absolute top-4 right-4 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm shadow">
          Wallet: ₹{wallet?.balance}
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6 text-center">My Profile</h1>



      <Formik
        enableReinitialize
        initialValues={{
          profileImage: userData?.profileIMG || "",
          name: userData?.name || "",
          email: userData?.email || "",
          mobile: userData?.mobile || "",
          password: "",
          gender: userData?.gender || "",
          age: userData?.age || "",
          bloodGroup: userData?.bloodGroup || "",
          allergies: userData?.allergies || [],
          currentMedications: userData?.currentMedications || [],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form className="space-y-6">
            <div className="text-center mb-6">
              <label htmlFor="profileImageUpload" className="cursor-pointer">
                <img
                  src={values.profileImage instanceof File
                    ? URL.createObjectURL(values.profileImage)
                    : values.profileImage || userProfileImage}
                  alt="Profile"
                  className="w-40 h-40 rounded-full mx-auto mb-4 object-cover border-4 border-blue-200 shadow-md hover:scale-105 transition-transform"
                />
              </label>
              {isEditing && (
                <input
                  id="profileImageUpload"
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleImageUpload(event, setFieldValue)}
                  className="border p-2 w-full rounded-md shadow-sm"
                />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold">Name:</label>
                <Field
                  name="name"
                  type="text"
                  className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
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
                  className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
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
                  className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
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
                    className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                  />
                  {errors.password && touched.password && (
                    <div className="text-red-500 text-sm">{errors.password}</div>
                  )}
                </div>
              )}

              <div>
                <label className="block font-semibold">Gender:</label>
                <Field as="select" name="gender" className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition" disabled={!isEditing}>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Field>
                {errors.gender && touched.gender && (
                  <div className="text-red-500 text-sm">{errors.gender}</div>
                )}
              </div>

              <div>
                <label className="block font-semibold">Age:</label>
                <Field name="age" type="number" className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition" disabled={!isEditing} />
                {errors.age && touched.age && (
                  <div className="text-red-500 text-sm">{errors.age}</div>
                )}
              </div>

              <div>
                <label className="block font-semibold">Blood Group:</label>
                <Field name="bloodGroup" type="text" className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition" disabled={!isEditing} />
                {errors.bloodGroup && touched.bloodGroup && (
                  <div className="text-red-500 text-sm">{errors.bloodGroup}</div>
                )}
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">Known Allergies:</label>
              <Select
                isMulti
                name="allergies"
                options={[
                  { value: 'Peanuts', label: 'Peanuts' },
                  { value: 'Seafood', label: 'Seafood' },
                  { value: 'Milk', label: 'Milk' },
                  { value: 'Eggs', label: 'Eggs' },
                  { value: 'Pollen', label: 'Pollen' },
                  { value: 'Dust', label: 'Dust' },
                  { value: 'Latex', label: 'Latex' },
                  { value: 'Penicillin', label: 'Penicillin' },
                ]}
                isDisabled={!isEditing}
                className="basic-multi-select mt-1 rounded-md shadow-sm"
                classNamePrefix="select"
                value={values.allergies.map((a) => ({ value: a, label: a }))}
                onChange={(selectedOptions) => {
                  const selectedValues = selectedOptions.map((option) => option.value);
                  setFieldValue("allergies", selectedValues);
                }}
              />
              {errors.allergies && touched.allergies && (
                <div className="text-red-500 text-sm">{errors.allergies}</div>
              )}
            </div>

            <div>
              <label className="block font-semibold mb-1">Current Medications:</label>
              <CreatableSelect
                isMulti
                name="currentMedications"
                isDisabled={!isEditing}
                value={values.currentMedications.map((med) => ({ value: med, label: med }))}
                onChange={(selectedOptions) => {
                  const meds = selectedOptions.map((option) => option.value);
                  setFieldValue("currentMedications", meds);
                }}
                className="basic-multi-select mt-1 rounded-md shadow-sm"
                classNamePrefix="select"
                placeholder="Type and press Enter to add medications"
              />
              {errors.currentMedications && touched.currentMedications && (
                <div className="text-red-500 text-sm">{errors.currentMedications}</div>
              )}
            </div>

            {isEditing ? (
              <div className="flex space-x-4">
                <button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 text-gray-800 px-6 py-2 rounded-full shadow-md hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="bg-green-500 text-white px-6 py-2 rounded-full shadow hover:bg-green-600 transition"
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
