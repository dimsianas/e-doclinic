import { useEffect,useState } from "react";
import WeeklySchedulesTable from "../components/WeeklySchedulesTable";
import { api } from "../services/AuthService";

export default function DoctorWeeklySchedule(){
    
    const user = localStorage.getItem("user");
    const [doctorId, setDoctorId] = useState(user ? JSON.parse(user).profileId : "");
    const[weeklySchedules,setWeeklySchedules]= useState([]);

    async function loadWeeklyScheduleOfDoctor(){
        const result = await api.get(`/doctors/${doctorId}/doctor-schedules`);
        setWeeklySchedules(result.data);
    }

    useEffect(()=>{
        loadWeeklyScheduleOfDoctor();   
    },[doctorId]
    );
    
    function onUpdateLoad(){
        loadWeeklyScheduleOfDoctor();
    }

    return(
        <div className="relative overflow-x-auto">
            <h1 className="text-3xl font-medium text-center mb-6 mr-12">Weekly Schedule</h1>
            <WeeklySchedulesTable weeklySchedules={weeklySchedules} onUpdateLoad={onUpdateLoad} />
        </div>
    );
}

