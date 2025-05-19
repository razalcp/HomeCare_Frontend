import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Load doctor data from localStorage if available
const storedDoctor = localStorage.getItem("doctorInfo");

interface VideoCallPayload {
  userID: string;
  type: string;
  callType: string;
  roomId: string;
  userName: string
  userImage: string;
  doctorName: string;
  doctorImage: string;
  bookingId: string
}
interface DoctorState {
  doctorInfo: null | any;

  videoCall: VideoCallPayload | null;
  showVideoCallDoctor: boolean,
  roomIdDoctor: null,
}
const initialState: DoctorState = {
  doctorInfo: storedDoctor ? JSON.parse(storedDoctor) : null,
  videoCall: null,

  showVideoCallDoctor: false,
  roomIdDoctor: null,
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
    setVideoCall(state, action: PayloadAction<VideoCallPayload | null>) {
      state.videoCall = action.payload;
      console.log('hit vidocall slice', state.videoCall);

    },
    endCallDoctor: (state) => {
      state.videoCall = null;
      state.showVideoCallDoctor = false;
      state.roomIdDoctor = null;
      localStorage.removeItem("IncomingVideoCall");
    },
    setShowVideoCall(state, action: PayloadAction<boolean>) {
      state.showVideoCallDoctor = action.payload;
      console.log('showVideoCall Doctor slice', state.showVideoCallDoctor);

    },
     setRoomId(state, action: PayloadAction<string | null>) {
      state.roomIdDoctor = action.payload;
      console.log('roomIdDoctor slice', state.roomIdDoctor);
      
    },
  },
});

export const { addDoctorData, removeDoctorData, setVideoCall, endCallDoctor, setShowVideoCall,setRoomId } = doctorSlice.actions;
export default doctorSlice.reducer;
