import { Outlet } from "react-router-dom"
import SidebarLayout from "@components/AdminComponents/SidebarLayout"

const AdminAppLayout = () => {

    return (
        <div className="flex h-screen">
        {/* Sidebar on the left */}
        <SidebarLayout />
  
        {/* Main content area */}
        <div className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </div>
      </div>
    )
}
export default AdminAppLayout