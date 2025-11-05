import { api } from "../services/AuthService";
import { useNavigate } from "react-router";
import { formatDate,formatTime } from "../utils/helpers";
import { toast } from 'react-toastify';

export default function AppointmentsTable({appointments, isDoctor=false, onUpdateLoad, isDoctorHomePage = false}){
    const navigate = useNavigate();
    
    async function cancelAppointment(appointmentId){
        const confirm = window.confirm("Are you sure you want to cancel this appointment?");
        if(!confirm){
            return;
        }
        await deleteAppointment(appointmentId);
        onUpdateLoad();
        
        if(isDoctor){
            navigate("/doctor_homepage/appointments");
        }
        else{
            navigate("/patients/appointments");
        }
    }

    return(
        <table className="overflow-hidden w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-center text-gray-700 uppercase bg-gray-300 ">
                <tr>
                    <th scope="col" className="px-3 py-3">#</th>
                    {isDoctor && <th scope="col" className="px-3 py-3">Patient</th>}
                    {!isDoctor && <th scope="col" className="px-3 py-3">Doctor</th>}
                    <th scope="col" className="px-3 py-3">Date</th>
                    <th scope="col" className="px-3 py-3">Time</th>
                    {!isDoctorHomePage && <th scope="col" className="px-3 py-3">Action</th>}
                </tr>
            </thead>
            <tbody>
                {appointments.map((appointment,index)=>
                <tr key={appointment.id} className="bg-white border-b">
                    <td className="px-6 py-4 text-center text-gray-900">
                        {index + 1}
                    </td>
                    {isDoctor && <th scope="row" className="px-6 py-4 font-medium text-center text-gray-900 ">
                    {appointment.patient.fullName}</th>}

                    {!isDoctor && <th scope="row" className="px-6 py-4 font-medium text-center text-gray-900 ">
                    {appointment.doctor.fullName}</th>}

                    <td className="px-6 py-4 text-center text-gray-900">
                        {formatDate(appointment.scheduledDate)} 
                    </td>
                    <td className="px-6 py-4 text-center text-gray-900">
                        {formatTime(appointment.scheduledTime)}
                    </td>
                    {!isDoctorHomePage && <td className="px-6 py-4 text-center text-gray-900">
                        <button className="sm:min-w-40 py-2 border rounded hover:bg-red-600 hover:text-white transition-all"
                        onClick={()=>cancelAppointment(appointment.id)}>
                        Cancel appointment</button>
                    </td>}
                </tr>
                )}
            </tbody>
        </table>
    );
}

async function deleteAppointment(appointmentId){
    try {
        const response = await api.delete(`/appointments/${appointmentId}`);
        if (response.status === 204) {
            toast.success("Appointment cancelled!");
        } 
        else {
            toast.error("Error cancelling appointment!");
        }
    } 
    catch (error) {
        toast.error("Error deleting appointment");
    }
}