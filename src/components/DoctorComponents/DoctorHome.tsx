import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { removeDoctorData } from "src/Redux/Slice/doctorSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const DoctorHome = () => {
    
    const location = useLocation();
    const doctorData = location.state?.doctorData;
    const dispatch=useDispatch()
    const navigate=useNavigate()
   const handleLogout = () => {
       dispatch(removeDoctorData()); // Removes user from Redux + localStorage
       navigate('/doctorLogin'); // Redirect to admin login page
     };

    return (
        <nav className="w-full h-14 bg-gray-800 shadow-md">
            <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-full text-white">
                {/* Left Side - Logo or Brand */}
                <div className="text-xl font-semibold">HomeCare</div>

                {/* Center - Nav Items */}
                <div className="flex space-x-6">
                    <Link to="/details" className="hover:text-gray-300">Details</Link>
                    <Link to="/notifications" className="hover:text-gray-300">Notifications</Link>
                    <Link
                        to="/doctorProfile"
                        state={{ doctorData }}
                        className="hover:text-gray-300"
                    >
                        Profile
                    </Link>

                </div>

                {/* Right Side - Button (optional) */}
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </nav>

    )
}

export default DoctorHome