import { NavLink } from "react-router";
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { LiaCalendarWeekSolid } from "react-icons/lia";

export default function DoctorSidebar(){
    
    return(
        <div className="min-h-screen px-3 py-4 overflow-y-auto bg-gray-200 ">
            <ul className="space-y-2 font-medium">
                <li>
                    <NavLink to="/doctor_homepage" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-400 group">
                        <MdDashboard className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"/>
                        <span className="ms-3">Dashboard</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/doctor_homepage/appointments" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-400 group ">
                        <RiCalendarScheduleLine className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"/>
                        <span className="flex-1 ms-3 whitespace-nowrap">Appointments</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/doctor_homepage/weekly_schedule" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-400 group">
                        <LiaCalendarWeekSolid className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"/>
                        <span className="flex-1 ms-3 whitespace-nowrap">Weekly Schedule</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/doctor_homepage/profile" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-400 group">
                        <CgProfile className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"/>
                        <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}