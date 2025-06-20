import axios from 'axios'

const userApi = axios.create({
    baseURL: process.env.REACT_APP_USER_API_BASE_URL,
    withCredentials: true
})

const doctorApi = axios.create({
    baseURL: process.env.REACT_APP_DOCTOR_API_BASE_URL,
    withCredentials: true
})

const adminApi = axios.create({
    baseURL: process.env.REACT_APP_ADMIN_API_BASE_URL,
    withCredentials: true
})

const getTokenByRole = (instance: any) => {
    if (instance === userApi) return localStorage.getItem('userToken');
    if (instance === doctorApi) return localStorage.getItem('doctorToken');
    if (instance === adminApi) return localStorage.getItem('adminToken');
    return null;
};


const addRequestInterceptor = (apiInstance: any) => {
    apiInstance.interceptors.request.use(
        (config: any) => {
            const token = getTokenByRole(apiInstance);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error: any) => Promise.reject(error)
    );
};


const addResponseInterceptor = (apiInstance: any) => {
    apiInstance.interceptors.response.use(
        (response: any) => response,
        (error: any) => {
            if (error.response?.status === 401) {
                console.warn("Unauthorized - maybe redirect to login?");
            }
            return Promise.reject(error);
        }
    );
};


[userApi, doctorApi, adminApi].forEach(api => {
    addRequestInterceptor(api);
    addResponseInterceptor(api);
});

export { doctorApi, adminApi }

export default userApi

