import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// Load user data from localStorage if available
const storedUser = localStorage.getItem("userInfo");

const initialState = {
    userInfo: storedUser ? JSON.parse(storedUser) : null,
    showIncomingVideoCall: {
        _id: "",
        callType: "",
        doctorName: "",
        doctorId:"",
        doctorImage: '',
        roomId: null,
    },
    videoCall: null,
    showVideoCallUser: false,
    roomIdUser: null,
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
            console.log("remove userData worked");

            state.userInfo = null;
            localStorage.removeItem("userInfo"); // Clear on logout
            localStorage.setItem("userIsLogged", JSON.stringify(false));

        },
        setShowIncomingVideoCall: (state, action) => {
            state.showIncomingVideoCall = action.payload
            console.log('userslice ShowIncomingVideoCall state', state.showIncomingVideoCall);


        },
        setShowVideoCallUser(state, action: PayloadAction<boolean>) {
            state.showVideoCallUser = action.payload;
            console.log("userSlice videocall user ", state.showVideoCallUser)
        },
        setRoomIdUser(state: any, action: PayloadAction<string | null>) {
            state.roomIdUser = action.payload;
            console.log("User slice roomerId ", state.roomIdUser);

        },
        endCallUser: (state) => {
            console.log('hit  user sclice-------->');

            state.videoCall = null;
            state.showIncomingVideoCall = null;
            state.showVideoCallUser = false; // Ensure the video call state is false
            state.roomIdUser = null;         // Clear the room ID if necessary
            console.log('call end user slice', state.showIncomingVideoCall);
            localStorage.removeItem("IncomingVideoCall");
        },
        setVideoCallUser(state, action: PayloadAction<string | null>) {
            state.videoCall = action.payload;
        },
    },
});

export const { addUserData, removeUserData,
    setShowIncomingVideoCall, setShowVideoCallUser, setRoomIdUser,
    endCallUser,setVideoCallUser} = userSlice.actions;
export default userSlice.reducer;
