import React, { useState } from 'react';
import { Menu, User, Calendar, Clock, Users, DollarSign, MessageSquare, Settings, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';

const DoctorDashboard = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Sample data
    const stats = {
        totalPatients: 1250,
        totalEarnings: 125000,
        totalAppointments: 3000,
        todayAppointments: 70
    };

    const appointmentRequests = [
        { id: 1, name: 'Nitin Verma', disease: 'Fever', date: '27/01/24' },
        { id: 2, name: 'Leena Dua', disease: 'Child Care', date: '05/02/24' },
        { id: 3, name: 'Megan Mac', disease: 'Flu', date: '18-03-24' }
    ];

    const mostVisited = [
        { id: 1, name: 'Nitin Verma', disease: 'Stress', visits: 27 },
        { id: 2, name: 'James Cleveland', disease: 'Anxiety', visits: 22 },
        { id: 3, name: 'Tyler Johnson', disease: 'Trauma', visits: 19 }
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`bg-white shadow-lg transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
                <div className="p-4">
                    <div className="flex items-center mb-8">
                        <img src="/api/placeholder/40/40" alt="Logo" className="w-10 h-10" />
                        {!isCollapsed && <span className="ml-2 text-xl font-bold">HomeCare</span>}
                    </div>

                    {/* Doctor Profile */}
                    <div className="text-center mb-6">
                        <img src="/api/placeholder/80/80" alt="Doctor" className="rounded-full mx-auto mb-2" />
                        {!isCollapsed && (
                            <>
                                <h3 className="font-semibold">Dr Unni Krishnan</h3>
                                <p className="text-sm text-gray-600">MDS, Ortho Specialist FRCS</p>
                                <p className="text-sm text-gray-600">License Number: 12345</p>
                            </>
                        )}
                    </div>

                    {/* Navigation Menu */}
                    <nav className="space-y-2">
                        {[
                            { icon: <Menu className="w-5 h-5" />, label: 'Dashboard', active: true },
                            { icon: <Calendar className="w-5 h-5" />, label: 'Appointments' },
                            { icon: <Clock className="w-5 h-5" />, label: 'Available Times' },
                            { icon: <Users className="w-5 h-5" />, label: 'My Patients' },
                            { icon: <DollarSign className="w-5 h-5" />, label: 'Accounts' },
                            { icon: <MessageSquare className="w-5 h-5" />, label: 'Messages' },
                            { icon: <Settings className="w-5 h-5" />, label: 'Profile Settings' },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className={`flex items-center p-2 rounded cursor-pointer transition-colors
                  ${item.active ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
                            >
                                {item.icon}
                                {!isCollapsed && <span className="ml-3">{item.label}</span>}
                            </div>
                        ))}
                    </nav>
                </div>

                {/* Logout Button */}
                <div className="absolute bottom-4 w-full left-0 px-4">
                    <button className="flex items-center p-2 text-red-500 hover:bg-red-50 rounded w-full">
                        <LogOut className="w-5 h-5" />
                        {!isCollapsed && <span className="ml-3">Logout</span>}
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 overflow-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold">Welcome, Dr. Unni Krishnan, Ortho Specialist</h1>
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-2 rounded-full hover:bg-gray-200"
                    >
                        {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                        { icon: <Users className="w-6 h-6 text-blue-500" />, label: 'Total Patients', value: stats.totalPatients },
                        { icon: <DollarSign className="w-6 h-6 text-green-500" />, label: 'Total Earnings', value: stats.totalEarnings },
                        { icon: <Calendar className="w-6 h-6 text-purple-500" />, label: 'Total Appointments', value: stats.totalAppointments },
                        { icon: <Clock className="w-6 h-6 text-orange-500" />, label: "Today's Appointments", value: stats.todayAppointments }
                    ].map((stat, index) => (
                        <div key={index} className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center space-x-4">
                                {stat.icon}
                                <div>
                                    <p className="text-2xl font-bold">{stat.value}</p>
                                    <p className="text-gray-600">{stat.label}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Appointment Requests and Most Visited Clients */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Appointment Requests */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6 border-b">
                            <h2 className="text-xl font-semibold">Appointment Requests</h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {appointmentRequests.map((appointment) => (
                                    <div key={appointment.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                                        <div className="flex items-center space-x-3">
                                            <img src="/api/placeholder/40/40" alt={appointment.name} className="w-10 h-10 rounded-full" />
                                            <div>
                                                <p className="font-medium">{appointment.name}</p>
                                                <p className="text-sm text-gray-600">{appointment.disease}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm text-gray-600">{appointment.date}</span>
                                            <button className="p-1 text-green-500 hover:bg-green-50 rounded">✓</button>
                                            <button className="p-1 text-red-500 hover:bg-red-50 rounded">×</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Most Visited Clients */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6 border-b">
                            <h2 className="text-xl font-semibold">Most Visited Clients</h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {mostVisited.map((client) => (
                                    <div key={client.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                                        <div className="flex items-center space-x-3">
                                            <img src="/api/placeholder/40/40" alt={client.name} className="w-10 h-10 rounded-full" />
                                            <div>
                                                <p className="font-medium">{client.name}</p>
                                                <p className="text-sm text-gray-600">{client.disease}</p>
                                            </div>
                                        </div>
                                        <span className="text-sm text-gray-600">{client.visits} times</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;