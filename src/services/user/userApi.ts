import userApi from "src/utils/axios/axiosConfig";


const getVerifiedDoctors = async () => {
    try {
        return await userApi.get('/getVerifiedDoctors')
    } catch (error) {
        console.log(error);

    }
}

const saveBooking = async (slotId: string, userId: string, doctorId: string) => {

    const headers = {
        "Content-Type": "application/json"
    }
    const body = {
        slotId: slotId,
        userId: userId,
        doctorId: doctorId
    }
    try {
        await userApi.post('/saveBooking', body, { headers: headers })
    } catch (error) {

    }

}
const getUserBookings = async (userId: string) => {
    try {
       const response= await userApi.post('/getUserBookings', { userId: userId })
       return response.data

    } catch (error) {
        return []
    }
}

const updateUserProfile = async (values: any) => {
    return new Promise((resolve, reject) => {
        userApi.patch('/updateUserProfile', values, {
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


export { getVerifiedDoctors, saveBooking, getUserBookings,updateUserProfile }