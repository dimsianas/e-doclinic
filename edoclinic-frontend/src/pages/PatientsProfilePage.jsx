import PatientInfoCard from "../components/PatientInfoCard";
import { useState,useEffect } from "react";
import { NavLink,useNavigate } from "react-router";
import {toast} from 'react-toastify';
import { formatDate } from "../utils/helpers";
import { api } from "../services/AuthService";
import { useAuth } from "../contexts/AuthContext";

export default function PatientsProfilePage(){
    
    const user = localStorage.getItem("user");
    const [patientId, setPatientId] = useState(user ? JSON.parse(user).profileId : "");
    const [email,setEmail] = useState(user ? JSON.parse(user).email : "");
    const [patient,setPatient] = useState({});
    const [dateOfBirth,setDateOfBirth]= useState("");
    const [formattedDateOfBirth,setFormattedDateOfBirth]= useState("");
    const { logout } = useAuth();
    
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
            setDateOfBirth(patient.dateOfBirth);
        }  
    },[patient]
    );

    useEffect(()=>{
        if(dateOfBirth){
            setFormattedDateOfBirth(formatDate(dateOfBirth));
        }  
    },[dateOfBirth]
    );
    
    async function deleteAccount(patientId){
        const confirm = window.confirm("Are you sure you want to delete your account?");
        if(!confirm){
            return;
        }
        await deletePatient(patientId);
        logout();
    }

    return(
        <div className="bg-gray-100 min-h-screen p-6 flex flex-col">
            <div className="relative items-center flex flex-col bg-gray-100">
                <h1 className="text-3xl font-medium text-center mt-6 mb-6 mr-8">Profile</h1>
                <PatientInfoCard patient={patient} dateOfBirth={formattedDateOfBirth} userEmail={email} />
                <div className="flex justify-between mt-6">
                    <NavLink to="/patients/profile/edit" className="sm:min-w-40 text-center text-white py-2 border rounded bg-blue-600 hover:bg-blue-800 hover:text-white transition-all mr-30">
                        Edit
                    </NavLink>
                    <button className="sm:min-w-40 text-center text-white py-2 border rounded bg-red-600 hover:bg-red-800 hover:text-white transition-all ml-40" 
                        onClick={()=>deleteAccount(patientId)}>
                        Delete
                    </button>
                </div>
            </div>
        </div>   
    );
}

async function deletePatient(patientId){
    try {
        const response = await api.delete(`patients/${patientId}`);
        if (response.status === 204) {
            toast.success("Patient Profile Deleted!");
        } 
        else {
            toast.error("Error Ocurred!");
        }
    } 
    catch (error) {
        toast.error("Error submitting form:", error);
    }
}