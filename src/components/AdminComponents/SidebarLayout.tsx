// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Home,
//   Settings,
//   Users,
//   BarChart,
//   Mail,
//   Menu,
//   X, Component, Baby, IndianRupee, Cross, ShieldBan
// } from 'lucide-react';

// const SidebarLayout = () => {
//   const [isExpanded, setIsExpanded] = useState(true);
//   const navigate = useNavigate();


//   const menuItems = [
//     { icon: <Home size={24} />, label: 'Dashboard', path: '/adminHome' },
//     { icon: <Baby size={24} />, label: 'Doctor Verification', path: '/doctorVerification' },
//     { icon: <Cross size={24} />, label: 'Doctors', path: '/ma' },
//     { icon: <Settings size={24} />, label: 'Departments', path: '/adminDepartments' },
//     { icon: <Users size={24} />, label: 'Patients', path: '/managePatients' },
//     { icon: <IndianRupee size={24} />, label: 'Doctor Payment', path: '/doctor-payment' },
//     { icon: <ShieldBan size={24} />, label: 'Logout', path: '/logout' },
//   ];

//   return (
//     <div
//       className={`
//       bg-teal-800
//       text-white
//       transition-all
//       duration-300
//       ${isExpanded ? 'w-64' : 'w-20'}
//       flex
//       flex-col
//       h-full
//       min-h-screen
//     `}
//     >


//       {/* Header with toggle */}
//       <div className="flex items-center justify-between mb-8">
//         <h1 className={`font-bold text-xl ${!isExpanded && 'hidden'}`}>
//           HomeCare
//         </h1>
//         <button
//           onClick={() => setIsExpanded(!isExpanded)}
//           className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
//         >
//           {isExpanded ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* Navigation Items */}
//       <nav className="flex-1">
//         <ul className="space-y-2">
//           {menuItems.map((item, index) => (
//             <li key={index}>
//               <button
//                 onClick={() => navigate(item.path)}
//                 className={`
//                   w-full
//                   flex
//                   items-center
//                   p-3
//                   rounded-lg
//                   hover:bg-gray-800
//                   transition-colors
//                   ${isExpanded ? 'justify-start space-x-4' : 'justify-center'}
//                 `}
//               >
//                 {item.icon}
//                 <span className={`${!isExpanded && 'hidden'}`}>
//                   {item.label}
//                 </span>
//               </button>
//             </li>
//           ))}
//         </ul>
//       </nav>

//       {/* Profile Section */}
//       <div className={`
//         mt-auto
//         flex
//         items-center
//         p-3
//         rounded-lg
//         hover:bg-gray-800
//         transition-colors
//         cursor-pointer
//         ${isExpanded ? 'space-x-4' : 'justify-center'}
//       `}>
//         <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
//           <span className="text-sm font-medium">AD</span>
//         </div>
//         <div className={`${!isExpanded && 'hidden'}`}>
//           <p className="font-medium">Admin</p>
//           <p className="text-sm text-gray-400">Admin</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SidebarLayout;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Home,
  Settings,
  Users,
  BarChart,
  Mail,
  Menu,
  X,
  Baby,
  IndianRupee,
  ShieldBan,
  User
} from 'lucide-react';
import { removeAdminData } from 'src/Redux/Slice/adminSlice';
import { adminApi } from 'src/utils/axios/axiosConfig';

const SidebarLayout = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await adminApi.post('/adminLogout');
    dispatch(removeAdminData()); // Removes user from Redux + localStorage

    navigate('/adminLogin'); 
  };

  const menuItems = [
    { icon: <Home size={24} />, label: 'Dashboard', path: '/adminHome' },
    { icon: <Baby size={24} />, label: 'Doctor Verification', path: '/doctorVerification' },
    { icon: <Users size={24} />, label: 'Doctors', path: '/manageDoctors' },
    { icon: <Settings size={24} />, label: 'Departments', path: '/adminDepartments' },
    { icon: <Users size={24} />, label: 'Patients', path: '/managePatients' },
    { icon: <IndianRupee size={24} />, label: 'Doctor Payment', path: '/doctor-payment' },
    { icon: <ShieldBan size={24} />, label: 'Logout', action: 'logout' }, // Logout action
  ];

  return (
    <div className={`bg-teal-800 text-white transition-all duration-300 ${isExpanded ? 'w-64' : 'w-20'} flex flex-col h-full min-h-screen p-4`}>

      {/* Header with toggle button */}
      <div className="flex items-center justify-between mb-8">
        <h1 className={`font-bold text-xl ${!isExpanded && 'hidden'}`}>
          HomeCare
        </h1>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          {isExpanded ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => {
                  if (item.action === 'logout') {
                    handleLogout();
                  } else {
                    navigate(item.path);
                  }
                }}
                className={`w-full flex items-center p-3 rounded-lg hover:bg-gray-800 transition-colors ${isExpanded ? 'justify-start space-x-4' : 'justify-center'}`}
              >
                {item.icon}
                <span className={`${!isExpanded && 'hidden'}`}>
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Profile Section */}
      <div className={`mt-auto flex items-center p-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer ${isExpanded ? 'space-x-4' : 'justify-center'}`}>
        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
          <User size={16} />
        </div>
        <div className={`${!isExpanded && 'hidden'}`}>
          <p className="font-medium">Admin</p>
          <p className="text-sm text-gray-400">Admin Panel</p>
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;
