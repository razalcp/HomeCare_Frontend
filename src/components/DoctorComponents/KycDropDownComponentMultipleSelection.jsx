
// import { useState, useEffect } from 'react'


// const KycDropDown = (props) => {
//     // console.log(props)
//     // const stateVariable = props.value

//     const [optionValue, setOptionValue] = useState([])

//     useEffect(() => {
//         console.log("-------------->>  KYC drop down use Effect worked <<-----------")
//     }, [])
//     useEffect(() => {
//         console.log("state updated and trigerred re-rendering.  use Effect worked .....")
//     }, [optionValue])


//     // const handleChange = (event) => {

//     //     const { target } = event
//     //     console.log(target.value)
//     //     const currentState = target.value
//     //     setOptionValue((prev) => {
//     //         return [...prev, currentState]
//     //     })



//     // }

//     const handleChange = () => {
//         console.log("handle Change Worked")
//     }

//     return (
//         <>
//             {/* <select name={props.name} value={stateVariable} onChange={handleChange} className="border border-slate-500 h-[2.25rem] w-[14.25rem]"> */}

//             <select value="" onChange={handleChange} className="border border-slate-500 h-[2.25rem] w-[14.25rem]">
//                 <option value="">Choose an Option</option>
//                 <option value="option1">option 1</option>
//                 <option value="option2">option 2</option>
//                 <option value="option3">option 3</option>

//             </select>
//             {/* 
//             <div id="option-value" className='h-20 w-full'>

//                 {stateVariable.map((value, index) => <p className="text-black text-4xl font-bold">{value}</p>

//                 )}

//             </div > */}
//         </>
//     )
// }

// export default KycDropDown;




/////////////////////////////////////////////////////////////////////////////



// import { useState, useEffect } from "react";
// import Select from "react-select";

// const KycDropDown = (props) => {
//     const [selectedOptions, setSelectedOptions] = useState([]);

//     useEffect(() => {
//         console.log("-------------->>  KYC drop down useEffect worked <<-----------");
//     }, []);

//     useEffect(() => {
//         console.log("State updated and triggered re-rendering:", selectedOptions);
//     }, [selectedOptions]);

//     const handleChange = (selected) => {
//         setSelectedOptions(selected || []);
//         console.log("Selected Options:", selected);
//     };

//     const options = [
//         { value: "option1", label: "Option 1" },
//         { value: "option2", label: "Option 2" },
//         { value: "option3", label: "Option 3" },
//     ];

//     return (
//         <div className="w-[14.25rem]">
//             <Select
//                 value={selectedOptions}
//                 onChange={handleChange}
//                 options={options}
//                 isMulti={true}
//                 placeholder="Choose Options"
//                 className="border border-slate-500"
//             />

//             {/* Display Selected Options */}
//             <div className="mt-2 p-2 border border-gray-300 rounded-md">
//                 <h3 className="font-semibold text-gray-700 w-[253px]">Selected:</h3>
//                 {selectedOptions.length > 0 ? (
//                     selectedOptions.map((option) => (
//                         <span key={option.value} className="mr-2 p-1 bg-blue-200 text-blue-700 rounded">
//                             {option.label}
//                         </span>
//                     ))
//                 ) : (
//                     <p className="text-gray-500">No options selected</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default KycDropDown;

////////////////////////////////////////////////////

// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import InputComponent from "@components/DoctorComponents/InputComponent";
// import KycDropDown from "@components/DoctorComponents/KycDropDownComponentMultipleSelection";
// import { useRef } from "react";
// import doctorProfileImage from 'src/assets/female-doctor-hospital-with-stethoscope_profile-image.jpg';
// import { GiCloudUpload } from "react-icons/gi";

// const DoctorKyc = () => {
//     const inputRef = useRef(null);

//     const validationSchema = Yup.object({
//         city: Yup.string()
//             .required('City is required')
//             .min(2, 'City must be at least 2 characters')
//             .matches(/^[a-zA-Z\s]+$/, 'City should only contain letters'),
//         state: Yup.string()
//             .required('State is required')
//             .min(2, 'State must be at least 2 characters')
//             .matches(/^[a-zA-Z\s]+$/, 'State should only contain letters'),
//         zipcode: Yup.string()
//             .required('Zipcode is required')
//             .matches(/^\d{5,6}$/, 'Zipcode must be 5-6 digits'),
//         country: Yup.array()
//             .min(1, 'Please select at least one country')
//             .required('Country is required'),
//         departments: Yup.array()
//             .min(1, 'Please select at least one department')
//             .required('Department is required'),
//         experience: Yup.array()
//             .min(1, 'Please select experience')
//             .required('Experience is required'),
//         dateOfBirth: Yup.date()
//             .required('Date of birth is required')
//             .max(new Date(), 'Date of birth cannot be in the future'),
//         bio: Yup.string()
//             .required('Bio is required')
//             .min(50, 'Bio must be at least 50 characters')
//             .max(500, 'Bio cannot exceed 500 characters'),
//         knownLanguages: Yup.array()
//             .min(1, 'Please select at least one language')
//             .required('Known languages are required'),
//         degree: Yup.string()
//             .required('Degree is required')
//             .min(2, 'Degree must be at least 2 characters'),
//         institution: Yup.string()
//             .required('Institution is required')
//             .min(2, 'Institution must be at least 2 characters'),
//         year: Yup.number()
//             .required('Year is required')
//             .min(1950, 'Year must be after 1950')
//             .max(new Date().getFullYear(), 'Year cannot be in the future'),
//         medicalLicenceNumber: Yup.string()
//             .required('Medical license number is required')
//             .matches(/^[A-Z0-9]{5,15}$/, 'Invalid license number format'),
//         consultationType: Yup.array()
//             .min(1, 'Please select at least one consultation type')
//             .required('Consultation type is required'),
//         consultationFee: Yup.number()
//             .required('Consultation fee is required')
//             .min(0, 'Consultation fee cannot be negative')
//             .typeError('Consultation fee must be a number'),
//         certifications: Yup.array()
//             .of(
//                 Yup.mixed().test(
//                     'fileSize',
//                     'File too large',
//                     value => !value || value.size <= 5000000
//                 )
//             ),
//         profileImage: Yup.mixed()
//             .test(
//                 'fileSize',
//                 'File too large',
//                 value => !value || value.size <= 2000000
//             )
//             .test(
//                 'fileType',
//                 'Unsupported file type',
//                 value => !value || ['image/jpeg', 'image/png'].includes(value.type)
//             )
//     });

//     const formik = useFormik({
//         initialValues: {
//             city: "",
//             state: "",
//             zipcode: "",
//             country: [],
//             departments: [],
//             experience: [],
//             dateOfBirth: "",
//             bio: "",
//             knownLanguages: [],
//             degree: "",
//             institution: "",
//             year: "",
//             medicalLicenceNumber: "",
//             consultationType: [],
//             consultationFee: "",
//             certifications: [],
//             profileImage: null
//         },
//         validationSchema,
//         onSubmit: (values) => {
//             console.log('Form submitted:', values);
//         },
//     });

//     const handleUpload = () => {
//         inputRef.current.click();
//     };

//     const ErrorMessage = ({ error }) => (
//         error ? <div className="text-red-500 text-sm mt-1">{error}</div> : null
//     );

//     return (
//         <div className="border-4 border-gray-400 justify-center ml-[470px] mt-10 w-[625px] p-6">
//             {/* Same header section */}
//             <div className="ml-[10.5rem] mt-4 mb-[3rem]">
//                 <h1 className="ml-[17px]">Submit Your KYC Here To Continue</h1>
//             </div>

//             <form onSubmit={formik.handleSubmit}>
//                 {/* Profile Image Section */}
//                 <div className="flex flex-col items-center justify-center gap-[2rem] w-full h-[11rem]">
//                     <figure className="w-[10rem] h-[10rem] object-cover rounded-full">
//                         <img src={doctorProfileImage} className="w-[10rem] h-[10rem] object-cover object-right rounded-full" alt="profile" />
//                     </figure>
//                     <div>
//                         <GiCloudUpload onClick={handleUpload} color="red" className="size-12 animate-bounce" />
//                         <span>Upload Image</span>
//                         <input
//                             type="file"
//                             className="h-[2rem] w-[7.5rem] border border-black hidden"
//                             ref={inputRef}
//                             onChange={(event) => {
//                                 formik.setFieldValue("profileImage", event.currentTarget.files[0]);
//                             }}
//                         />
//                         <ErrorMessage error={formik.touched.profileImage && formik.errors.profileImage} />
//                     </div>
//                 </div>

//                 {/* General Details Section */}
//                 <div className="mt-20 ml-2">
//                     <h3>General Details</h3>
//                 </div>

//                 {/* City and State */}
//                 <div className="flex">
//                     <div className="mt-5 ml-8">
//                         <div>
//                             <label htmlFor="city">
//                                 City <span className="text-xl text-amber-600">*</span>
//                             </label>
//                             <InputComponent
//                                 name="city"
//                                 value={formik.values.city}
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                             />
//                             <ErrorMessage error={formik.touched.city && formik.errors.city} />
//                         </div>
//                     </div>

//                     <div className="ml-20 mt-[21px]">
//                         <div>
//                             <label htmlFor="state">
//                                 State <span className="text-xl text-amber-600">*</span>
//                             </label>
//                             <InputComponent
//                                 name="state"
//                                 value={formik.values.state}
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                             />
//                             <ErrorMessage error={formik.touched.state && formik.errors.state} />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Continue with the rest of the form fields, adding ErrorMessage component 
//                    below each input field. Example for remaining fields: */}

//                 {/* Zipcode and Country */}
//                 <div className="flex">
//                     <div className="mt-5 ml-8">
//                         <div>
//                             <label htmlFor="zipcode">
//                                 Zipcode <span className="text-xl text-amber-600">*</span>
//                             </label>
//                             <InputComponent
//                                 name="zipcode"
//                                 value={formik.values.zipcode}
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                             />
//                             <ErrorMessage error={formik.touched.zipcode && formik.errors.zipcode} />
//                         </div>
//                     </div>

//                     <div className="ml-20 mt-[21px]">
//                         <div>
//                             <label htmlFor="country">
//                                 Country <span className="text-xl text-amber-600">*</span>
//                             </label>
//                             <KycDropDown
//                                 name="country"
//                                 value={formik.values.country}
//                                 onChange={(selected) => formik.setFieldValue('country', selected)}
//                                 onBlur={formik.handleBlur}
//                             />
//                             <ErrorMessage error={formik.touched.country && formik.errors.country} />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Add similar error handling for all remaining fields */}

//                 {/* Submit Button */}
//                 <div className="mt-[100px] ml-[134px]">
//                     <button
//                         type="submit"
//                         className="h-[34px] w-[20rem] border border-black"
//                     >
//                         Submit
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default DoctorKyc;


///////////////////////////////////////////////////////////////



import { useState, useEffect } from "react";
import Select from "react-select";

const KycDropDown = (props) => {
    // console.log("this is props", props);

    const data = props.dept
    // console.log("this is data", data);
    const languages = props.languages
    // console.log("this is known languages",languages);

    const { consultationType } = props
    console.log(consultationType);


    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleChange = (selected) => {
        setSelectedOptions(selected || []);
        if (props.onChange) {
            props.onChange(selected);
        }
    };
    const deptOption = Array.isArray(data)
        ? data.map((item) => ({
            value: item.departmentName,
            label: item.departmentName
        }))
        : [];
    const knownLanguages = Array.isArray(languages) ? languages.map((lang) => ({
        value: lang,
        label: lang
    })) : [];

    const consultation = Array.isArray(consultationType) ? consultationType.map((cons) => ({
        value: cons,
        label: cons
    })) : [];




    const options = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
    ];





    return (
        <div className="w-[14.25rem]">
            <Select
                value={selectedOptions}
                onChange={handleChange}
                options={deptOption && deptOption.length > 0 ? deptOption :
                    knownLanguages && knownLanguages.length > 0 ? knownLanguages :
                        consultation && consultation.length > 0 ? consultation : options
                }

                isMulti={true}
                placeholder="Choose Options"
                className={`border ${props.error ? 'border-red-500' : 'border-slate-500'}`}
                onBlur={props.onBlur}
            />
            {/* Display Selected Options */}
            <div className="mt-2 p-2 border border-gray-300 rounded-md">
                <h3 className="font-semibold text-gray-700 w-[500px]">Selected:</h3>
                {selectedOptions.length > 0 ? (
                    selectedOptions.map((option) => (
                        <span key={option.value} className="mr-2 p-1 bg-blue-200 text-blue-700 rounded">
                            {option.label}
                        </span>
                    ))
                ) : (
                    <p className="text-gray-500">No options selected</p>
                )}
            </div>
        </div>
    );
};

export default KycDropDown;