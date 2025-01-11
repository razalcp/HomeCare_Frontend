import InputComponent from '@components/DoctorComponents/InputComponent'
import KycDropDown from "@components/DoctorComponents/KycDropDownComponentMultipleSelection"
import { useState } from 'react'


const DoctorKyc = () => {
    const [doctorData, setDoctorData] = useState({
        city: "",
        state: "",
        zipcode: "",
        country: [],
        departments: [],
        experience: [],
        dateOfBirth: "",
        bio: "",
        knownLanguages: [],
        degree: "",
        institution: "",
        year: "",
        medicalLicenceNumber: "",
        consultationType: [],
        consultationFee: "",
        certifications: []


    })

    const handleDobChange = (dob) => {

    };

    const handleBioChange = (bio) => {
        console.log(bio)
    };

    const handleDegreeChange = (degree) => {

    };

    const handleInstitutionChange = (institution) => {

    };

    const handleYearChange = (year) => {

    };
    const handleCertificationsChange = (certificate) => {

    };

    const handleSubmit = () => {

    };


    return (
        <>
            <div id="doctor-kyc" className="border-4 border-gray-400  justify-center ml-[493px] mt-10 h-[1550px] w-[600px]">

                <div id="kyc-heading" className="ml-[10.5rem] mt-4">
                    <h1>Submit Your KYC Here To Continue</h1>
                </div>



                <div id="form-container">
                    <form onSubmit={handleSubmit} />

                    <div id="profile-image" className="ml-[13.5rem] mt-[4.5rem]">
                        <img src="https://img.freepik.com/free-photo/female-doctor-hospital-with-stethoscope_23-2148827774.jpg" alt="" id="profile-image" className="w-[9rem] h-[9rem] border rounded-full" />
                        <button id="change-profile-image" className="h-[2rem] w-[7.5rem] border border-black mt-3 ml-[11.8px]">Upload Image</button>
                    </div>

                    <div id="general-details" className="mt-7 ml-2">
                        <h3>General Details</h3>

                    </div>

                    <div id="flex-container-line-1-parent" className="flex">

                        <div id="flex-item-city-container" className="mt-5 ml-8">

                            <div id="city-field-container">

                                <div id="city-label-container" >
                                    <label htmlFor="city-field">City <span id="city-asterix" className="text-xl text-amber-600">*</span></label>
                                </div>
                                <InputComponent name="name" value={doctorData.name} />

                            </div>

                        </div>


                        <div id="flex-item-state-container" className="ml-20 mt-[21px]">

                            <div id="state-field-container">
                                <div id="state-label-container">
                                    <label htmlFor="state-field">State <span className="text-xl text-amber-600">*</span></label>
                                </div>
                                <InputComponent name="state" value={doctorData.state} />
                            </div>

                        </div>

                    </div>


                    <div id="flex-container-line-2-parent" className="flex">

                        <div id="flex-item-zipcode-container" className="mt-5 ml-8">

                            <div id="zipcode-field-container">

                                <div id="zipcode-label-container" >
                                    <label htmlFor="zipcode-field">Zipcode <span id="city-asterix" className="text-xl text-amber-600">*</span></label>
                                </div>
                                <InputComponent name="zipcode" value={doctorData.zipcode} />

                            </div>

                        </div>


                        <div id="flex-item-country-container" className="ml-20 mt-[21px]">

                            <div id="country-field-container">
                                <div id="country-label-container">
                                    <label htmlFor="country-field">Country <span className="text-xl text-amber-600">*</span></label>
                                </div>
                                <KycDropDown name="country" value={doctorData.country} />
                            </div>

                        </div>

                    </div>



                    <div id="flex-container-line-3-parent" className="flex">

                        <div id="flex-item-departments-container" className="mt-5 ml-8">

                            <div id="departments-field-container">

                                <div id="departments-label-container" >
                                    <label htmlFor="departments-field">Department's <span id="departments-asterix" className="text-xl text-amber-600">*</span></label>
                                </div>
                                <KycDropDown name="departments" value={doctorData.departments} />

                            </div>

                        </div>


                        <div id="flex-item-experience-container" className="ml-20 mt-[21px]">

                            <div id="experience-field-container">
                                <div id="experience-label-container">
                                    <label htmlFor="experience-field">Experience <span className="text-xl text-amber-600">*</span></label>
                                </div>
                                <KycDropDown name="experience" value={doctorData.experience} />
                            </div>

                        </div>

                    </div>

                    <div id="flex-container-line-4-parent" className="flex">

                        <div id="flex-item-date-of-birth-container" className="mt-5 ml-8">

                            <div id="date-of-birth-field-container">

                                <div id="date-of-birth-label-container">
                                    <label htmlFor="date-of-birth-field">Date Of Birth <span id="date-of-birth-asterix" className="text-xl  text-amber-600">*</span></label>
                                </div>
                                <input type="date" name="dateOfBirth" value={doctorData.dateOfBirth} onChange={handleDobChange} id="date-of-birth-field" className="border border-slate-500 h-[2.25rem] w-[14.25rem]" placeholder="Enter DOB" />
                            </div>

                        </div>

                        <div id="flex-item-bio-container" className="ml-20 mt-[21px]">
                            <div id="bio-label-container">
                                <label htmlFor="bio-field">Bio <span id="bio-asterix" className="text-xl  text-amber-600">*</span></label>
                            </div>
                            <input type="text" name="bio" value={doctorData.bio} onChange={handleBioChange} id="bio-field" className="border border-slate-500 h-[8rem] w-[14.25rem]" placeholder="Enter Your Bio Here" />
                        </div>

                    </div>

                    <div id="line-5-parent-container" className="mt-5 ml-8">

                        <div id="known-languages-label-container">
                            <label htmlFor="languages-drop-down">Known Languages <span id="known-languages-asterix" className="text-xl  text-amber-600">*</span></label>
                        </div>
                        <KycDropDown name="knownLanguages" value={doctorData.knownLanguages} />

                        <div id="flex-container-selected-languages" className="flex mt-4">

                            {/* flex items that is selected languages over here */}

                        </div>
                    </div>

                    <div id="line-6-parent-container" className="mt-5 ml-8">

                        <div id="education-label-container">
                            <label> Education <span id="education-asterix" className="text-xl  text-amber-600">*</span> </label>
                        </div>

                        <div id="flex-container-education" className="flex ml-2">

                            <div id="flex-item-degree">
                                <input id="degree-input" type="text" name="degree" onChange={handleDegreeChange} value={doctorData.degree} placeholder="Degree" className="h-[2rem] w-44 border border-slate-500 ml-[-7px]" />
                            </div>

                            <div id="flex-item-institution" className="">
                                <input id="institution-input" type="text" name="institution" onChange={handleInstitutionChange} value={doctorData.institution} placeholder="Institution" className="h-[2rem] w-44 border border-slate-500 ml-3" />
                            </div>

                            <div id="flex-item-year">
                                <input id="year-input" type="number" name="year" onChange={handleYearChange} value={doctorData.year} placeholder='Year' className="h-[2rem] w-44 border border-slate-500 ml-3" />
                            </div>


                        </div>

                        <h2 className="text-blue-600 mt-1">Add Education</h2>


                    </div>

                    <div id="professional-details" className="mt-7 ml-2">
                        <h3>Professional Details</h3>
                    </div>

                    <div id="flex-container-line-7-parent" className="flex">

                        <div id="flex-item-medical-licence-number-container" className="mt-5 ml-8">
                            <div id="medical-licence-number-field-container">
                                <div id="medical-licence-number-label-container">
                                    <label htmlFor="medical-licence-number-field">Medical Licence Number <span id="medical-licence-asterix" className="text-xl  text-amber-600">*</span></label>
                                </div>
                                <InputComponent name="medicalLicenceNumber" value={doctorData.medicalLicenceNumber} />
                            </div>
                        </div>

                        <div id="flex-item-consultation-type-container" className="ml-20 mt-[21px]">
                            <div id="consultation-type-field-container">
                                <div id="consultation-type-label-container">
                                    <label htmlFor="consultation-type-field"> Consultation Type Offered <span id="consultation-type-asterix" className="text-xl  text-amber-600">*</span> </label>
                                </div>
                                <KycDropDown name="consultationType" value={doctorData.consultationType} />
                                <div id="flex-container-selected-consultation-type" className="mt-4">
                                    {/* flex items that is selected consultation types will be displayed here */}
                                </div>
                            </div>
                        </div>

                    </div>

                    <div id="line-8-parent">
                        <div id="consultation-fee-field-container" className="mt-5 ml-8">
                            <div id="consultation-fee-label">
                                <label htmlFor="consultation-fee-label">Consultation Fee <span id="consultation-fee-asterix" className="text-xl text-amber-600">*</span> </label>
                            </div>
                            <InputComponent name="consultationFee" value={doctorData.consultationFee} />
                        </div>
                    </div>

                    <div id="line-9-certifications-parent">
                        <div id="certifications-field-container" className="mt-8 ml-[31px]">
                            <div id="certifications-label">
                                <label htmlFor="certifications-field">Certifications <span id="certifications-asterix" className="text-xl text-amber-600">*</span></label>
                            </div>
                            <input id="certifications-input" type="file" name="certifications" onChange={handleCertificationsChange} value={doctorData.certifications} className="border border-slate-500 h-[2.25rem] w-[14.25rem]" />
                        </div>
                    </div>

                    <div className="mt-[100px] ml-[134px]" id="submit-button">
                        <button type="button" className="h-[34px] w-[20rem] border border-black ">Submit</button>
                    </div>



                    <form />

                </div>

            </div>
        </>
    )
}

export default DoctorKyc;




