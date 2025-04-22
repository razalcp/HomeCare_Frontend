import SidebarLayout from "../AdminComponents/SidebarLayout"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
const AdminHome = () => {
    
const dummyBarData = [
    { name: 'Jan', users: 400 },
    { name: 'Feb', users: 300 },
    { name: 'Mar', users: 500 },
    { name: 'Apr', users: 200 },
    { name: 'May', users: 350 },
  ];
  
  const dummyLineData = [
    { name: 'Week 1', appointments: 10 },
    { name: 'Week 2', appointments: 20 },
    { name: 'Week 3', appointments: 15 },
    { name: 'Week 4', appointments: 25 },
  ];
    return (

          <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
    
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-4 rounded-2xl shadow-md">
                <p className="text-gray-500">Total Users</p>
                <h2 className="text-2xl font-semibold mt-2">1,245</h2>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-md">
                <p className="text-gray-500">Appointments</p>
                <h2 className="text-2xl font-semibold mt-2">320</h2>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-md">
                <p className="text-gray-500">Revenue</p>
                <h2 className="text-2xl font-semibold mt-2">₹75,000</h2>
              </div>
            </div>
    
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-2xl shadow-md">
                <h2 className="text-lg font-semibold mb-4">Monthly User Growth</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={dummyBarData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="users" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
    
              <div className="bg-white p-4 rounded-2xl shadow-md">
                <h2 className="text-lg font-semibold mb-4">Weekly Appointments</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={dummyLineData}>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="appointments" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
      
      );
}
export default AdminHome