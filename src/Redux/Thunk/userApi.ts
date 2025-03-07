import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit"
import userApi from "src/utils/axios/axiosConfig";

const registerUser = createAsyncThunk(
    'user/register',
    async (userData: {
        name: string,
        email: string,
        mobile: string,
        password: string,
        confirmPassword: string
    }, { rejectWithValue }) => {
        try {

            const response = await userApi.post('/signup', userData)
            return response.data

        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message;
            return rejectWithValue(errorMessage); //
        }
    }
)

export default registerUser