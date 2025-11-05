import { useState,useEffect } from "react";
import { useParams,useNavigate } from "react-router";
import { formatDateYMD } from "../utils/helpers";
import {toast} from 'react-toastify';
import DoctorCard from "../components/DoctorCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {api} from "../services/AuthService";

export default function DoctorPage(){
    const user = localStorage.getItem("user");
    const [patientId,setPatientId] = useState(user ? JSON.parse(user).profileId : "");
    const {id} = useParams();
    const [doctor,setDoctor] = useState({specialty: {}});
    const [doctorId,setDoctorId]=useState("");
    const [doctorSchedules,setDoctorSchedules]=useState([]);
    const [selectedDate,setSelectedDate] = useState(null);
    const [scheduledDate,setScheduledDate] = useState(null);
    const [scheduledTime,setScheduledTime] = useState("");
    const [timeSlots,setTimeSlots] = useState([]);
    const [scheduledAppointments,setScheduledAppointments] = useState([]);
    const [schedule,setSchedule] = useState({});
    const navigate = useNavigate();
  
    const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  
    async function loadDoctor(){
        const result = await api.get(`/doctors/${id}`);
        setDoctorId(id);
        setDoctor(result.data);
    }

    async function loadDoctorSchedules(){
        const result = await api.get(`/doctors/${id}/doctor-schedules`);
        setDoctorSchedules(result.data);
    }

    async function loadDoctorAppointmentsOfDate(date){
        const result = await api.get(`/doctors/${id}/appointments?date=${date}`);
        setScheduledAppointments(result.data);
    }

    useEffect(()=>{
        loadDoctor();
        loadDoctorSchedules();
        window.scrollTo(0, 0);    
    },[]
    );

    useEffect(() => {
      if (selectedDate) {
        const dateFormatted = formatDateYMD(selectedDate);
        loadDoctorAppointmentsOfDate(dateFormatted);
      }
    },[selectedDate]
    );
    
    useEffect(() => {
        if (selectedDate) {
            const dayOfWeek = dayNames[selectedDate.getDay()];
            const schedule = doctorSchedules.find(s => s.dayOfWeek === dayOfWeek);
            if(!schedule){
                setSchedule({});
                setTimeSlots([]);
            }
            else{
                setSchedule(schedule);
                const slots = generateTimeSlots(schedule.startTime, schedule.endTime,selectedDate,scheduledAppointments);
                setTimeSlots(slots);
                const formattedSelectedDate = formatDateYMD(selectedDate);
                setScheduledDate(formattedSelectedDate);
            }
        }
    },[selectedDate, doctorSchedules,scheduledAppointments]
    );

    function submitForm(e){
        e.preventDefault();
        
        const newAppointment ={
            scheduledDate,
            scheduledTime,
            doctorId,
            patientId
        };
        createAppointment(newAppointment);
        navigate("/doctors");
    }
    return(
        <div className="flex flex-col sm:flex-row bg-gray-100 min-h-screen">
            <div className="sm:w-1/2 w-full p-5 flex justify-center items-start height-1100">
                <DoctorCard doctor={doctor}/>
            </div>
            <div className="sm:w-1/2 w-full p-5 flex justify-center items-start">
                <form className="flex flex-col sm:flex-row gap-5 items-start w-full" onSubmit={(e)=>submitForm(e)}>
                    <div className="flex-1">
                        <DatePicker selected={selectedDate} onChange={(date)=>(setSelectedDate(date),setScheduledTime(""))}
                            dateFormat="yyyy-MM-dd"
                            dropdownMode="select"
                            inline
                            minDate={new Date()}
                            maxDate={new Date().setMonth(new Date().getMonth() + 1)}
                            fixedHeight
                            required
                            className="w-full border p-2 mb-3 rounded-lg border-gray-300 rounded w-full 
                            focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <div className="flex flex-col flex-1 w-full">
                        <select className="w-full border p-2 mb-3 rounded-lg" value={scheduledTime} required
                            onChange={(e) => setScheduledTime(e.target.value)}>
                            <option value="" disabled hidden>Select Time Slot</option>
                            {timeSlots.map((timeSlot) => (
                            <option key={timeSlot} value={timeSlot}>{timeSlot}</option>
                            ))}
                        </select>
                        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mt-30">
                            Book an appointment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function generateTimeSlots(startTime, endTime,selectedDate, dateAppointments, intervalMinutes = 30) {
    let slots = [];
    let [startHour, startMinute] = startTime.split(":").map(Number);
    let [endHour, endMinute] = endTime.split(":").map(Number);

    const start = new Date();
    start.setHours(startHour, startMinute, 0, 0);

    const end = new Date();
    end.setHours(endHour, endMinute, 0, 0);

    const now = new Date();
    const isToday = selectedDate.toDateString() === now.toDateString();
    const bookedTimes = dateAppointments.map(app => app.scheduledTime.slice(0,5));
    
    while (start < end ) {
        const next = new Date(start.getTime() + intervalMinutes * 60000);
        const timeLabel = start.toTimeString().slice(0, 5);
        if ((!isToday || start > now) && !bookedTimes.includes(timeLabel)) {
            slots.push(timeLabel);
        }
        start.setTime(next);
    }
    return slots;
}

async function createAppointment(newAppointment){
  try {
        const response = await api.post("/appointments", JSON.stringify(newAppointment));
        if (response.status === 201) {
            toast.success("Appointment booked successfully!")
        } 
        else {
            toast.error("Error Ocurred!")
        }
    } 
    catch (error) {
        toast.error("Error creating appointment");
    }
}