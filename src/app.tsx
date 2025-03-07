import { Outlet } from "react-router-dom"
import Header from "./components/UserComponents/Header"
import Footer from './components/UserComponents/Footer'

const AppLayout = () => {

    return (
        <div className="App">
          
                <Header />
                <Outlet />
                <Footer />
           
        </div>
    )
}
export default AppLayout