import React from 'react'
import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux'

// import { endCallUser, setRoomIdUser, setShowVideoCallUser } from '../../features/user/userSlice'
import { MdCallEnd } from "react-icons/md"
import { useSocket } from "src/context/socketContext";
import { endCallUser, setRoomIdUser, setShowVideoCallUser } from 'src/Redux/Slice/userSlice';
import { toast } from 'sonner';
// import { endCallDoctor } from 'src/Redux/Slice/doctorSlice';

function IncomingVideocall() {
    const { showIncomingVideoCall, showVideoCallUser } = useSelector((state: any) => state.user)
    const dispatch = useDispatch()
    const { createSocket, socket } = useSocket()

    const handleEndCall = async () => {
        if (!showIncomingVideoCall) {
            console.error("No incoming call to end.");
            return;
        }
        await socket?.emit("reject-call", {
            to: showIncomingVideoCall.doctorId,
            sender: showIncomingVideoCall._id,
            name: showIncomingVideoCall.doctorName,
        });
        await dispatch(endCallUser());
        // await dispatch(endCallDoctor())
        if (!showVideoCallUser) toast.error("call ended")
    };
    const handleAcceptCall = async () => {

        if (!showIncomingVideoCall) {
            console.error("No incoming call to accept.");
            return;
        }
        // console.log('Emitting accept-incoming-call with data:', {
        //   to: showIncomingVideoCall._id,
        //   from: showIncomingVideoCall.doctorId,
        //   roomId: showIncomingVideoCall.roomId,
        // });

        socket?.emit("accept-incoming-call", {
            to: showIncomingVideoCall._id,
            from: showIncomingVideoCall.doctorId,
            roomId: showIncomingVideoCall.roomId,
        });

        dispatch(setRoomIdUser(showIncomingVideoCall.roomId));
        dispatch(setShowVideoCallUser(true));
    };

    return (
        <>
            <div className='w-full h-full flex justify-center items-center z-40 fixed top-1'>
                <div className='w-96 bg-cyan-950  z-40 rounded-xl flex flex-col items-center shadow-2xl shadow-black'>
                    <div className='flex flex-col gap-7 items-center'>
                        <span className='text-lg text-white  mt-4'>
                            {'Incoming video call'}
                        </span>
                        <span className='text-3xl text-white font-bold'>Dr.{showIncomingVideoCall?.doctorName}</span>

                    </div>
                    <div className='flex m-5'>
                        <img className='w-24 h-24 rounded-full' src={showIncomingVideoCall?.doctorImage} alt='profile' />
                    </div>
                    <div className='flex m-2  mb-5 gap-7'>

                        <div className='bg-green-500 w-12 h-12 text-white rounded-full flex justify-center items-center m-1 cursor-pointer'>
                            <MdCallEnd onClick={handleAcceptCall} className='text-3xl' />

                        </div>
                        <div className='bg-red-500 w-12 h-12 text-white rounded-full flex justify-center items-center m-1 cursor-pointer'>
                            <MdCallEnd onClick={handleEndCall} className='text-3xl' />

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default IncomingVideocall