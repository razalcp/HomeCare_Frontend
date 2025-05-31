// import SidebarLayout from "../AdminComponents/SidebarLayout"
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
// const AdminHome = () => {

// const dummyBarData = [
//     { name: 'Jan', users: 400 },
//     { name: 'Feb', users: 300 },
//     { name: 'Mar', users: 500 },
//     { name: 'Apr', users: 200 },
//     { name: 'May', users: 350 },
//   ];

//   const dummyLineData = [
//     { name: 'Week 1', appointments: 10 },
//     { name: 'Week 2', appointments: 20 },
//     { name: 'Week 3', appointments: 15 },
//     { name: 'Week 4', appointments: 25 },
//   ];
//     return (

//           <div className="p-6 bg-gray-100 min-h-screen">
//             <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//               <div className="bg-white p-4 rounded-2xl shadow-md">
//                 <p className="text-gray-500">Total Users</p>
//                 <h2 className="text-2xl font-semibold mt-2">1,245</h2>
//               </div>
//               <div className="bg-white p-4 rounded-2xl shadow-md">
//                 <p className="text-gray-500">Appointments</p>
//                 <h2 className="text-2xl font-semibold mt-2">320</h2>
//               </div>
//               <div className="bg-white p-4 rounded-2xl shadow-md">
//                 <p className="text-gray-500">Revenue</p>
//                 <h2 className="text-2xl font-semibold mt-2">₹75,000</h2>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="bg-white p-4 rounded-2xl shadow-md">
//                 <h2 className="text-lg font-semibold mb-4">Monthly User Growth</h2>
//                 <ResponsiveContainer width="100%" height={250}>
//                   <BarChart data={dummyBarData}>
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Bar dataKey="users" fill="#3b82f6" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>

//               <div className="bg-white p-4 rounded-2xl shadow-md">
//                 <h2 className="text-lg font-semibold mb-4">Weekly Appointments</h2>
//                 <ResponsiveContainer width="100%" height={250}>
//                   <LineChart data={dummyLineData}>
//                     <CartesianGrid stroke="#ccc" />
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Line type="monotone" dataKey="appointments" stroke="#10b981" strokeWidth={2} />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>

//       );
// }
// export default AdminHome
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

"use client"

import { useEffect, useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts"
import { User, Stethoscope, DollarSign, CalendarCheck, Users, TrendingUp, Gem, LineChartIcon } from "lucide-react"
import { getDashBoardData } from "src/services/admin/adminApi"

const COLORS = ["#00ff88", "#ff0080", "#0080ff", "#ff8000", "#8000ff", "#ffff00"]
const NEON_COLORS = ["#14b8a6", "#06b6d4", "#10b981", "#0891b2", "#0d9488", "#22d3ee"]
interface MonthlyStat {
  month: string;
  revenue: number;
  users: number;
  bookings: number;
}
export default function AdminHome() {
  const [dashboardData, setDashboardData] = useState({
    totalRevenue: 0,
    totalUsers: 0,
    totalDoctors: 0,
    activeUsers: 0,
    adminRevenue: 0,
    doctorRevenue: 0,
    activeDoctors: 0,
    totalBookings: 0,
    userDoctorChartData: [],
  })

  const [monthlyData, setMonthlyData] = useState<MonthlyStat[]>([
    { month: "Jan", revenue: 45000, users: 120, bookings: 380 },
    { month: "Feb", revenue: 52000, users: 150, bookings: 420 },
    { month: "Mar", revenue: 48000, users: 180, bookings: 450 },
    { month: "Apr", revenue: 61000, users: 200, bookings: 520 },
    { month: "May", revenue: 55000, users: 220, bookings: 480 },
    { month: "Jun", revenue: 67000, users: 250, bookings: 580 },
  ]);
  useEffect(() => {

    const fetchDashboardData = async () => {
      try {
        const response: any = await getDashBoardData()
        console.log("DashBoard Data", response);
        setDashboardData({
          totalRevenue: response?.data?.totalRevenue,
          totalUsers: response?.data?.totalUsers,
          totalDoctors: response?.data?.totalDoctors,
          activeUsers: response?.data?.activeUsers,
          adminRevenue: response?.data?.adminRevenue,
          doctorRevenue: response?.data?.doctorRevenue,
          activeDoctors: response?.data?.activeDoctors,
          totalBookings: response?.data?.totalBookings,
          userDoctorChartData: [
            { name: "Users", value: response?.data?.totalUsers },
            { name: "Doctors", value: response?.data?.totalDoctors },
          ],
        })
        setMonthlyData(response?.data?.monthlyDashBoardData)
      } catch (error) {
        console.error("Something went wrong : ", error)
      }

    }
    fetchDashboardData()

  }, [])



  const stats = [
    {
      label: "Total Revenue",
      value: `₹${dashboardData.totalRevenue.toLocaleString()}`,
      icon: <DollarSign className="text-2xl" />,
      gradient: "from-emerald-400 via-teal-400 to-cyan-400",
      shadowColor: "shadow-teal-500/50",
      progress: 85,
      change: "+12.5%",
    },
    {
      label: "Total Users",
      value: dashboardData.totalUsers,
      icon: <User className="text-2xl" />,
      gradient: "from-blue-400 via-cyan-400 to-teal-400",
      shadowColor: "shadow-blue-500/50",
      progress: 78,
      change: "+8.2%",
    },
    {
      label: "Total Doctors",
      value: dashboardData.totalDoctors,
      icon: <Stethoscope className="text-2xl" />,
      gradient: "from-teal-400 via-cyan-400 to-blue-400",
      shadowColor: "shadow-teal-500/50",
      progress: 92,
      change: "+15.3%",
    },
    {
      label: "Active Users",
      value: dashboardData.activeUsers,
      icon: <Users className="text-2xl" />,
      gradient: "from-cyan-400 via-teal-400 to-emerald-400",
      shadowColor: "shadow-cyan-500/50",
      progress: 79,
      change: "+6.7%",
    },
    {
      label: "Active Doctors",
      value: dashboardData.activeDoctors,
      icon: <Stethoscope className="text-2xl" />,
      gradient: "from-indigo-400 via-blue-400 to-cyan-400",
      shadowColor: "shadow-indigo-500/50",
      progress: 82,
      change: "+9.1%",
    },
    {
      label: "Total Bookings",
      value: dashboardData.totalBookings,
      icon: <CalendarCheck className="text-2xl" />,
      gradient: "from-emerald-400 via-teal-400 to-cyan-400",
      shadowColor: "shadow-emerald-500/50",
      progress: 88,
      change: "+18.9%",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 p-[1.5rem]">
      {/* Animated Background */}
      {/* <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div> */}

      <div className="relative z-10 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Gem className="text-4xl text-transparent bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text" />
            <h1 className="text-5xl font-black bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              ADMIN DASHBOARD
            </h1>
            <Gem className="text-4xl text-transparent bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text" />
          </div>
          <p className="text-gray-300 text-lg">Real-time Analytics & Performance Dashboard</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`relative overflow-hidden border-0 bg-gradient-to-br ${stat.gradient} ${stat.shadowColor} shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 group rounded-xl`}
            >
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
              <div className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm text-white group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <span className="px-2 py-1 rounded-md bg-white/20 text-white border border-white/30 font-bold text-xs">
                    {stat.change}
                  </span>
                </div>
                <div className="space-y-3">
                  <p className="text-white/80 font-medium text-sm uppercase tracking-wider">{stat.label}</p>
                  <p className="text-3xl font-black text-white">{stat.value}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-white/70">
                      <span>Progress</span>
                      <span>{stat.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-white/80 rounded-full" style={{ width: `${stat.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Revenue Breakdown */}
          <div className="border-0 bg-black/40 backdrop-blur-xl shadow-2xl shadow-teal-500/20 hover:shadow-teal-500/40 transition-all duration-500 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent flex items-center gap-3">
                <TrendingUp className="text-teal-400" />
                Revenue Breakdown
              </h2>
            </div>
            <div className="p-4">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[
                    { name: "Admin", revenue: dashboardData.adminRevenue },
                    { name: "Doctors", revenue: dashboardData.doctorRevenue },
                  ]}
                >
                  <XAxis dataKey="name" tick={{ fill: "#fff", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#fff", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      border: "1px solid #14b8a6",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                  />
                  <Bar dataKey="revenue" fill="url(#revenueGradient)" radius={[8, 8, 0, 0]} />
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#14b8a6" />
                      <stop offset="100%" stopColor="#0d9488" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* User vs Doctor Ratio */}
          <div className="border-0 bg-black/40 backdrop-blur-xl shadow-2xl shadow-teal-500/20 hover:shadow-teal-500/40 transition-all duration-500 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-3">
                <Users className="text-teal-400" />
                User Distribution
              </h2>
            </div>
            <div className="p-4">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dashboardData.userDoctorChartData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={120}
                    innerRadius={60}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {dashboardData.userDoctorChartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={NEON_COLORS[index % NEON_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      border: "1px solid #14b8a6",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                    labelStyle={{ color: "#fff" }}
                    itemStyle={{ color: "#fff" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Revenue Trend */}
          <div className="border-0 bg-black/40 backdrop-blur-xl shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-500 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-3">
                <LineChartIcon className="text-cyan-400" />
                Monthly Revenue Trend
              </h2>
            </div>
            <div className="p-4">
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={monthlyData}>
                  <XAxis dataKey="month" tick={{ fill: "#fff", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#fff", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      border: "1px solid #00ffff",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#00ffff" strokeWidth={3} fill="url(#areaGradient)" />
                  <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00ffff" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#00ffff" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bookings Trend */}
          <div className="border-0 bg-black/40 backdrop-blur-xl shadow-2xl shadow-orange-500/20 hover:shadow-orange-500/40 transition-all duration-500 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent flex items-center gap-3">
                <CalendarCheck className="text-orange-400" />
                Booking Trends
              </h2>
            </div>
            <div className="p-4">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlyData}>
                  <XAxis dataKey="month" tick={{ fill: "#fff", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#fff", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      border: "1px solid #ff6600",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="bookings"
                    stroke="#ff6600"
                    strokeWidth={4}
                    dot={{ fill: "#ff6600", strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: "#ff6600", strokeWidth: 2, fill: "#fff" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="border-0 bg-black/40 backdrop-blur-xl shadow-2xl shadow-teal-500/20 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent text-center">
              🚀 Performance Metrics
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center space-y-2">
                <div className="text-3xl font-black text-transparent bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text">
                  {((dashboardData.activeUsers / dashboardData.totalUsers) * 100).toFixed(1)}%
                </div>
                <p className="text-gray-300 text-sm">User Engagement</p>
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full"
                    style={{ width: `${(dashboardData.activeUsers / dashboardData.totalUsers) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-black text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
                  {((dashboardData.activeDoctors / dashboardData.totalDoctors) * 100).toFixed(1)}%
                </div>
                <p className="text-gray-300 text-sm">Doctor Activity</p>
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                    style={{ width: `${(dashboardData.activeDoctors / dashboardData.totalDoctors) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text">
                  {(dashboardData.totalBookings / dashboardData.totalUsers).toFixed(1)}
                </div>
                <p className="text-gray-300 text-sm">Avg Bookings/User</p>
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-black text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text">
                  ₹{(dashboardData.totalRevenue / dashboardData.totalBookings).toFixed(0)}
                </div>
                <p className="text-gray-300 text-sm">Revenue/Booking</p>
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
