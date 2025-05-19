import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector, useDispatch } from "react-redux";

import { useEffect, useRef } from "react";
import {  setRoomIdUser, setShowIncomingVideoCall, setShowVideoCallUser} from '../../Redux/Slice/userSlice'
import { useSocket } from "src/context/socketContext";
import { setVideoCallUser } from "src/Redux/Slice/userSlice";


function UserVideoCall() {
  const videoCallRef = useRef<HTMLDivElement | null>(null);
  const { roomIdUser, showIncomingVideoCall, videoCall } = useSelector(
    (state:any) => state.user
  );
  let { socket } = useSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!roomIdUser) return;
    // Continue setup...
  }, [roomIdUser]);

  useEffect(() => {
    if (!roomIdUser) return;

   const appId = 936106089
        const serverSecret = "8949905a29d7e175f63f2cf55aec33dd";


    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      roomIdUser.toString(),
      Date.now().toString(),
      "User"
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: videoCallRef.current,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      turnOnMicrophoneWhenJoining: true,
      turnOnCameraWhenJoining: true,
      showPreJoinView: false,
      onLeaveRoom: () => {
        socket?.emit("leave-room", { to: showIncomingVideoCall?.trainerId });
        dispatch(setShowVideoCallUser(false));
        dispatch(setRoomIdUser(null));
        dispatch(setVideoCallUser(null));
        dispatch(setShowIncomingVideoCall(null));
      },
    });

    socket?.on("user-left", () => {
      zp.destroy();
      dispatch(setShowVideoCallUser(false));
      dispatch(setRoomIdUser(null));
      dispatch(setVideoCallUser(null));
      dispatch(setShowIncomingVideoCall(null));
      localStorage.removeItem("roomId");

      localStorage.removeItem("showVideoCall");
    });

    return () => {
      window.location.reload();

      zp.destroy();
    };
  }, [roomIdUser, dispatch, socket]);

  return (
    <div
      className="w-screen bg-black h-screen absolute z-[100]"
      ref={videoCallRef}
    />
  );
}

export default UserVideoCall;
