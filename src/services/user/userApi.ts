import userApi, { doctorApi } from "src/utils/axios/axiosConfig";

interface DoctorQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  departments?: string[];
  minFee?: number;
  maxFee?: number;
}

const getVerifiedDoctors = async (params: DoctorQueryParams) => {
  try {
    return await userApi.get('/getVerifiedDoctors', {
      params
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};


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
        const response = await userApi.post('/getUserBookings', { userId: userId })
        return response.data

    } catch (error) {
        return []
    }
};

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

const bookedDoctors = async () => {
    try {

        const response = await userApi.get('/bookedDoctors')

        return response.data
    } catch (error) {

    }
}

const fetchMessages = async (receiverId: string, senderId: string) => {

    try {
        const response = await userApi.get('/messages', {
            params: { receiverId, senderId }
        })

        return response.data
    } catch (error) {
        return error
    }
}

const sendMessage = async (messageData: any) => {
    try {
        const response = await userApi.post('/saveMessages', messageData)
        return response.data
    } catch (error) {
        return error
    }
}

const uploadToCloudinary = async (values: any) => {
    return new Promise((resolve, reject) => {
        userApi.post('/uploadToCloudinary', values, {
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
}
const deleteMessage = async (messageId: any) => {
    try {
        console.log("messageId", messageId);

        const response = await userApi.delete('/deleteMessage', {
            params: { id: messageId }
        });
        return response.data
    } catch (error) {
        return error
    }
}

const walletBooking = async (body: any) => {

    const headers = {
        "Content-Type": "application/json"
    }
    try {
        const response = await userApi.post('/walletBooking', body, {
            headers: headers,
        })

        return response

    } catch (error: any) {

        throw new Error(error.response.data)
    }
}

const getPrescription = async (bookingId: string) => {
    try {
        const presData = await doctorApi.get('/prescription', {
            params: { bookingId }
        })
        return presData.data

    } catch (error) {
        return error
    }

};


const submitReview = async (reviewData: any) => {
    try {
        const response = await userApi.post('/submitReview', reviewData)
        return response
    } catch (error: any) {

        throw error


    }
};

const findReviewData = async (doctorId: string) => {


    try {
        const response = await userApi.get('/reviewDetails', {
            params: { doctorId }
        })
        return response
    } catch (error) {
        throw error
    }

}

const fetchDoctorSlotsforBooking = async (doctorId: string) => {

        return await userApi.get(`/findDoctorSlots/${doctorId}`)

};

export {
    getVerifiedDoctors, saveBooking, getUserBookings, updateUserProfile,
    bookedDoctors, fetchMessages, sendMessage, uploadToCloudinary, deleteMessage,
    walletBooking, getPrescription, submitReview, findReviewData,fetchDoctorSlotsforBooking 
}