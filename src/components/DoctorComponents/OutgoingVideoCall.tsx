import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useSocket } from "src/context/socketContext";

import { useDispatch } from "react-redux";
import { MdCallEnd } from "react-icons/md";
import { endCallDoctor } from "src/Redux/Slice/doctorSlice";
import { toast } from "sonner";
// import { endCallTrainer } from "../../features/trainer/trainerSlice";

function OutgoingVideocall() {
    const { videoCall, doctorInfo ,showVideoCallDoctor} = useSelector(
        (state: any) => state.doctor
    );
    // const parsedDoctor = JSON.parse(doctorInfo);


    const { createSocket, socket } = useSocket()
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const dispatch = useDispatch();
    // console.log("videoCall in render:", videoCall);

    useEffect(() => {
        if (!socket || !videoCall) return;

        if (videoCall?.type === "out-going") {


            socket?.emit("outgoing-video-call", {
                to: videoCall.userID,
                from: doctorInfo._id,
                doctorName: videoCall.doctorName,
                doctorImage: videoCall.doctorImage,
                callType: videoCall.callType,
                roomId: videoCall.roomId,
            });

            timeoutRef.current = setTimeout(() => {
                handleEndCall(); // Automatically end the call
            }, 600000);
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [videoCall]);

    useEffect(() => {
        if (socket) {
            console.log("Socket connected:", socket.connected);
        }
    }, [socket]);

    const handleEndCall = async () => {
        await socket?.emit("reject-call", {
            to: videoCall?.userID,
            sender: "dr pathros",
            name: videoCall?.userName,
            from: doctorInfo.name,
            sneder: doctorInfo.id,
        });
       await dispatch(endCallDoctor());
       if(   !showVideoCallDoctor )toast.error("call ended")
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    return (
        <div className="w-full h-full fixed flex justify-center items-center z-50 top-1">
            <div className="w-96 bg-cyan-950 flex justify-center items-center z-50 rounded-xl shadow-2xl shadow-black">
                <div className="flex flex-col gap-6 items-center">
                    <span className="text-lg text-white mt-3"></span>
                    <span className="text-3xl text-white">{videoCall?.userName}</span>
                    <div className="flex">
                        <img
                            className="w-24 h-24 rounded-full"
                            src={videoCall?.userImage}
                            alt="profile"
                        />
                    </div>
                    <div className="bg-red-500 w-12 h-12 text-white rounded-full flex justify-center items-center m-5">
                        <MdCallEnd onClick={handleEndCall} className="text-3xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OutgoingVideocall;