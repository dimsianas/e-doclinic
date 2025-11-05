import { formatTime,formatTimeFromDateTime } from "../utils/helpers";
import { useState } from "react";
import { api } from "../services/AuthService";
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function WeeklySchedulesTable({weeklySchedules,onUpdateLoad}){

    const user = localStorage.getItem("user");
    const [doctorId,setDoctorId] = useState(user ? JSON.parse(user).profileId : "");
    const [selectedDay,setSelectedDay] = useState("");
    const [selectedStartTime,setSelectedStartTime] = useState(null);
    const [selectedEndTime,setSelectedEndTime] = useState(null);
    const [showWindow,setShowWindow]= useState(false);
    const navigate = useNavigate();

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    
    function createFullWeekSchedule() {
        const fullWeek = [];
        daysOfWeek.map(day => {
            const existingSchedule = weeklySchedules.find(
                schedule => schedule.dayOfWeek === day);
                
            const daySchedule = {
                dayOfWeek: day,
                startTime: existingSchedule?.startTime || null,
                endTime: existingSchedule?.endTime || null,
                id: existingSchedule?.id || null
            };
            fullWeek.push(daySchedule);
        });
        return fullWeek;
    }

    async function deleteTimeSlot(scheduleId){
        const confirm = window.confirm("Are you sure you want to delete this schedule?");
        if(!confirm){
            return;
        }
        await deleteDoctorSchedule(scheduleId);
        onUpdateLoad();
        navigate("/doctor_homepage/weekly_schedule");
    }

    function handleAddTimeSlot(day){
        setSelectedDay(day);
        setSelectedStartTime(null);
        setSelectedEndTime(null);
        setShowWindow(true);
    }

    async function saveTimeSlot(dayOfWeek,startTime,endTime,doctorId){
        const newSchedule = {
            dayOfWeek,
            startTime,
            endTime,
            doctorId
        };
        await addDoctorSchedule(newSchedule);
        onUpdateLoad();
        navigate("/doctor_homepage/weekly_schedule");
    }

    const fullWeekSchedule = createFullWeekSchedule();
    
    return(
    <>
        <table className="overflow-hidden w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-center text-gray-700 uppercase bg-gray-300">
                <tr>
                    <th scope="col" className="px-3 py-3">#</th>
                    <th scope="col" className="px-3 py-3">Day</th>
                    <th scope="col" className="px-3 py-3">Work Hours</th>
                    <th scope="col" className="px-3 py-3">Action</th>
                </tr>
            </thead>
            <tbody>
                {fullWeekSchedule.map((schedule,index)=>
                <tr key={schedule.dayOfWeek} className="bg-white border-b">
                    <td className="px-6 py-4 text-center text-gray-900">
                        {index + 1}
                    </td>
                    <th scope="row" className="px-6 py-4 font-medium text-center text-gray-900 ">
                        {schedule.dayOfWeek}
                    </th>
                    
                    {(schedule.startTime && schedule.endTime) ?
                    (<>
                        <td className="px-6 py-4 text-center text-gray-900">
                            {formatTime(schedule.startTime)} - {formatTime(schedule.endTime)} 
                        </td>
                        <td className="px-6 py-4 text-center text-gray-900">
                            <button className="sm:min-w-40 py-2 border rounded hover:bg-red-600 hover:text-white transition-all"
                                onClick={()=>deleteTimeSlot(schedule.id)}>
                                Delete Time Slot
                            </button>
                        </td>
                    </>)
                    :
                    (<>
                        <td className="px-6 py-4 text-center text-gray-900">
                            -
                        </td>
                        <td className="px-6 py-4 text-center text-gray-900">
                            <button className="sm:min-w-40 py-2 border rounded hover:bg-green-600 hover:text-white transition-all"
                                onClick={()=>handleAddTimeSlot(schedule.dayOfWeek)}>
                                Add Time Slot
                            </button>
                        </td>
                    </>)}  
                </tr>
                )}
            </tbody>
        </table>

        {showWindow && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                    <h3 className="text-lg font-medium text-gray-900 text-center mb-4">
                        Add Schedule for {selectedDay}
                    </h3>
                                
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Start Time
                        </label>
                        <DatePicker
                            selected={selectedStartTime}
                            showTimeSelect
                            showTimeSelectOnly 
                            timeFormat= "HH:mm"
                            dateFormat= "HH:mm" 
                            timeIntervals={30}
                            placeholderText="Select start time"
                            required
                            onChange={(time)=>{setSelectedStartTime(time);setSelectedEndTime(null);}} 
                            className="w-full border p-2 mb-3 rounded-lg border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400">
                        </DatePicker>
                    </div>
                                
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            End Time
                        </label>

                        <DatePicker
                            selected={selectedEndTime}
                            showTimeSelect
                            showTimeSelectOnly 
                            timeFormat="HH:mm"
                            dateFormat= "HH:mm"
                            minTime={selectedStartTime ? getMinEndTime(selectedStartTime): new Date().setHours(0,0)}
                            maxTime={new Date().setHours(23,30)}
                            timeIntervals={30}
                            placeholderText="Select end time"
                            required
                            onChange={(time)=>setSelectedEndTime(time)} 
                            className="w-full border p-2 mb-3 rounded-lg border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400">
                        </DatePicker>
                    </div>
                
                    <div className="flex justify-end space-x-3 mt-6">
                        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-red-500 hover:bg-red-600
                            border border-transparent rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
                            onClick={()=>setShowWindow(false)}>
                            Cancel
                        </button>

                        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700
                        border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                            onClick={() => {
                                const formattedStartTime = formatTimeFromDateTime(selectedStartTime);
                                const formattedEndTime = formatTimeFromDateTime(selectedEndTime);
                                setShowWindow(false);
                                saveTimeSlot(selectedDay,formattedStartTime,formattedEndTime,doctorId);
                            }}>
                            Save Time Slot
                        </button>
                    </div>
                </div>
            </div>
        )}
    </>
    );
}

async function deleteDoctorSchedule(docScheduleId){
    try{
		const response = await api.delete(`/doctor-schedules/${docScheduleId}`);
		if (response.status === 204) {
			toast.success("Doctor schedule deleted successfully!");
		} 
		else {
			toast.error("Error deleting doctor schedule!");
		}
    } 
    catch (error) {
        toast.error("Error removing doctor schedule");
    }
}

async function addDoctorSchedule(schedule){
    try {
          
		const response = await api.post("/doctor-schedules",JSON.stringify(schedule));

		if (response.status === 201) {
		toast.success("Doctor schedule created successfully!");
		} 
		else {
		toast.error("Error creating doctor schedule!");
		}
	} 
	catch (error) {
		toast.error("Error adding doctor schedule");
	}
}

function getMinEndTime(startingTime){
    if (!startingTime){
        return null;
	}
    const minEndTime = new Date(startingTime);
    minEndTime.setMinutes(minEndTime.getMinutes() + 30);
    return minEndTime;
}