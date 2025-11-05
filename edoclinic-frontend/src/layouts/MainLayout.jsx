import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css'

export default function MainLayout(){
    return(
        <>
            <Navbar />
            <Outlet />
            <ToastContainer />
        </>
    );
}