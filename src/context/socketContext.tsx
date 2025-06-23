import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";
import { endCallDoctor, setPrescription, setRoomId, setShowVideoCall, setVideoCall } from "src/Redux/Slice/doctorSlice";
import { endCallUser, setRoomIdUser, setShowIncomingVideoCall, setShowVideoCallUser, setVideoCallUser } from "src/Redux/Slice/userSlice";

// 1. Define context type
interface SocketContextType {
  socket: Socket | null;
  createSocket: (userId: string) => void;
}

// 2. Create context
const SocketContext = createContext<SocketContextType | null>(null);

// 3. Provider props
interface SocketProviderProps {
  children: ReactNode;
}


const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const socketRef = useRef<Socket | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: any) => state.user);
  const { doctorInfo } = useSelector((state: any) => state.doctor);
  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        setSocket(null);
      }
    };
  }, []);

  const createSocket = (userId: string) => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
    // console.log(userId , "userId" , socketRef.current, "socketRef" )

    // socketRef.current = io("http://localhost:3001", {
    //   withCredentials: true,
    //   transports: ["websocket"],
    //   query: { userId },
    // });
    socketRef.current = io("https://homecare.razal.live", {
      withCredentials: true,
      transports: ["websocket"],
      query: { userId },
    });

    socketRef.current.on("connect", () => {
      setIsConnected(true);
      setSocket(socketRef.current);
    });

    socketRef.current.on("disconnect", () => {
      setIsConnected(false);
      setSocket(null);
    });


    socketRef.current.on("incoming-video-call", (data: any) => {
      console.log("Incoming video call frontend:", data);
      dispatch(
        setShowIncomingVideoCall({
          _id: data._id,
          doctorId: data.from,
          callType: data.callType,
          doctorName: data.doctorName,
          doctorImage: data.doctorImage,
          roomId: data.roomId,
        })
      );
    });

    socketRef.current.on("call-rejected", () => {


      toast.error("Call ended or rejected ");
      dispatch(setVideoCall(null))
      dispatch(endCallDoctor());
      dispatch(endCallUser());
    });

    socketRef.current.on("accepted-call", (data: any) => {
      console.log("user accepted call");


      dispatch(setRoomIdUser(data.roomId));
      dispatch(setShowVideoCallUser(true));

      socketRef.current.emit("trainer-call-accept", {
        roomId: data.roomId,
        trainerId: data.from,
        to: data._id,
      });
    });

    socketRef.current.on('trianer-accept', (data: any) => {
      console.log("trainer accept");

      dispatch(setRoomId(data.roomId))
      dispatch(setShowVideoCall(true))
    })

    socketRef.current.on("user-left", (data) => {
      console.log("user-left");

      if (data === userInfo?.id) {
        dispatch(setPrescription(true))
        dispatch(setShowVideoCallUser(false));
        dispatch(setRoomIdUser(null));
        dispatch(setVideoCallUser(null));
        dispatch(setShowIncomingVideoCall(null));
      }

      else if (data === doctorInfo?.id) {

        dispatch(setPrescription(true))
        dispatch(setShowVideoCall(false));
        dispatch(setRoomId(null));
        dispatch(setVideoCall(null));
      }
    });



  };



  return (
    <SocketContext.Provider value={{ socket, createSocket }}>
      {children}
    </SocketContext.Provider>
  );
};


const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export { SocketContext, SocketProvider, useSocket };
