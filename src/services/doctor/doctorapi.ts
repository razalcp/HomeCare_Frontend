import { doctorApi } from "src/utils/axios/axiosConfig"


const doctorServ = (values: any) => {

    return new Promise<void>((resolve, reject) => {

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
        const response = await doctorApi.post("/addDoctorSlots", values, {
            headers: {
                "Content-Type": "application/json",  // Change this if not uploading files
            },
        });

    } catch (error) {

        throw error
    }



};

const fetchDoctorSlotsforBooking = async (doctorId: string) => {


    return await doctorApi.get(`/availableDoctorSlotsForBooking/${doctorId}`);
};

const fetchDoctorSlots = async (doctorId: string, page: number, limit: number) => {
    return await doctorApi.get(`/availableDoctorSlots/${doctorId}`, {
        params: { page, limit },
    });
};





const getMyBookings = async (doctorId: string, page: number, limit: number) => {
    try {
        const response = await doctorApi.post('/getMyBookings', {
            doctorId,
            page,
            limit
        });
        return response.data; // { bookings, totalPages }
    } catch (error) {
        return { bookings: [], totalPages: 1 };
    }
};


const bookedUsers = async () => {
    try {
        const response = await doctorApi.get('/bookedUsers')
        return response.data
    } catch (error) {
        return error
    }
}

const sendMessage = async (messageData: any) => {
    try {
        const response = await doctorApi.post('/saveMessages', messageData)
        return response.data
    } catch (error) {
        return error
    }
}

const fetchMessages = async (receiverId: string, senderId: string) => {


    try {
        const response = await doctorApi.get('/messages', {
            params: { receiverId, senderId }
        })

        return response.data
    } catch (error) {
        return error
    }
}
const deleteSlot = async (slotId: string) => {
    try {
        const response = await doctorApi.delete(`/deleteSlot/${slotId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const savePrescription = async (presData: any) => {
    try {
        const response = await doctorApi.post('/savePrescription', presData)
        return response
    } catch (error) {
        throw error
    }
}

const findDoctorDashboard = async (doctorId: string) => {
    try {


        const response = await doctorApi.get('/doctorDashBoard', { params: { doctorId } })

        return response
    } catch (error) {
        throw error
    }
}

const editDepartmentServ = async (departmentId: string, departmentName: string) => {
    try {
        const response = await doctorApi.patch('/editDepartment', { departmentId, departmentName })
        return response
    } catch (error) {
        throw error
    }
}

export default doctorServ
export {
    getDepartmentsServ,
    updateDoctorProfile,
    addDoctorSlots,
    fetchDoctorSlots,
    fetchDoctorSlotsforBooking,
    getMyBookings,
    bookedUsers,
    sendMessage,
    fetchMessages,
    deleteSlot,
    savePrescription,
    findDoctorDashboard,
    editDepartmentServ
}
