"use client"

import { useState, useEffect } from "react"
import { Calendar, Users, DollarSign, Activity, TrendingUp, Clock } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area } from "recharts"
import { findDoctorDashboard } from "src/services/doctor/doctorapi"

// Types for the data structure
interface Appointment {
    _id: string
    doctorId: string
    userId: string
    slotId: object
    paymentStatus: "paid" | "pending" | "failed"
    bookingStatus: "booked" | "cancelled" | "completed"
    consultationStatus: "pending" | "in-progress" | "completed" | "cancelled"
    createdAt: string
    updatedAt: string
}

interface DashboardData {
    totalAppointments: number
    activePatients: number
    upcomingAppointments: Appointment[]
    doctorRevenue: number
}

type DoctorDashboardProps = {}

// Chart configurations
const revenueChartConfig = {
    revenue: {
        label: "Revenue",
        color: "#3b82f6",
    },
} satisfies ChartConfig

const appointmentStatusConfig = {
    completed: {
        label: "Completed",
        color: "#10b981",
    },
    pending: {
        label: "Pending",
        color: "#f59e0b",
    },
    cancelled: {
        label: "Cancelled",
        color: "#ef4444",
    },
} satisfies ChartConfig

const patientActivityConfig = {
    patients: {
        label: "Active Patients",
        color: "#8b5cf6",
    },
} satisfies ChartConfig

export default function DoctorDashboard({ }: DoctorDashboardProps) {
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    // Fetch dashboard data on component mount
    useEffect(() => {
        const fetchDashboardData = async () => {
            setIsLoading(true)
            setError(null)

            try {
                const doctorInfoString = localStorage.getItem("doctorInfo")
                const doctorInfo = doctorInfoString ? JSON.parse(doctorInfoString) : null

                if (!doctorInfo?._id) {
                    setError("Doctor information not found")
                    setIsLoading(false)
                    return
                }

                const response: any = await findDoctorDashboard(doctorInfo._id)
                setDashboardData(response.data)
            } catch (error) {
                console.error("Error fetching dashboard data:", error)
                setError("Failed to load dashboard data")
            } finally {
                setIsLoading(false)
            }
        }

        fetchDashboardData()
    }, [])

    // If still loading, show loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading dashboard data...</p>
                </div>
            </div>
        )
    }

    // If there's an error, show error state
    if (error || !dashboardData) {
        return (
            <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
                    <Activity className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to load dashboard</h2>
                    <p className="text-gray-600 mb-6">{error || "No dashboard data available"}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    // Generate revenue data for the chart
    const revenueData = [


        { month: "Apr", revenue: 5000 },
        { month: "May", revenue: dashboardData.doctorRevenue },
    ]


    // Process appointment status data
    const appointmentStatusData = [
        {
            status: "completed",
            count: dashboardData.upcomingAppointments.filter((apt) => apt.consultationStatus === "completed").length || 1,
            fill: "#10b981",
        },
        {
            status: "pending",
            count: dashboardData.upcomingAppointments.filter((apt) => apt.consultationStatus === "pending").length || 0,
            fill: "#f59e0b",
        },
        {
            status: "cancelled",
            count: dashboardData.upcomingAppointments.filter((apt) => apt.consultationStatus === "cancelled").length || 0,
            fill: "#ef4444",
        },
    ]

    // Patient activity data
    const patientActivityData = [

        { day: new Date(Date.now()).toLocaleDateString('en-US', { weekday: 'long' }), patients: dashboardData.activePatients },

    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed":
                return "bg-green-100 text-green-800"
            case "pending":
                return "bg-yellow-100 text-yellow-800"
            case "cancelled":
                return "bg-red-100 text-red-800"
            case "paid":
                return "bg-green-100 text-green-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
                        <p className="text-gray-600 mt-1">Welcome back! Here's your practice overview.</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <Activity className="w-3 h-3 mr-1" />
                            Active
                        </Badge>
                    </div>
                </div>

                {/* Key Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-blue-700">Total Appointments</CardTitle>
                            <Calendar className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-900">{dashboardData.totalAppointments}</div>
                            <p className="text-xs text-blue-600 mt-1">
                                <TrendingUp className="w-3 h-3 inline mr-1" />
                                +12% from last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-green-700">Active Patients</CardTitle>
                            <Users className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-900">{dashboardData.activePatients}</div>
                            <p className="text-xs text-green-600 mt-1">
                                <TrendingUp className="w-3 h-3 inline mr-1" />
                                +8% from last week
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-purple-700">Total Revenue</CardTitle>
                            <DollarSign className="h-4 w-4 text-purple-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-purple-900">${dashboardData.doctorRevenue.toLocaleString()}</div>
                            <p className="text-xs text-purple-600 mt-1">
                                <TrendingUp className="w-3 h-3 inline mr-1" />
                                +15% from last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-orange-700">Upcoming Appointments</CardTitle>
                            <Clock className="h-4 w-4 text-orange-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-900">
                                {
                                    dashboardData.upcomingAppointments.filter(
                                        (appointment) => appointment.consultationStatus === 'pending'
                                    ).length
                                }
                            </div>

                            <p className="text-xs text-orange-600 mt-1">
                                <Clock className="w-3 h-3 inline mr-1" />
                                You have upcoming appointment's
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Revenue Trend Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-blue-600" />
                                Revenue Trend
                            </CardTitle>
                            <CardDescription>Monthly revenue over the past 6 months</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={revenueChartConfig}>
                                <AreaChart data={revenueData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                                </AreaChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                    {/* Patient Activity Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-green-600" />
                                Weekly Patient Activity
                            </CardTitle>
                            <CardDescription>Active patients per day this week</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={patientActivityConfig}>
                                <BarChart data={patientActivityData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="patients" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* Appointment Status and Recent Appointments */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Appointment Status Pie Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="w-5 h-5 text-purple-600" />
                                Appointment Status
                            </CardTitle>
                            <CardDescription>Distribution of appointment statuses</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={appointmentStatusConfig}>
                                <PieChart>
                                    <Pie
                                        data={appointmentStatusData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="count"
                                    >
                                        {appointmentStatusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                </PieChart>
                            </ChartContainer>
                            <div className="flex justify-center space-x-4 mt-4">
                                {appointmentStatusData.map((item) => (
                                    <div key={item.status} className="flex items-center space-x-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
                                        <span className="text-sm capitalize">
                                            {item.status}: {item.count}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Appointments */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-blue-600" />
                                Recent Appointments
                            </CardTitle>
                            <CardDescription>Latest appointment activities</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {dashboardData.upcomingAppointments.length > 0 ? (
                                    dashboardData.upcomingAppointments.map((appointment) => (
                                        <div key={appointment._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <Users className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">Patient ID: {appointment.userId.slice(-8)}</p>
                                                    <p className="text-sm text-gray-500">
                                                        {new Date(appointment.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Badge className={getStatusColor(appointment.consultationStatus)}>
                                                    {appointment.consultationStatus}
                                                </Badge>
                                                <Badge className={getStatusColor(appointment.paymentStatus)}>{appointment.paymentStatus}</Badge>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                        <p>No recent appointments</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>


            </div>
        </div>
    )
}
