import { createSlice } from "@reduxjs/toolkit";

// Load user data from localStorage if available
const storedUser = localStorage.getItem("userInfo");
const initialState = {
    userInfo: storedUser ? JSON.parse(storedUser) : null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUserData: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload)); // Save to localStorage
        },
        removeUserData: (state) => {
            state.userInfo = null;
            localStorage.removeItem("userInfo"); // Clear on logout
        },
    },
});

export const { addUserData, removeUserData } = userSlice.actions;
export default userSlice.reducer;
