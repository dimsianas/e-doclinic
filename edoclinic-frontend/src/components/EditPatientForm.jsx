import { api } from "../services/AuthService";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router";
import {toast} from 'react-toastify';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function EditPatientForm(){

    const user = localStorage.getItem("user");
    const [patientId,setPatientId] = useState(user ? JSON.parse(user).profileId : "");
    const [patient,setPatient] = useState();
    const [fullName,setFullName] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");
    const [dateOfBirth,setDateOfBirth] = useState(null);
    const [address,setAddress] = useState("");
    const navigate = useNavigate();
    const today = new Date().toLocaleDateString('en-CA');
    
    async function loadPatient(){
        const result = await api.get(`/patients/${patientId}`);
        setPatient(result.data);
    }

    useEffect(()=>{
        loadPatient();   
    },[]
    );

    useEffect(()=>{
        if(patient){
            setFullName(patient.fullName);
            setPhoneNumber(patient.phoneNumber);
            setDateOfBirth(patient.dateOfBirth);
            setAddress(patient.address);
        }},[patient]
    );

    async function submitForm(e){
        e.preventDefault();
        const updatedPatient={
            fullName,
            phoneNumber,
            dateOfBirth,
            address
        };
        await editPatient(updatedPatient,patientId);
        loadPatient();
        navigate("/patients/profile");
    }

    return(
        <div className="flex items-center justify-center bg-gray-100">
            <form className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md mt-8" onSubmit={(e)=>submitForm(e)}>
                <h2 className="text-xl font-semibold text-center mb-4">Edit Patient Info</h2>
                <label className="block font-semibold text-gray-800 mb-2">Full Name</label>
                <input className="w-full border p-2 mb-6 rounded-lg" value={fullName} required
                    onChange={(e)=>setFullName(e.target.value)}/>
                
                <label className="block font-semibold text-gray-800 mb-2">Date of Birth</label>
                <DatePicker selected={dateOfBirth} onChange={(date) => setDateOfBirth(date)}
                    dateFormat="dd-MM-yyyy"
                    placeholder={dateOfBirth}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    required
                    maxDate={today}
                    fixedHeight
                    className="w-full border p-2 mb-6 rounded-lg border-gray-300 rounded w-full 
                    focus:outline-none focus:ring-2 focus:ring-blue-400">
                </DatePicker>
                  
                <label className="block font-semibold text-gray-800 mb-2">Phone Number</label>
                <input className="w-full border p-2 mb-6 rounded-lg" value={phoneNumber} required
                    onChange={(e)=>setPhoneNumber(e.target.value)} />
                <label className="block font-semibold text-gray-800 mb-2">Address</label>
                <input className="w-full border p-2 mb-6 rounded-lg" value={address} required
                    onChange={(e)=>setAddress(e.target.value)} />
                
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    Save Changes
                </button>
            </form>
        </div>
    );
}

async function editPatient(patient,patientId){
    try {
        const response = await api.put(`/patients/${patientId}`, JSON.stringify(patient));
        if (response.status === 200){
            toast.success("Profile information changed successfully!");
        } 
        else{
            toast.error("Error editing profile!");
        }
    } 
    catch (error) {
        toast.error("Error submitting edit profile form");
    }
}