import axios from 'axios'

const userApi = axios.create({
    baseURL: process.env.REACT_APP_USER_API_BASE_URL,
    withCredentials: true
})

const doctorApi = axios.create({
    baseURL: process.env.REACT_APP_DOCTOR_API_BASE_URL
})

export { doctorApi }

export default userApi

