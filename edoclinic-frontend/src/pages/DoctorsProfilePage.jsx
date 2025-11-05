import DoctorInfoCard from "../components/DoctorInfoCard";
import { useState,useEffect } from "react";
import { NavLink } from "react-router";
import {toast} from 'react-toastify';
import {api} from "../services/AuthService";
import { useAuth } from "../contexts/AuthContext";

export default function DoctorsProfilePage(){
    
    const user = localStorage.getItem("user");
    const [doctorId, setDoctorId] = useState(user ? JSON.parse(user).profileId : "");
    const [email,setEmail] = useState(user ? JSON.parse(user).email : "");
    const [doctor,setDoctor] = useState({});
    const [specialty,setSpecialty]= useState({});
    const [specialtyName,setSpecialtyName]= useState("");
    const { logout } = useAuth();
    
    async function loadDoctor(){
        const result = await api.get(`/doctors/${doctorId}`);
        setDoctor(result.data);
    }

    useEffect(()=>{
        if(doctorId) {
            loadDoctor();   
        }
    },[doctorId]
    );

    useEffect(()=>{
        if(doctor){
            setSpecialty(doctor.specialty);
        }  
    },[doctor]
    );
    
    
    useEffect(()=>{
        if(specialty){
            setSpecialtyName(specialty.name);
        }  
    },[specialty]
    );

    async function deleteAccount(doctorId){
        const confirm = window.confirm("Are you sure you want to delete your account?");
        if(!confirm){
            return;
        }
        await deleteDoctor(doctorId);
        logout();
    }

    return(
        <div className="relative overflow-x-auto items-center flex flex-col">
            <h1 className="text-3xl font-medium text-center mb-6 mr-12">Profile</h1>
            <DoctorInfoCard doctor={doctor} userEmail={email} specialty={specialtyName}/>
            <div className="flex justify-between mt-6">
                <NavLink to="/doctor_homepage/profile/edit" className="sm:min-w-40 text-center text-white py-2 border rounded bg-blue-600 hover:bg-blue-800 transition-all mr-30">
                    Edit
                </NavLink>
                <button className="sm:min-w-40 text-center text-white py-2 border rounded bg-red-600 hover:bg-red-800 
                    hover:text-white transition-all ml-40" onClick={()=>deleteAccount(doctorId)}>
                    Delete
                </button>
            </div>
        </div>
    );
}

async function deleteDoctor(doctorId){
    try {
        const response = await api.delete(`/doctors/${doctorId}`);
        if (response.status === 204) {
            toast.success("Doctor Profile Deleted!");
        } 
        else {
            toast.error("Error Ocurred!");
        }
    } 
    catch (error) {
        toast.error("Error deleting doctor profile");
    }
}