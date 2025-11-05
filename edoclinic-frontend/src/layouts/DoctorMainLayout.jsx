import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import DoctorSidebar from "../components/DoctorSidebar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css'

export default function DoctorMainLayout(){
    
    return(
        <>
            <Navbar />
            <div className="flex grid grid-cols-6">
                <aside className="w-64 p-4 col-span-1 bg-gray-200">
                    <DoctorSidebar />
                </aside>
                <main className="p-6 col-span-5 bg-gray-100">
                    <Outlet />
                </main>
                <ToastContainer />
            </div>
        </>
    );
}