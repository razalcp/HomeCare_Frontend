"use client"

import * as React from "react"
import {
    BarChart3,
    Calendar,
    Clock,
    ClipboardList,
    FileText,
    LogOut,
    MessageCircle,
    Settings,
    Users,
    AlarmClock
} from "lucide-react"
import { cn } from "../../utils/utilsShard"
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doctorApi } from "src/utils/axios/axiosConfig";
import { removeDoctorData } from "src/Redux/Slice/doctorSlice"
import { useSelector } from "react-redux"
import { RootState } from "src/Redux/appStore"

type DoctorInfo = {
    name: string;
    degree: string;
    medicalLicenceNumber: string;
    profileImage: string;
    departments: string[];
    experience: string;
    isVerified: boolean;
}

export function DoctorSidebar({ className }: { className?: string }) {
    // const [doctorData, setDoctorData] = useState<DoctorInfo | null>(null);
    const doctorData = useSelector((state: RootState) => state.doctor.doctorInfo) as DoctorInfo | null;


    const [activeItem, setActiveItem] = useState("/doctorHome"); // Default activp[;852p[\963.\e is Dashboard

    // useEffect(() => {
    //     const storedDoctor = localStorage.getItem("doctorInfo");
    //     if (storedDoctor) {
    //         setDoctorData(JSON.parse(storedDoctor));
    //     }
    // }, []);

    const [is9lable, setIsAvailable] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = async () => {
        await doctorApi.post('/doctorLogout');
        dispatch(removeDoctorData()); // Removes user from Redux + localStorage
        navigate('/doctorLogin'); // Redirect to admin login page
    };
    const menuItems = [
        { icon: BarChart3, label: "Dashboard", href: "/doctorHome", highlight: true },
        // { icon: ClipboardList, label: "Requests", href: "/requests" },
        { icon: Calendar, label: "Add Slots", href: '/doctorAddSlots' },
        { icon: Clock, label: "Appointments", href: "/doctorAppointments" },
        // { icon: Users, label: "My Patients", href: "/patients" },
        { icon: Users, label: "My Wallet", href: "/doctorWallet" },
        { icon: ClipboardList, label: "Chat", href: "/doctorChat" },

        {
            icon: Settings,
            label: "Profile Settings",
            onClick: () => navigate("/doctorProfile", { state: { doctorData } })
        },
        // { icon: AlarmClock, label: "Add Slots", href: "/addSlot" },
    ];

    if (!doctorData) return null; // Return nothing if doctor data isn't loaded

    return (
        <aside className={cn("flex h-screen w-64 flex-col bg-gray-200", className)}>
            {/* Logo */}
            <div className="flex items-center justify-center p-4">
                <div className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-teal-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5 text-white"
                        >
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                            <path d="M12 7h.01" />
                        </svg>
                    </div>
                    <span className="text-lg font-bold text-teal-600">HOMECARE</span>
                </div>
            </div>

            {/* Doctor Profile */}
            <div className="mx-4 rounded-lg bg-gray-300 p-4">
                <div className="flex flex-col items-center">
                    <div className="relative mb-2">
                        <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-white bg-blue-600">
                            <img
                                src={doctorData.profileImage || "/placeholder.svg?height=80&width=80"}
                                alt={doctorData.name}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                    <h3 className="text-center text-lg font-bold">{doctorData.name}</h3>
                    <p className="text-center text-sm text-gray-700">{doctorData.degree}</p>

                    {/* License Number */}
                    <div className="mt-1 flex w-full justify-between text-xs text-gray-700">
                        <span>Licence Number</span>
                        <span>: {doctorData.medicalLicenceNumber}</span>
                    </div>

                    {/* Department */}
                    <div className="mt-1 flex w-full justify-between text-xs text-gray-700">
                        <span>Department</span>
                        <span>: {doctorData.departments?.join(", ")}</span>
                    </div>

                    {/* Experience */}
                    {/* <div className="mt-1 w-full text-xs text-gray-700">
                        <p className="mb-1 font-medium">Experience</p>
                        <p>{doctorData.experience || "No experience info available."}</p>
                    </div> */}

                    {/* Availability */}
                    <div className="mt-3 w-full">
                        {/* <p className="mb-1 text-xs text-gray-700">Availability*</p> */}
                        {/* <button
                            onClick={() => setIsAvailable(!isAvailable)}
                            className={cn(
                                "w-full rounded-md py-1 text-center text-sm font-medium",
                                isAvailable ? "bg-green-500 text-white" : "bg-red-500 text-white",
                            )}
                        >
                            {isAvailable ? "I am Available Now" : "Not Available"}
                        </button> */}
                    </div>
                </div>
            </div>


            <nav className="mt-4 flex-1 space-y-1 px-4">
                {menuItems.map((item, index) => {
                    const isActive = activeItem === item.href; // Check if the item is active

                    return (
                        <button
                            key={index}
                            onClick={() => {
                                setActiveItem(item.href); // Update active state
                                if (item.onClick) {
                                    item.onClick();
                                } else {
                                    navigate(item.href);
                                }
                            }}
                            className={cn(
                                "flex w-full items-center space-x-3 rounded-md px-4 py-3 text-sm font-medium text-left",
                                isActive ? "bg-green-500 text-white" : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </nav>



            {/* Logout Button */}
            <div className="p-4">
                <button onClick={handleLogout} className="flex w-full items-center justify-center space-x-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-purple-600 hover:bg-gray-100">
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}
