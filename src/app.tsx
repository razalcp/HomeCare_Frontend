import { Outlet } from "react-router-dom"
import Header from "./components/UserComponents/Header"
import Footer from './components/UserComponents/Footer'

const AppLayout = () => {

    return (
        // <div className="App">

        //         <Header />
        //         <Outlet />
        //         <Footer />

        // </div>
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
export default AppLayout