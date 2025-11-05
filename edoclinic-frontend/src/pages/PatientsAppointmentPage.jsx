import { useState,useEffect } from "react";
import AppointmentsTable from "../components/AppointmentsTable";
import {api} from "../services/AuthService";

export default function PatientsAppointmentPage(){

    const user = localStorage.getItem("user");
    const [patientId, setPatientId] = useState(user ? JSON.parse(user).profileId : "");
    const [appointments,setAppointments] = useState([]);
    const [sortedAppointments,setSortedAppointments] = useState([]);

    async function loadAppointmentsOfPatient(){
        const result = await api.get(`/patients/${patientId}/appointments`);
        setAppointments(result.data);
    }

    useEffect(()=>{
        loadAppointmentsOfPatient();
    },[]
    );

    useEffect(()=>{
        if(appointments){
           const sortAppointments = [...appointments].sort((a, b) => {
                const dateA = new Date(`${a.scheduledDate}T${a.scheduledTime}`);
                const dateB = new Date(`${b.scheduledDate}T${b.scheduledTime}`);
                return dateA - dateB;});
            setSortedAppointments(sortAppointments);
        }
    },[appointments]
    );
    
    function onUpdateLoadPatientAppoint(){
        loadAppointmentsOfPatient();
    }
    
    return(
		<div className="bg-gray-100 min-h-screen p-6 flex flex-col">
			<div className="relative">
				<h1 className="text-3xl font-medium text-center mb-6 mr-12 mt-8">Appointments</h1>
				<AppointmentsTable appointments={sortedAppointments} isDoctor={false} 
				    onUpdateLoad={onUpdateLoadPatientAppoint} />
			</div>
		</div>
    );
}