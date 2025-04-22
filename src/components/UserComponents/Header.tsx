import React from 'react';
import { Link } from 'react-router-dom';
import appLogo from 'src/assets/appLogo.png';
import { useSelector } from "react-redux";
import profileImage from '../../../src/assets/profileImage.jpg'
import { removeUserData } from 'src/Redux/Slice/userSlice';
import { useDispatch } from 'react-redux';
import userApi from 'src/utils/axios/axiosConfig';
import { ShieldBan } from 'lucide-react';

interface NavItem {
    label: string;
    href: string;
}

const navigation: NavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Find Doctors', href: '/doctors' },
    // { label: 'Patients', href: '/patients' },
    { label: 'Wallet', href: '/userWallet' },
    { label: 'Profile', href: '/userProfile' },
    {label:'My Bookings',href:'/bookingHistory'}
    // { label: 'Admin', href: '/admin' },
];

const Header: React.FC = () => {
    const dispatch = useDispatch()
    const userInfo = useSelector((state: any) => state.user.userInfo);


    const handleLogout = async () => {
        await userApi.post('/userLogout');
        dispatch(removeUserData()); // Removes user from Redux + localStorage
    };
    return (
        <header className="w-full bg-gradient-to-r bg-customHeaderBlue shadow-2xl z-10 relative overflow-visible">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo */}
                    <div className="flex items-center justify-start h-12">
                        <Link to="/">
                            <img
                                src={appLogo}
                                alt="App Logo"
                                className="h-24 w-auto object-contain"
                            />
                        </Link>
                    </div>

                    {/* Combined Navigation and Auth Buttons */}
                    <div className="flex items-center space-x-6">
                        <nav className="hidden md:flex items-center space-x-6">
                            {navigation.map((item) => (
                                <Link
                                    key={item.label}
                                    to={item.href}
                                    className="text-sm font-medium text-gray-700 hover:text-sky-600 transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                        {/* <div className="flex items-center space-x-4">
                            <Link
                                to="/signup"
                                className="hidden sm:inline-flex items-center justify-center px-4 py-2 border border-sky-600 text-sm font-medium rounded-md text-sky-600 bg-white hover:bg-sky-50 transition-colors"
                            >
                                Register
                            </Link>

                            <Link
                                to="/login"
                                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 transition-colors"
                            >
                                Login
                            </Link>
                        </div> */}

                        <div className="flex items-center space-x-4">
                            {userInfo && userInfo._id ? (
                                <button
                                    onClick={handleLogout}
                                    className="px-3 py-1 bg-teal-400 text-white text-sm font-medium rounded-md 
                                     shadow hover:bg-red-700 transition duration-300 
                                     hover:shadow-md active:scale-95 flex items-center space-x-1"
                                >
                                    <ShieldBan size={16} />
                                    <span>Logout</span>
                                </button>

                            ) : (
                                <>
                                    <Link
                                        to="/signup"
                                        className="hidden sm:inline-flex items-center justify-center px-4 py-2 border border-sky-600 text-sm font-medium rounded-md text-sky-600 bg-white hover:bg-sky-50 transition-colors"
                                    >
                                        Register
                                    </Link>

                                    <Link
                                        to="/login"
                                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 transition-colors"
                                    >
                                        Login
                                    </Link>
                                </>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
