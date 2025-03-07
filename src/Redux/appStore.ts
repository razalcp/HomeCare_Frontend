import { configureStore } from '@reduxjs/toolkit'
import doctorReducer from './Slice/doctorSlice'
import userReducer from './Slice/userSlice'
import adminReducer from './Slice/adminSlice'
const appStore = configureStore({
    reducer: {
        doctor: doctorReducer,
        user:userReducer,
        admin:adminReducer
    }
})

export default appStore