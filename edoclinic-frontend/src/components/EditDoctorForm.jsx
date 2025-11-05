import { useState,useEffect } from "react";
import { useNavigate } from "react-router";
import {toast} from 'react-toastify';
import { api } from "../services/AuthService";

export default function EditDoctorForm(){
    
    const user = localStorage.getItem("user");
    const [doctorId,setDoctorId] = useState(user ? JSON.parse(user).profileId : "");
    const [doctor,setDoctor] = useState();
    const [fullName,setFullName] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");
    const [consultationFee,setConsultationFee] = useState("");
    const [bio,setBio] = useState("");
    const navigate = useNavigate();

    async function loadDoctor(){
        const result = await api.get(`/doctors/${doctorId}`);
        setDoctor(result.data);
    }

    useEffect(()=>{
        loadDoctor();   
    },[]
    );

    useEffect(()=>{
        if(doctor){
            setFullName(doctor.fullName);
            setPhoneNumber(doctor.phoneNumber);
            setConsultationFee(doctor.consultationFee);
            setBio(doctor.bio);
        }},[doctor]
    );

    async function submitForm(e){
        e.preventDefault();
        
        const updatedDoctor = {
            fullName,
            phoneNumber,
            consultationFee,
            bio
        };
        await editDoctor(updatedDoctor,doctorId);
        loadDoctor();
        navigate("/doctor_homepage/profile");
    }

    return(
        <div className="flex items-center justify-center bg-gray-100"> 
            <form className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md" onSubmit={(e)=>submitForm(e)}>
                <h2 className="text-xl font-semibold text-center mb-4">Edit Doctor Info</h2>
                <label className="block font-semibold mb-2 text-gray-800">Full Name</label>
                <input className="w-full border p-2 mb-6 rounded-lg" value={fullName} required 
                    onChange={(e)=>setFullName(e.target.value)} />
                <label className="block font-semibold mb-2 text-gray-800">Phone Number</label>
                <input className="w-full border p-2 mb-6 rounded-lg" value={phoneNumber} required
                    onChange={(e)=>setPhoneNumber(e.target.value)} />
                <label className="block font-semibold mb-2 text-gray-800">Consultation Fee</label>
                <input type="number" className="w-full border p-2 mb-6 rounded-lg" value={consultationFee} required
                    onChange={(e)=>setConsultationFee(e.target.value)} />
                <label className="block font-semibold mb-2 text-gray-800">Bio</label>
                <textarea className="w-full border p-2 mb-6 rounded-lg" value={bio} required rows="3" 
                    onChange={(e)=>setBio(e.target.value)} >
                </textarea>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    Save Changes
                </button>
            </form>
        </div>
    );
}

async function editDoctor(doctor,doctorId){
    try {
        const response = await api.put(`/doctors/${doctorId}`, JSON.stringify(doctor));
        if (response.status === 200) {
            toast.success("Profile information changed successfully!");
        } 
        else {
            toast.error("Error editing profile!");
        }
    } 
    catch (error) {
        toast.error("Error submitting edit profile form");
    }
}