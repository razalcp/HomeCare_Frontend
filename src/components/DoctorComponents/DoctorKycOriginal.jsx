// import InputComponent from "@components/DoctorComponents/InputComponent";
// import KycDropDown from "@components/DoctorComponents/KycDropDownComponentMultipleSelection";
// import { useRef, useState } from "react";
// import doctorProfileImage from 'src/assets/female-doctor-hospital-with-stethoscope_profile-image.jpg'
// // import { FaUpload } from "react-icons/fa";
// // import {FcUpload} from 'react-icons/fc';
// import { GiCloudUpload } from "react-icons/gi";

// const DoctorKyc = () => {

//     const inputRef = useRef(null)

//     const handleUpload = () => {
//         inputRef.current.click()
//     }


//     const [doctorData, setDoctorData] = useState({
//         city: "",
//         state: "",
//         zipcode: "",
//         country: [],
//         departments: [],
//         experience: [],
//         dateOfBirth: "",
//         bio: "",
//         knownLanguages: [],
//         degree: "",
//         institution: "",
//         year: "",
//         medicalLicenceNumber: "",
//         consultationType: [],
//         consultationFee: "",
//         certifications: [],
//     });

//     const handleDobChange = (dob) => { };

//     const handleBioChange = (bio) => { };

//     const handleDegreeChange = (degree) => { };

//     const handleInstitutionChange = (institution) => { };

//     const handleYearChange = (year) => { };

//     const handleCertificationsChange = (certificate) => { };

//     const handleSubmit = (form) => { };

//     return (
//         <>
//             <div
//                 id="doctor-kyc"
//                 className="border-4 border-gray-400  justify-center ml-[470px] mt-10 h-[1880px]] w-[600px]"
//             >

//                 <div id="kyc-heading" className="ml-[10.5rem] mt-4 mb-[3rem]">
//                     <h1 className="ml-[17px]">Submit Your KYC Here To Continue</h1>
//                 </div>

//                 <div id="form-container mt-[2rem]">
//                     <form onSubmit={handleSubmit} />

//                     <div id="profile-image" className="flex flex-col items-center justify-center gap-[2rem] w-full h-[11rem]">
//                         <figure className="w-[10rem] h-[10rem] object-cover rounded-full">
//                             <img src={doctorProfileImage} className="w-[10rem] h-[10rem] object-cover object-right rounded-full" />
//                         </figure>
//                         <div className="">
//                             {/* <FaUpload onClick={handleUpload} /> */}

//                             {/* <FcUpload onClick={handleUpload}/> */}

//                             <GiCloudUpload onClick={handleUpload} color="red" className="size-12 animate-bounce" />
//                             <span>Upload Image</span>
//                             <input type='file'
//                                 id="change-profile-image"
//                                 className="h-[2rem] w-[7.5rem] border border-black hidden"
//                                 ref={inputRef}
//                             />
//                         </div>

//                     </div>

//                     <div id="general-details" className="mt-20 ml-2">
//                         <h3>General Details</h3>
//                     </div>

//                     <div id="flex-container-line-1-parent" className="flex">
//                         <div id="flex-item-city-container" className="mt-5 ml-8">
//                             <div id="city-field-container">
//                                 <div id="city-label-container">
//                                     <label htmlFor="city-field">
//                                         City{" "}
//                                         <span id="city-asterix" className="text-xl text-amber-600  ">
//                                             *
//                                         </span>
//                                     </label>
//                                 </div>
//                                 <InputComponent name="name" value={doctorData.name} />
//                             </div>
//                         </div>

//                         <div id="flex-item-state-container" className="ml-20 mt-[21px]">
//                             <div id="state-field-container">
//                                 <div id="state-label-container">
//                                     <label htmlFor="state-field">
//                                         State <span className="text-xl text-amber-600">*</span>
//                                     </label>
//                                 </div>
//                                 <InputComponent name="state" value={doctorData.state} />
//                             </div>
//                         </div>
//                     </div>

//                     <div id="flex-container-line-2-parent" className="flex">
//                         <div id="flex-item-zipcode-container" className="mt-5 ml-8">
//                             <div id="zipcode-field-container">
//                                 <div id="zipcode-label-container">
//                                     <label htmlFor="zipcode-field">
//                                         Zipcode{" "}
//                                         <span id="city-asterix" className="text-xl text-amber-600">
//                                             *
//                                         </span>
//                                     </label>
//                                 </div>
//                                 <InputComponent name="zipcode" value={doctorData.zipcode} />
//                             </div>
//                         </div>

//                         <div id="flex-item-country-container" className="ml-20 mt-[21px]">
//                             <div id="country-field-container">
//                                 <div id="country-label-container">
//                                     <label htmlFor="country-field">
//                                         Country <span className="text-xl text-amber-600">*</span>
//                                     </label>
//                                 </div>
//                                 <KycDropDown
//                                     name="country"
//                                     value={doctorData.country}
//                                     setterFunction={setDoctorData}
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     <div id="flex-container-line-3-parent" className="flex">
//                         <div id="flex-item-departments-container" className="mt-5 ml-8">
//                             <div id="departments-field-container">
//                                 <div id="departments-label-container">
//                                     <label htmlFor="departments-field">
//                                         Department's{" "}
//                                         <span
//                                             id="departments-asterix"
//                                             className="text-xl text-amber-600"
//                                         >
//                                             *
//                                         </span>
//                                     </label>
//                                 </div>
//                                 <KycDropDown
//                                     name="departments"
//                                     value={doctorData.departments}
//                                     setterFunction={setDoctorData}
//                                 />
//                             </div>
//                         </div>

//                         <div id="flex-item-experience-container"
//                             className="ml-20 mt-[21px]">
//                             <div id="experience-field-container">
//                                 <div id="experience-label-container">
//                                     <label htmlFor="experience-field">
//                                         Experience <span className="text-xl text-amber-600">*</span>
//                                     </label>
//                                 </div>
//                                 <KycDropDown
//                                     name="experience"
//                                     value={doctorData.experience}
//                                     setterFunction={setDoctorData}
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     <div id="flex-container-line-4-parent" className="flex">
//                         <div id="flex-item-date-of-birth-container" className="mt-5 ml-8">
//                             <div id="date-of-birth-field-container">
//                                 <div id="date-of-birth-label-container">
//                                     <label htmlFor="date-of-birth-field">
//                                         Date Of Birth{" "}
//                                         <span
//                                             id="date-of-birth-asterix"
//                                             className="text-xl  text-amber-600"
//                                         >
//                                             *
//                                         </span>
//                                     </label>
//                                 </div>
//                                 <input
//                                     type="date"
//                                     name="dateOfBirth"
//                                     value={doctorData.dateOfBirth}
//                                     onChange={handleDobChange}
//                                     id="date-of-birth-field"
//                                     className="border border-slate-500 h-[2.25rem] w-[14.25rem]"
//                                     placeholder="Enter DOB"
//                                 />
//                             </div>
//                         </div>

//                         <div id="flex-item-bio-container" className="ml-20 mt-[21px]">
//                             <div id="bio-label-container">
//                                 <label htmlFor="bio-field">
//                                     Bio{" "}
//                                     <span id="bio-asterix" className="text-xl  text-amber-600">
//                                         *
//                                     </span>
//                                 </label>
//                             </div>
//                             <input
//                                 type="text"
//                                 name="bio"
//                                 value={doctorData.bio}
//                                 onChange={handleBioChange}
//                                 id="bio-field"
//                                 className="border border-slate-500 h-[8rem] w-[14.25rem]"
//                                 placeholder="Enter Your Bio Here"
//                             />
//                         </div>
//                     </div>

//                     <div id="line-5-parent-container" className="mt-5 ml-8">
//                         <div id="known-languages-label-container">
//                             <label htmlFor="languages-drop-down">
//                                 Known Languages{" "}
//                                 <span
//                                     id="known-languages-asterix"
//                                     className="text-xl  text-amber-600"
//                                 >
//                                     *
//                                 </span>
//                             </label>
//                         </div>
//                         <KycDropDown
//                             name="knownLanguages"
//                             value={doctorData.knownLanguages}
//                             setterFunction={setDoctorData}
//                         />

//                         <div id="flex-container-selected-languages" className="flex mt-4">

//                         </div>
//                     </div>

//                     <div id="line-6-parent-container" className="mt-5 ml-8">
//                         <div id="education-label-container">
//                             <label>
//                                 {" "}
//                                 Education{" "}
//                                 <span
//                                     id="education-asterix"
//                                     className="text-xl  text-amber-600"
//                                 >
//                                     *
//                                 </span>{" "}
//                             </label>
//                         </div>

//                         <div id="flex-container-education" className="flex ml-2">
//                             <div id="flex-item-degree">
//                                 <input
//                                     id="degree-input"
//                                     type="text"
//                                     name="degree"
//                                     onChange={handleDegreeChange}
//                                     value={doctorData.degree}
//                                     placeholder="Degree"
//                                     className="h-[2rem] w-44 border border-slate-500 ml-[-7px]"
//                                 />
//                             </div>

//                             <div id="flex-item-institution" className="">
//                                 <input
//                                     id="institution-input"
//                                     type="text"
//                                     name="institution"
//                                     onChange={handleInstitutionChange}
//                                     value={doctorData.institution}
//                                     placeholder="Institution"
//                                     className="h-[2rem] w-44 border border-slate-500 ml-3"
//                                 />
//                             </div>

//                             <div id="flex-item-year">
//                                 <input
//                                     id="year-input"
//                                     type="number"
//                                     name="year"
//                                     onChange={handleYearChange}
//                                     value={doctorData.year}
//                                     placeholder="Year"
//                                     className="h-[2rem] w-44 border border-slate-500 ml-3"
//                                 />
//                             </div>
//                         </div>

//                         <h2 className="text-blue-600 mt-1">Add Education</h2>
//                     </div>

//                     <div id="professional-details" className="mt-7 ml-2">
//                         <h3>Professional Details</h3>
//                     </div>

//                     <div id="flex-container-line-7-parent" className="flex">
//                         <div
//                             id="flex-item-medical-licence-number-container"
//                             className="mt-5 ml-8"
//                         >
//                             <div id="medical-licence-number-field-container">
//                                 <div id="medical-licence-number-label-container">
//                                     <label htmlFor="medical-licence-number-field">
//                                         Medical Licence Number{" "}
//                                         <span
//                                             id="medical-licence-asterix"
//                                             className="text-xl  text-amber-600"
//                                         >
//                                             *
//                                         </span>
//                                     </label>
//                                 </div>
//                                 <InputComponent
//                                     name="medicalLicenceNumber"
//                                     value={doctorData.medicalLicenceNumber}
//                                 />
//                             </div>
//                         </div>

//                         <div
//                             id="flex-item-consultation-type-container"
//                             className="ml-20 mt-[21px]"
//                         >
//                             <div id="consultation-type-field-container">
//                                 <div id="consultation-type-label-container">
//                                     <label htmlFor="consultation-type-field">
//                                         {" "}
//                                         Consultation Type Offered{" "}
//                                         <span
//                                             id="consultation-type-asterix"
//                                             className="text-xl  text-amber-600"
//                                         >
//                                             *
//                                         </span>{" "}
//                                     </label>
//                                 </div>
//                                 <KycDropDown
//                                     name="consultationType"
//                                     value={doctorData.consultationType}
//                                     setterFunction={setDoctorData}
//                                 />
//                                 <div
//                                     id="flex-container-selected-consultation-type"
//                                     className="mt-4"
//                                 >

//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div id="line-8-parent">
//                         <div id="consultation-fee-field-container" className="mt-5 ml-8">
//                             <div id="consultation-fee-label">
//                                 <label htmlFor="consultation-fee-label">
//                                     Consultation Fee{" "}
//                                     <span
//                                         id="consultation-fee-asterix"
//                                         className="text-xl text-amber-600"
//                                     >
//                                         *
//                                     </span>{" "}
//                                 </label>
//                             </div>
//                             <InputComponent
//                                 name="consultationFee"
//                                 value={doctorData.consultationFee}
//                             // style={"mt-8"}
//                             />
//                         </div>
//                     </div>

//                     <div id="line-9-certifications-parent">
//                         <div id="certifications-field-container" className="mt-8 ml-[31px]">
//                             <div id="certifications-label">
//                                 <label htmlFor="certifications-field">
//                                     Certifications{" "}
//                                     <span
//                                         id="certifications-asterix"
//                                         className="text-xl text-amber-600"
//                                     >
//                                         *
//                                     </span>
//                                 </label>
//                             </div>
//                             <input
//                                 id="certifications-input"
//                                 type="file"
//                                 name="certifications"
//                                 onChange={handleCertificationsChange}
//                                 value={doctorData.certifications}
//                                 className="border border-slate-500 h-[2.25rem] w-[14.25rem]"
//                             />
//                         </div>
//                     </div>

//                     <div className="mt-[100px] ml-[134px]" id="submit-button">
//                         <button
//                             type="button"
//                             className="h-[34px] w-[20rem] border border-black "
//                         >
//                             Submit
//                         </button>
//                     </div>

//                     <form />
//                 </div>
//             </div>
//         </>
//     );
// };

// export default DoctorKyc;



//////////////////////////////////////////////////////////////////////////////////////////////////////////


import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputComponent from "@components/DoctorComponents/InputComponent";
import KycDropDown from "@components/DoctorComponents/KycDropDownComponentMultipleSelection";
import { useRef } from "react";
import doctorProfileImage from 'src/assets/female-doctor-hospital-with-stethoscope_profile-image.jpg';
import { GiCloudUpload } from "react-icons/gi";

import { toast } from 'sonner'
import { doctorApi } from '../../utils/axios/axiosConfig'

import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addData } from '../../utils/doctorSlice'
import doctorServ from '../../services/doctor/doctorapi'
import { useNavigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const DoctorKycOriginal = () => {
    const dispatch = useDispatch()
    const inputRef = useRef(null);
    const doctor = useSelector((store) => store.doctor)
    const navigate = useNavigate()

    // doctorServ().then((response)=>{
    //     console.log(response.data);

    // })
    const validationSchema = Yup.object({
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        zipcode: Yup.string().required('Zipcode is required'),
        country: Yup.array().min(1, 'Please select at least one country'),
        departments: Yup.array().min(1, 'Please select at least one department'),
        experience: Yup.array().min(1, 'Please select experience'),
        dateOfBirth: Yup.string().required('Date of birth is required'),
        bio: Yup.string().required('Bio is required'),
        knownLanguages: Yup.array().min(1, 'Please select at least one language'),
        degree: Yup.string().required('Degree is required'),
        institution: Yup.string().required('Institution is required'),
        year: Yup.string().required('Year is required'),
        medicalLicenceNumber: Yup.string().required('Medical license number is required'),
        consultationType: Yup.array().min(1, 'Please select at least one consultation type'),
        consultationFee: Yup.string().required('Consultation fee is required'),
        certifications: Yup.array(),
    });

    const formik = useFormik({
        initialValues: {
            city: "",
            state: "",
            zipcode: "",
            country: "",
            departments: [],
            experience:[],
            dateOfBirth: "",
            bio: "",
            knownLanguages: [],
            degree: "",
            institution: "",
            year: "",
            medicalLicenceNumber: "",
            consultationType: [],
            consultationFee: "",
            certifications: [],
            profileImage: null
        },
        validationSchema,

        onSubmit: (values) => {
            console.log("Kyc on Submit ", values);

            const form = new FormData()

            form.append("city", formik.values.city);


            form.append("state", formik.values.state);
            form.append("zipcode", formik.values.zipcode);
            form.append("country", formik.values.country);

            formik.values.departments.forEach((dept, index) => {
                console.log(index, dept)
                form.append(`departments[${index}]`, dept.value);
            });

            // form.append("experience", formik.values.experience);

            formik.values.experience.forEach((exp, index) => {
                form.append(`experience[${index}]`, exp.value);
            });

            form.append("dateOfBirth", formik.values.dateOfBirth);
            form.append("bio", formik.values.bio);
            formik.values.knownLanguages.forEach((lang, index) => {
                form.append(`knownLanguages[${index}]`, lang.value);
            });
            form.append("degree", formik.values.degree);
            form.append("institution", formik.values.institution);
            form.append("year", formik.values.year);
            form.append("medicalLicenceNumber", formik.values.medicalLicenceNumber);
            formik.values.consultationType.forEach((type, index) => {
                form.append(`consultationType[${index}]`, type.value);
            });
            form.append("consultationFee", formik.values.consultationFee);

            // Append certifications (if multiple files)
            formik.values.certifications.forEach((cert, index) => {
                form.append(`certifications${index}`, cert);
            });

            // Append profile image (if exists)
            if (formik.values.profileImage) {
                form.append("profileImage", formik.values.profileImage);
            }




            // console.log("This is form ", form)
            for (let pair of form.entries()) {
                console.log(pair[0], pair[1]);
            }


            doctorServ(form).then((response) => {
                console.log("Response", response.data);

            })
            // console.log("on submit");
            navigate('/doctorSuccess', { replace: true })



        },
    });

    const handleUpload = () => {
        inputRef.current.click();
    };

    // const handleAddItem = () => {
    //     dispatch(addItem({ name: "JohnDoe" }))
    // }

    // const doctorName = useSelector((store) => { store.doctorData.kyc })
    return (
        <div className="border-4 border-gray-400 justify-center ml-[470px] mt-10 w-[625px] p-6">
            <div className="ml-[10.5rem] mt-4 mb-[3rem]">
                <h1 className="ml-[17px]">Submit Your KYC Here To Continue</h1>
            </div>

            <form onSubmit={formik.handleSubmit}>
                {/* Profile Image Section */}
                <div className="flex flex-col items-center justify-center gap-[2rem] w-full h-[11rem]">
                    <figure className="w-[10rem] h-[10rem] object-cover rounded-full">
                        <img src={doctorProfileImage} className="w-[10rem] h-[10rem] object-cover object-right rounded-full" alt="profile" />
                    </figure>
                    <div>
                        {/* <div>
                            <button onClick={handleAddItem}>Add</button>
                            <h1> Hi -- {store.doctorData.kyc.name}</h1>
                        </div> */}

                        <GiCloudUpload onClick={handleUpload} color="teal" className="size-12 animate-bounce" />
                        <span>Upload Image</span>
                        <input
                            type="file"
                            className="h-[2rem] w-[7.5rem] border border-black hidden"
                            ref={inputRef}
                            onChange={(event) => {
                                formik.setFieldValue("profileImage", event.currentTarget.files[0]);
                            }}
                        />
                    </div>
                </div>

                <div className="mt-20 ml-2">
                    <h3>General Details</h3>
                </div>

                {/* City and State */}
                <div className="flex">
                    <div className="mt-5 ml-8">
                        <div>
                            <label htmlFor="city">
                                City <span className="text-xl text-amber-600">*</span>
                            </label>
                            <InputComponent
                                name="city"
                                value={formik.values.city}
                                onChange={(e) => {
                                    console.log("City value:", e.target.value);
                                    formik.setFieldValue('city', e.target.value)
                                }}
                            />
                            {formik.touched.city && formik.errors.city && (
                                <div className="text-red-500">{formik.errors.city}</div>
                            )}
                        </div>
                    </div>

                    <div className="ml-20 mt-[21px]">
                        <div>
                            <label htmlFor="state">
                                State <span className="text-xl text-amber-600">*</span>
                            </label>
                            <InputComponent
                                name="state"
                                value={formik.values.state}
                                onChange={(e) => formik.setFieldValue('state', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Zipcode and Country */}
                <div className="flex">
                    <div className="mt-5 ml-8">
                        <div>
                            <label htmlFor="zipcode">
                                Zipcode <span className="text-xl text-amber-600">*</span>
                            </label>
                            <InputComponent
                                name="zipcode"
                                value={formik.values.zipcode}
                                onChange={(e) => formik.setFieldValue('zipcode', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="ml-20 mt-[21px]">
                        <div>
                            <label htmlFor="country">
                                Country <span className="text-xl text-amber-600">*</span>
                            </label>
                            <KycDropDown
                                name="country"
                                value={formik.values.country}
                                onChange={(selected) => formik.setFieldValue('country', selected)}
                            />
                        </div>
                    </div>
                </div>

                {/* Departments and Experience */}
                <div className="flex">
                    <div className="mt-5 ml-8">
                        <div>
                            <label htmlFor="departments">
                                Department's <span className="text-xl text-amber-600">*</span>
                            </label>
                            <KycDropDown
                                name="departments"
                                value={formik.values.departments}
                                onChange={(selected) => formik.setFieldValue('departments', selected)}
                            />
                        </div>
                    </div>

                    <div className="ml-20 mt-[21px]">
                        <div>
                            <label htmlFor="experience">
                                Experience <span className="text-xl text-amber-600">*</span>
                            </label>
                            <KycDropDown
                                name="experience"
                                value={formik.values.experience}
                                onChange={(selected) => formik.setFieldValue('experience', selected)}
                            />
                          
                        </div>
                    </div>
                </div>

                {/* Date of Birth and Bio */}
                <div className="flex">
                    <div className="mt-5 ml-8">
                        <div>
                            <label htmlFor="dateOfBirth">
                                Date Of Birth <span className="text-xl text-amber-600">*</span>
                            </label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={formik.values.dateOfBirth}
                                onChange={formik.handleChange}
                                className="border border-slate-500 h-[2.25rem] w-[14.25rem]"
                            />
                        </div>
                    </div>

                    <div className="ml-20 mt-[21px]">
                        <div>
                            <label htmlFor="bio">
                                Bio <span className="text-xl text-amber-600">*</span>
                            </label>
                            <input
                                type="text"
                                name="bio"
                                value={formik.values.bio}
                                onChange={formik.handleChange}
                                className="border border-slate-500 h-[8rem] w-[14.25rem]"
                                placeholder="Enter Your Bio Here"
                            />
                        </div>
                    </div>
                </div>

                {/* Known Languages */}
                <div className="mt-5 ml-8">
                    <div>
                        <label htmlFor="knownLanguages">
                            Known Languages <span className="text-xl text-amber-600">*</span>
                        </label>
                        <KycDropDown
                            name="knownLanguages"
                            value={formik.values.knownLanguages}
                            onChange={(selected) => formik.setFieldValue('knownLanguages', selected)}
                        />
                    </div>
                </div>

                {/* Education Section */}
                <div className="mt-5 ml-8">
                    <div>
                        <label>
                            Education <span className="text-xl text-amber-600">*</span>
                        </label>
                        <div className="flex ml-2">
                            <input
                                type="text"
                                name="degree"
                                value={formik.values.degree}
                                onChange={formik.handleChange}
                                placeholder="Degree"
                                className="h-[2rem] w-44 border border-slate-500 ml-[-7px]"
                            />
                            <input
                                type="text"
                                name="institution"
                                value={formik.values.institution}
                                onChange={formik.handleChange}
                                placeholder="Institution"
                                className="h-[2rem] w-44 border border-slate-500 ml-3"
                            />
                            <input
                                type="number"
                                name="year"
                                value={formik.values.year}
                                onChange={formik.handleChange}
                                placeholder="Year"
                                className="h-[2rem] w-44 border border-slate-500 ml-3"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-7 ml-2">
                    <h3>Professional Details</h3>
                </div>

                {/* Medical License and Consultation Type */}
                <div className="flex">
                    <div className="mt-5 ml-8">
                        <div>
                            <label htmlFor="medicalLicenceNumber">
                                Medical Licence Number <span className="text-xl text-amber-600">*</span>
                            </label>
                            <InputComponent
                                name="medicalLicenceNumber"
                                value={formik.values.medicalLicenceNumber}
                                onChange={(e) => formik.setFieldValue('medicalLicenceNumber', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="ml-20 mt-[21px]">
                        <div>
                            <label htmlFor="consultationType">
                                Consultation Type Offered <span className="text-xl text-amber-600">*</span>
                            </label>
                            <KycDropDown
                                name="consultationType"
                                value={formik.values.consultationType}
                                onChange={(selected) => formik.setFieldValue('consultationType', selected)}
                            />
                        </div>
                    </div>
                </div>

                {/* Consultation Fee */}
                <div className="mt-5 ml-8">
                    <div>
                        <label htmlFor="consultationFee">
                            Consultation Fee <span className="text-xl text-amber-600">*</span>
                        </label>
                        <InputComponent
                            name="consultationFee"
                            value={formik.values.consultationFee}
                            onChange={(e) => formik.setFieldValue('consultationFee', e.target.value)}
                        />
                    </div>
                </div>

                {/* Certifications */}
                <div className="mt-8 ml-[31px]">
                    <div>
                        <label htmlFor="certifications">
                            Certifications <span className="text-xl text-amber-600">*</span>
                        </label>
                        <input
                            type="file"
                            name="certifications"
                            onChange={(event) => {
                                formik.setFieldValue("certifications", Array.from(event.currentTarget.files));
                            }}
                            className="border border-slate-500 h-[2.25rem] w-[14.25rem]"
                            multiple
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-[100px] ml-[134px]">
                    <button
                        type="submit"
                        className="h-[34px] w-[20rem] border border-black"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DoctorKycOriginal;