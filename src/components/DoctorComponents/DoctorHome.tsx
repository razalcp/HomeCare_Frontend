import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { removeDoctorData } from "src/Redux/Slice/doctorSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doctorApi } from "src/utils/axios/axiosConfig";
import docBackground from 'src/assets/signUpBackground.jpg'
import statistics2 from 'src/assets/statistics2.jpg'
import chart from 'src/assets/chart.png'
const DoctorHome = () => {


    return (
        <>
  
  <div className="flex-grow h-screen w-full bg-slate-300">
      {/* Your content */}
      <img src={chart} className="ml-[370px] pt-[50px]"alt="" />
    </div>
        </>

    )
}

export default DoctorHome