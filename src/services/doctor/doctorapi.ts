import { doctorApi } from "src/utils/axios/axiosConfig"


const doctorServ = (values: any) => {
    console.log("Inside doctor service api ----->", values);

    // const formData = new FormData();

    return new Promise<void>((resolve, reject) => {
        // console.log("inside DoctoreService api call ----> ", values)
        // const profileImage = values.profileImage.name
        // const certifications = values.certifications


        // console.log("Inside doctor serv")
        doctorApi.post("/doctorKyc", values, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.error(error);
        });
    })
}

const getDepartmentsServ = async () => {
    const getDepartments = await doctorApi.get('/getDepartments')
    // console.log("serv",getDepartments.data);
    return getDepartments

}

const updateDoctorProfile = async (values: any) => {
    return new Promise((resolve, reject) => {
        doctorApi.patch("/updateDoctorProfile", values, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((response) => {
            console.log(response.data);
            resolve(response.data); // Return response data
        }).catch((error) => {
            console.error(error);
            reject(error);
        });
    });


};


const addDoctorSlots = async (values: any) => {
    try {
        // console.log("this is values", values);

        const response = await doctorApi.post("/addDoctorSlots", values, {
            headers: {
                "Content-Type": "application/json",  // Change this if not uploading files
            },
        });

        // console.log(response.data);
    } catch (error) {
        // console.error("Error adding doctor slots: this is error", error);
        throw error
    }



};

const fetchDoctorSlots = async (doctorId: string) => {
    
    
    return await doctorApi.get(`/availableDoctorSlots/${doctorId}`);
};






export default doctorServ
export { getDepartmentsServ, updateDoctorProfile, addDoctorSlots, fetchDoctorSlots }
