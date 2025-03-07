
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
import { addData } from '../../Redux/Slice/doctorSlice'
import doctorServ from '../../services/doctor/doctorapi'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { getDepartmentsServ } from '../../services/doctor/doctorapi';
import indianLanguages from 'src/helpers/indianLanguages';
import consultationType from 'src/helpers/consultationType';


const DoctorKyc = () => {

    const inputRef = useRef(null);
    const doctor = useSelector((store) => store.doctor)
    const navigate = useNavigate()
    const [countryData, setCountryData] = useState([])
    const [deptData, setDeptData] = useState([]);


    // doctorServ().then((response)=>{
    //     console.log(response.data);

    // })
    const options = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
    ];
    const validationSchema = Yup.object({
        profileImage: Yup.mixed()
            .required("Profile image is required")
            .test("fileRequired", "Profile image is required", (value) => value !== null),


        name: Yup.string()
            .matches(/^[A-Za-z]+(?:\s[A-Za-z]+)?$/, "Enter a valid Name")
            .required("Name is required"),
        email: Yup.string()
            .email("Invalid email address")
            .matches(/^([a-zA-Z][a-zA-Z0-9._-]*)@(gmail\.com|yahoo\.com|outlook\.com)$/, "Invalid email format")
            .required("Email is required"),
        state: Yup.string().matches(/^[A-Za-z]+(?:\s[A-Za-z]+)?$/, "Enter a valid State")
            .required("State is required"),
        country: Yup.string().required("Country is required"),
        departments: Yup.array().min(1, 'Please select at least one department'),
        experience: Yup.string().required('Experience is required'),
        dateOfBirth: Yup.string().required('Date of birth is required'),
        bio: Yup.string().required('Bio is required'),
        knownLanguages: Yup.array().min(1, 'Please select at least one language'),
        degree: Yup.string().matches(/^[A-Za-z]+(?:\s[A-Za-z]+)?$/, "Enter a valid Degree")
            .required("Degree is required"),

        institution: Yup.string()
            .matches(/^[A-Za-z]+(?:\s+[A-Za-z]+)*$/, "Enter a valid Institution")
            .required("Institution is required"),

        year: Yup.string().required('Year is required'),
        medicalLicenceNumber: Yup.string().required('Medical license number is required'),
        consultationType: Yup.array().min(1, 'Please select at least one consultation type'),
        consultationFee: Yup.string().required('Consultation fee is required'),
        certifications: Yup.array()
            .min(2, "Min Two Certificates are required") // Ensures at least one file is selected
            .required("Certificates are required"),

    });

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            state: "",
            country: "",
            departments: [],
            experience: "",
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

            form.append("name", formik.values.name);


            form.append("email", formik.values.email);
            form.append("state", formik.values.state);
            form.append("country", formik.values.country);

            formik.values.departments.forEach((dept, index) => {
                console.log(index, dept)
                form.append(`departments[${index}]`, dept.value);
            });

            form.append("experience", formik.values.experience);



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
                console.log("Resp--docServ", response.data);

            })
            // console.log("on submit");
            navigate('/doctorSuccess', { replace: true })



        },
    });

    useEffect(() => {
        console.log("useEffect Worked");

        formik.resetForm({
            values: formik.initialValues
        });
    }, [formik.initialValues]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch("https://restcountries.com/v3.1/all");
                const countryData = await response.json();
                // console.log(countryData);
                setCountryData(countryData)
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };

        const getDepartments = async () => {
            try {
                const deptResponse = await getDepartmentsServ()
                // console.log("inside kyc", deptResponse);
                setDeptData(deptResponse.data)



            } catch (error) {

            }
        }

        fetchCountries();
        getDepartments();
    }, []);

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
                            onBlur={() => formik.setFieldTouched("profileImage", true)}
                        />
                        {formik.touched.profileImage && formik.errors.profileImage && (
                            <div className="text-red-500">{formik.errors.profileImage}</div>
                        )}
                    </div>
                </div>

                <div className="mt-20 ml-2">
                    <h3>General Details</h3>
                </div>

                {/* name and email */}
                <div className="flex">
                    <div className="mt-5 ml-8">
                        <div>
                            <label htmlFor="name">
                                Name <span className="text-xl text-amber-600">*</span>
                            </label>
                            <InputComponent
                                name="name"
                                value={formik.values.name}
                                onChange={(e: any) => {
                                    console.log("name value:", e.target.value);
                                    formik.setFieldValue('name', e.target.value)
                                }}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <div className="text-red-500">{formik.errors.name}</div>
                            )}
                        </div>
                    </div>

                    <div className="ml-20 mt-[21px]">
                        <div>
                            <label htmlFor="email">
                                Email <span className="text-xl text-amber-600">*</span>
                            </label>
                            <InputComponent
                                name="email"
                                value={formik.values.email}
                                onChange={(e) => formik.setFieldValue('email', e.target.value)}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div className="text-red-500">{formik.errors.email}</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* state and Country */}
                <div className="flex">
                    <div className="mt-5 ml-8">
                        <div>
                            <label htmlFor="state">
                                State <span className="text-xl text-amber-600">*</span>
                            </label>
                            <InputComponent
                                name="state"
                                value={formik.values.state}
                                onChange={(e) => formik.setFieldValue('state', e.target.value)}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.state && formik.errors.state && (
                                <div className="text-red-500">{formik.errors.state}</div>
                            )}
                        </div>
                    </div>

                    <div className="ml-20 mt-[21px]">
                        <div>
                            <label htmlFor="country">
                                Country <span className="text-xl text-amber-600">*</span>
                            </label>
                            {/* <KycDropDown
                                name="country"
                                value={formik.values.country}
                                onChange={(selected) => {
                                    
                                    formik.setFieldValue('country', selected)
                                    
                                }
                                }
                                onBlur={formik.handleBlur}
                            /> */}

                            <select
                                name="country"
                                value={formik.values.country}
                                onChange={(event) => {
                                    console.log(event.target.value);

                                    formik.setFieldValue('country', event.target.value)
                                }}

                                onBlur={formik.handleBlur}
                                className="border border-slate-500 h-[2.35rem] w-[14.25rem] p-2 rounded "
                            >
                                <option value="" disabled>
                                    Select a country
                                </option>
                                {/* <option value="India">India</option>
                                <option value="Usa">USA</option>
                                <option value="Canada">Canada</option> */}
                                {countryData.map((item) => <option key={item.name.common} value={item.name.common}>{item.name.common}</option>)}
                            </select>
                            {formik.touched.country && formik.errors.country && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.country}</div>
                            )}
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
                                dept={deptData}
                                onChange={(selected) => formik.setFieldValue('departments', selected)}
                                onBlur={() => formik.setFieldTouched("departments", true)}
                            />
                            {formik.touched.departments && formik.errors.departments && (
                                <div className="text-red-500">{formik.errors.departments}</div>
                            )}
                        </div>
                    </div>

                    <div className="ml-20 mt-[21px]">
                        <div>
                            <label htmlFor="experience">
                                experience <span className="text-xl text-amber-600">*</span>
                            </label>
                            <input
                                type="text"
                                name="experience"
                                value={formik.values.experience}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="border border-slate-500 h-[8rem] w-[14.25rem]"
                                placeholder="Type Here"
                            />
                            {formik.touched.experience && formik.errors.experience && (
                                <div className="text-red-500">{formik.errors.experience}</div>
                            )}
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
                                onBlur={formik.handleBlur}
                                className="border border-slate-500 h-[2.25rem] w-[14.25rem]"
                            />
                            {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                                <div className="text-red-500">{formik.errors.dateOfBirth}</div>
                            )}
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
                                onBlur={formik.handleBlur}
                                className="border border-slate-500 h-[8rem] w-[14.25rem]"
                                placeholder="Enter Your Bio Here"
                            />
                            {formik.touched.bio && formik.errors.bio && (
                                <div className="text-red-500">{formik.errors.bio}</div>
                            )}

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
                            onBlur={() => formik.setFieldTouched("knownLanguages", true)}
                            languages={indianLanguages}
                        />
                        {formik.touched.knownLanguages && formik.errors.knownLanguages && (
                            <div className="text-red-500">{formik.errors.knownLanguages}</div>
                        )}

                    </div>
                </div>

                {/* Education Section */}
                <div className="mt-5 ml-8">
                    <div>
                        <label>
                            Education <span className="text-xl text-amber-600">*</span>
                        </label>
                        <div className="flex ml-2">


                            <div className="flex flex-col  ml-[-8px]">
                                <input
                                    type="text"
                                    name="degree"
                                    value={formik.values.degree}
                                    onChange={formik.handleChange}
                                    placeholder="Degree"
                                    className="h-[2rem] w-44 border border-slate-500"
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.degree && formik.errors.degree && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.degree}</div>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <input
                                    type="text"
                                    name="institution"
                                    value={formik.values.institution}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Institution"
                                    className="h-[2rem] w-44 border border-slate-500 ml-3"
                                />
                                {formik.touched.institution && formik.errors.institution && (
                                    <div className="text-red-500 text-sm mt-1 ml-[14px]">{formik.errors.institution}</div>
                                )}
                            </div>
                            <div className="flex flex-col  ">
                                <input
                                    type="number"
                                    name="year"
                                    value={formik.values.year}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Year"
                                    className="h-[2rem] w-44 border border-slate-500 ml-3"
                                />
                                {formik.touched.year && formik.errors.year && (
                                    <div className="text-red-500 text-sm mt-1 ml-[14px]">{formik.errors.year}</div>
                                )}
                            </div>
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
                                onChange={(e: any) => formik.setFieldValue('medicalLicenceNumber', e.target.value)}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.medicalLicenceNumber && formik.errors.medicalLicenceNumber && (
                                <div className="text-red-500">{formik.errors.medicalLicenceNumber}</div>
                            )}
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
                                onBlur={() => formik.setFieldTouched("consultationType", true)}
                                consultationType={consultationType}
                            />
                            {formik.touched.consultationType && formik.errors.consultationType && (
                                <div className="text-red-500">{formik.errors.consultationType}</div>
                            )}
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
                            onBlur={formik.handleBlur}

                        />
                        {formik.touched.consultationFee && formik.errors.consultationFee && (
                            <div className="text-red-500 ml-[132px]">{formik.errors.consultationFee}</div>
                        )}
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
                            onBlur={formik.handleBlur}
                            className="border border-slate-500 h-[2.25rem] w-[14.25rem]"
                            multiple
                        />
                        {formik.touched.certifications && formik.errors.certifications && (
                            <div className="text-red-500 ml-[132px]">{formik.errors.certifications}</div>
                        )}
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

export default DoctorKyc;