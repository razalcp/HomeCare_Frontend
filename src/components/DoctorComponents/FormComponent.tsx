import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = {
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
    consultationType: "",
    consultationFee: "",
    certifications: [],
    profileImage: null,
};

const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
    departments: Yup.array().min(1, "Select at least one department"),
    experience: Yup.number().required("Experience is required"),
    dateOfBirth: Yup.date().required("Date of Birth is required"),
    bio: Yup.string().required("Bio is required"),
    knownLanguages: Yup.array().min(1, "Select at least one language"),
    degree: Yup.string().required("Degree is required"),
    institution: Yup.string().required("Institution is required"),
    year: Yup.string().required("Year is required"),
    medicalLicenceNumber: Yup.string().required("Licence Number is required"),
    consultationType: Yup.string().required("Consultation type is required"),
    consultationFee: Yup.number().required("Consultation fee is required"),
    profileImage: Yup.mixed().nullable(),
    certifications: Yup.array().min(1, "Upload at least two certifications").required("Certifications are required"),
});

const FormComponent = () => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log("Form Data:", values);
            }}
        >
            {({ setFieldValue }) => (
                <Form className="p-4 max-w-lg mx-auto space-y-4">
                    <Field type="text" name="name" placeholder="Name" />
                    <ErrorMessage name="name" component="div" className="text-red-500" />

                    <Field type="email" name="email" placeholder="Email" />
                    <ErrorMessage name="email" component="div" className="text-red-500" />

                    <Field type="text" name="state" placeholder="State" />
                    <ErrorMessage name="state" component="div" className="text-red-500" />

                    <Field as="select" name="country">
                        <option value="">Select Country</option>
                        <option value="USA">USA</option>
                        <option value="India">India</option>
                    </Field>
                    <ErrorMessage name="country" component="div" className="text-red-500" />

                    <Field type="number" name="experience" placeholder="Experience (years)" />
                    <ErrorMessage name="experience" component="div" className="text-red-500" />

                    <Field type="date" name="dateOfBirth" />
                    <ErrorMessage name="dateOfBirth" component="div" className="text-red-500" />

                    <Field as="textarea" name="bio" placeholder="Bio" />
                    <ErrorMessage name="bio" component="div" className="text-red-500" />

                    <Field type="text" name="degree" placeholder="Degree" />
                    <ErrorMessage name="degree" component="div" className="text-red-500" />

                    <Field type="text" name="institution" placeholder="Institution" />
                    <ErrorMessage name="institution" component="div" className="text-red-500" />

                    <Field type="text" name="year" placeholder="Year" />
                    <ErrorMessage name="year" component="div" className="text-red-500" />

                    <Field type="text" name="medicalLicenceNumber" placeholder="Medical Licence Number" />
                    <ErrorMessage name="medicalLicenceNumber" component="div" className="text-red-500" />

                    <Field as="select" name="consultationType">
                        <option value="">Select Consultation Type</option>
                        <option value="online">Online</option>
                        <option value="offline">Offline</option>
                    </Field>
                    <ErrorMessage name="consultationType" component="div" className="text-red-500" />

                    <Field type="number" name="consultationFee" placeholder="Consultation Fee" />
                    <ErrorMessage name="consultationFee" component="div" className="text-red-500" />

                    <input
                        type="file"
                        onChange={(event) => {
                            const file = event.target.files?.[0]; // Optional chaining ensures it doesn't error out if null
                            if (file) {
                                setFieldValue("profileImage", file);
                            }
                        }}
                    />

                    <ErrorMessage name="profileImage" component="div" className="text-red-500" />

                    <input
                        type="file"
                        multiple
                        onChange={(event) => {
                            const files = event.target.files;
                            if (files) {
                                setFieldValue("certifications", Array.from(files));
                            }
                        }}

                    />
                    <ErrorMessage name="certifications" component="div" className="text-red-500" />

                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default FormComponent;
