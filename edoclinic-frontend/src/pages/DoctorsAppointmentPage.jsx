import { useState,useEffect } from "react";
import AppointmentsTable from "../components/AppointmentsTable";
import {api} from "../services/AuthService";

export default function DoctorsAppointmentPage(){

    const user = localStorage.getItem("user");
    const [doctorId, setDoctorId] = useState(user ? JSON.parse(user).profileId : "");
    const [appointments,setAppointments] = useState([]);
    const [sortedAppointments,setSortedAppointments] = useState([]);

    async function loadAppointmentsOfDoctor(){
        const result = await api.get(`/doctors/${doctorId}/appointments`);
        setAppointments(result.data);
    }
    
    useEffect(()=>{
        loadAppointmentsOfDoctor();
    },[]
    );

    useEffect(()=>{
        if(appointments){
            const sortAppointments = [...appointments].sort((a,b) => {
                const dateA = new Date(`${a.scheduledDate}T${a.scheduledTime}`);
                const dateB = new Date(`${b.scheduledDate}T${b.scheduledTime}`);
                return dateA - dateB;
            });
            setSortedAppointments(sortAppointments); 
        }
    },[appointments]
    );
    
    function onUpdateLoadDoctorAppoint(){
        loadAppointmentsOfDoctor();
    }
    
    return(
        <div className="relative overflow-x-auto">
            <h1 className="text-3xl font-medium text-center mb-6 mr-12">Appointments</h1>
            <AppointmentsTable appointments={sortedAppointments} isDoctor={true} 
                onUpdateLoad={onUpdateLoadDoctorAppoint} isDoctorHomePage={false}/>
        </div>
    );
}