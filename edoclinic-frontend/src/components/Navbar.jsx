import { NavLink,useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useState} from "react";
import { CgProfile } from "react-icons/cg";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { RiLogoutBoxRLine } from "react-icons/ri";

export default function Navbar(){

    const { isAuthenticated,user,logout,isDoctor,isPatient } = useAuth();
    const [dropdownOpen,setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    function handleLogout(){
        logout();
        setDropdownOpen(false);
        navigate("/");
    }

    function handleMyProfileClick(){
        setDropdownOpen(false);
        if(isDoctor()){
            navigate(`/doctor_homepage/profile`);
        }
        else if(isPatient()){
            navigate(`/patients/profile`);
        }
    }
    
    function handleMyAppointmentsClick(){
        setDropdownOpen(false);
        if(isDoctor()){
            navigate(`/doctor_homepage/appointments`);
        }
        else if(isPatient()){
            navigate(`/patients/appointments`);
        }
    }

    function toggleDropdown(){
        setDropdownOpen((dropdownOpen)=>!dropdownOpen);
    }

    function linkClass({ isActive }) {
        if (isActive) {
            return "text-white bg-blue-900 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50";
        } else {
            return "text-white hover:bg-blue-900 hover:text-white rounded-md px-3 py-2 ";
        }
    }

    return(
        <nav className="bg-blue-700 border-b border-white-500">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    <NavLink to="/" className="flex flex-shrink-0 items-center mr-4" >
                        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M14 24V32H22V24H14ZM20 30V26H16V30H20Z" fill="white"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M19 6C16.3933 6 14.1749 7.66227 13.3469 9.98462H6V12.4662L10 15.4969V40H7C6.44772 40 6 40.4477 6 41C6 41.5523 6.44772 42 7 42H10V42.0154H38V42H41C41.5523 42 42 41.5523 42 41C42 40.4477 41.5523 40 41 40H38V15.5321L42.5 12.5014V9.98462H24.6531C23.8251 7.66227 21.6067 6 19 6ZM24.6586 14C24.8797 13.3744 25 12.7013 25 12L25 11.9846H39.687L36.6946 14H24.6586ZM23.4722 16C22.3736 17.2275 20.777 18 19 18C17.223 18 15.6264 17.2275 14.5278 16H12V40H24V24H34V40H36V16H23.4722ZM13 12C13 12.7013 13.1203 13.3744 13.3414 14H11.3361L8.67616 11.9846H13L13 12ZM20 11V9H18V11H16V13H18V15H20V13H22V11H20ZM32 26V40H26V26H32Z" fill="white"/>
                        </svg>
                        <span className=" hidden md:block text-white text-2xl font-bold ml-2">EDoClinic</span>
                    </NavLink>
                    
                    <div className="flex justify-between items-center w-full">
                        {!isDoctor() && (
                        <div className="flex justify-center flex-1 space-x-2 mr-12">
                            <NavLink to="/" className={linkClass}>Home</NavLink>
                            <NavLink to="/doctors" className={linkClass}>Doctors</NavLink>
                        </div>
                        )}
                        
                        <div className= "ml-auto flex-shrink-0 flex space-x-2">
                            {isAuthenticated ? (
                                <div className="relative">
                                    <button className="flex items-center text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                                        onClick={toggleDropdown}>
                                        <span className="mr-2">{user.email}</span>
                                        <svg className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} 
                                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                
                                    {dropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50">
                                            <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                                                <div className="font-medium">{user.email}</div>
                                                <div className="text-gray-500 capitalize">{user.role.toLowerCase()}</div>
                                            </div>
                                            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 flex items-center"
                                                onClick={handleMyProfileClick}>
                                                <CgProfile className="w-4 h-4 mr-2"/>
                                                My Profile
                                            </button>
                                            <div className="border-t border-gray-200"></div>
                                            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 flex items-center"
                                                onClick={handleMyAppointmentsClick}>
                                                <RiCalendarScheduleLine className="w-4 h-4 mr-2"/>
                                                My Appointments
                                            </button>
                                            <div className="border-t border-gray-200"></div>
                                            <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 flex items-center"
                                                onClick={handleLogout}>
                                                <RiLogoutBoxRLine className="w-4 h-4 mr-2 "/>
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ): 
                            (
                            <NavLink to="/login?role=patient" className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">
                                Login
                            </NavLink>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}