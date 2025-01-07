import DoctorLogo from 'src/assets/DoctorLogo.png'


const Header = () => {
    return (
        <div id="header" className="w-full h-16 flex justify-between items-center" >
            <div id="img-container" className="w-40 h-full flex items-center">
                <img src={DoctorLogo} className="w-auto h-20 px-8" alt="image logo" />
            </div>
            <div id="nav-items" className="flex gap-4 items-center px-28">
                <p className="px-6">Safety Of Your Data</p>
                <button className="px-4 py-1 border border-black rounded bg-transparent" >Contact Us</button>
            </div>
        </div>
    )
}

export default Header