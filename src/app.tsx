import { Outlet } from "react-router-dom"
import Header from "./components/UserComponents/Header"
import Footer from './components/UserComponents/Footer'
import { SocketProvider } from "./context/socketContext"
import IncomingVideocall from "@components/UserComponents/IncomingVideocall"
import { useSelector } from "react-redux"
import { setShowVideoCallUser } from "./Redux/Slice/userSlice"
import UserVideoCall from "@components/UserComponents/UserVideoCall"

const AppLayout = () => {
    const { showIncomingVideoCall,  showVideoCallUser } = useSelector((state: any) => state.user)
console.log("ShowVideoCallUser : ", showVideoCallUser);

    return (
        // <div className="App">

        //         <Header />
        //         <Outlet />
        //         <Footer />

        // </div>
        <>
            {showIncomingVideoCall?._id && <IncomingVideocall />}
            { showVideoCallUser && <UserVideoCall />}
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </>
    )
}
export default AppLayout