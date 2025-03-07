import { createSlice } from "@reduxjs/toolkit";

// Load user data from localStorage if available
const storedAdmin = localStorage.getItem("adminInfo");
const initialState = {
    adminInfo: storedAdmin ? JSON.parse(storedAdmin) : null,
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        addAdminData: (state, action) => {
            state.adminInfo = action.payload;
            localStorage.setItem("adminInfo", JSON.stringify(action.payload)); // Save to localStorage
        },
        removeAdminData: (state) => {
            state.adminInfo = null;
            localStorage.removeItem("adminInfo"); // Clear on logout
        },
    },
});

export const {  addAdminData, removeAdminData} = adminSlice.actions;
export default adminSlice.reducer;
