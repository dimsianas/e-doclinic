import { useState,useEffect } from "react";
import { useNavigate } from "react-router";
import { api } from "../services/AuthService";
import { formatDateYMD } from "../utils/helpers";
import {toast} from 'react-toastify';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function RegisterPatientForm(){

    const [fullName,setFullName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");
    const [dateOfBirth,setDateOfBirth] = useState(null);
    const [selectedDate,setSelectedDate] = useState(null);
    const [address,setAddress] = useState("");
    const navigate = useNavigate();
    const today = new Date().toLocaleDateString('en-CA');

    useEffect(() => {
        if (selectedDate) {
            const dateFormatted = formatDateYMD(selectedDate);
            setDateOfBirth(dateFormatted);
        }
    },[selectedDate]
    );

    async function submitForm(e){
        e.preventDefault();
        
        const newPatient={
            fullName,
            email,
            password,
            phoneNumber,
            dateOfBirth,
            address
        };
        try{
            await addPatient(newPatient);
            navigate("/login?role=patient");
        } catch (error) {
            return;
        }
    }

    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md" onSubmit={(e)=>submitForm(e)}>
                <h2 className="text-xl font-semibold mb-4">Patient Registration</h2>
                <input className="w-full border p-2 mb-3 rounded-lg" placeholder="Full Name" required
                    onChange={(e)=>setFullName(e.target.value)}/>
                <input type="email" className="w-full border p-2 mb-3 rounded-lg" placeholder="Email" required
                    onChange={(e)=>setEmail(e.target.value)} />
                <input type="password" className="w-full border p-2 mb-3 rounded-lg" placeholder="Password" required
                    onChange={(e)=>setPassword(e.target.value)}/>
                
                <DatePicker 
                    selected={dateOfBirth} 
                    dateFormat="dd-MM-yyyy"
                    placeholderText="Date of Birth"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    required
                    maxDate={today}
                    fixedHeight
                    onChange={(date) => setSelectedDate(date)}
                    className="w-full border p-2 mb-3 rounded-lg border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400">
                </DatePicker>
                
                <input className="w-full border p-2 mb-3 rounded-lg" placeholder="Phone Number" required
                    onChange={(e)=>setPhoneNumber(e.target.value)} />
                <input className="w-full border p-2 mb-3 rounded-lg" placeholder="Address" required
                    onChange={(e)=>setAddress(e.target.value)} />
                <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                    Register
                </button>
                <div className="mt-4 text-sm text-gray-500 text-center">
                    Already have an account?{" "}
                    <a href="/login?role=patient" className=" button text-green-600 hover:underline">
                    Login here
                    </a>
                </div>   
            </form>
        </div>
    );       
}

async function addPatient(newPatient){
    try {
        const response = await api.post("/users/register/patient", JSON.stringify(newPatient));
        if (response.status === 201) {
            toast.success("Patient registered successfully!");
        } 
        else {
            toast.error("Error creating Patient!");
        }
    } 
    catch (error) {
        toast.error("ERROR: Email already in use. Please use different email!");
    }
}
