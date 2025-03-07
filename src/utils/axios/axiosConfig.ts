import axios from 'axios'

const userApi = axios.create({
    baseURL: process.env.REACT_APP_USER_API_BASE_URL,
    withCredentials: true
})

const doctorApi = axios.create({
    baseURL: process.env.REACT_APP_DOCTOR_API_BASE_URL
})

const adminApi = axios.create({
    baseURL: process.env.REACT_APP_ADMIN_API_BASE_URL,
    withCredentials:true
})

export { doctorApi ,adminApi}

export default userApi

