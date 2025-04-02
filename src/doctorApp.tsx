import { Outlet } from "react-router-dom"
import Header from "./components/UserComponents/Header"
import Footer from './components/UserComponents/Footer'
import { DoctorSidebar } from "@components/DoctorComponents/DoctorSideBar"
const DoctorAppLayout = () => {
    const doctorData = {
        name: "Dr. John Doe",
        credentials: "MD, Cardiology",
        licenseNumber: "12345678",
        photoUrl: "https://via.placeholder.com/80", // Replace with actual image URL
        isAvailable: true,
    };

    return (
        <div className="flex h-screen w-full">
     
        <div className="w-64 flex-shrink-0 bg-gray-200">
            <DoctorSidebar doctor={doctorData} />
        </div>
    
        {/* Main Content - Takes the rest of the screen, with its own background */}
        <div className="flex-1 overflow-y-auto ">
            <Outlet />
        </div>
    </div>
    



    )
}
export default DoctorAppLayout; 