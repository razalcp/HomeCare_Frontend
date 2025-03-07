import { createSlice } from "@reduxjs/toolkit";

// Load doctor data from localStorage if available
const storedDoctor = localStorage.getItem("doctorInfo");

const initialState = {
  doctorInfo: storedDoctor ? JSON.parse(storedDoctor) : null,
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    addDoctorData: (state, action) => {
      state.doctorInfo = action.payload;
      localStorage.setItem("doctorInfo", JSON.stringify(action.payload)); // Save to localStorage
    },
    removeDoctorData: (state) => {
      state.doctorInfo = null;
      localStorage.removeItem("doctorInfo"); // Clear on logout
    },
  },
});

export const { addDoctorData, removeDoctorData } = doctorSlice.actions;
export default doctorSlice.reducer;
