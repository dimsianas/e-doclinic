import { useState,useEffect } from "react";
import { useNavigate } from "react-router";
import {toast} from 'react-toastify';
import { api } from "../services/AuthService";

export default function RegisterDoctorForm(){
    
    const [fullName,setFullName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");
    const [licenseNumber,setLicenseNumber] = useState("");
    const [consultationFee,setConsultationFee] = useState("");
    const [specialty,setSpecialty]= useState("");
    const [specialtyId,setSpecialtyId] = useState("");
    const [specialties,setSpecialties] = useState([]);
    const [bio,setBio] = useState("");
    const navigate = useNavigate();

    async function loadSpecialties(){
        const spec = await api.get("/specialties");
        setSpecialties(spec.data);
    }
  
    useEffect(()=>{
        loadSpecialties();
    },[]
    );
    
    async function submitForm(e){
        e.preventDefault();
        
        const newDoctor = {
            fullName,
            email,
            password,
            phoneNumber,
            licenseNumber,
            consultationFee,
            specialtyId,
            bio
        };
        
        try{
            await addDoctor(newDoctor);
            navigate("/login?role=doctor");
        } catch (error) {
            return;
        } 
    }

    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100"> 
            <form className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md" onSubmit={(e)=>submitForm(e)}>
                <h2 className="text-xl font-semibold mb-4">Doctor Registration</h2>
                <input className="w-full border p-2 mb-3 rounded-lg" placeholder="Full Name" required 
                    onChange={(e)=>setFullName(e.target.value)} />
                <input type="email" className="w-full border p-2 mb-3 rounded-lg" placeholder="Email" required
                    onChange={(e)=>setEmail(e.target.value)} />
                <input type="password" className="w-full border p-2 mb-3 rounded-lg" placeholder="Password" required
                    onChange={(e)=>setPassword(e.target.value)} />
                <input className="w-full border p-2 mb-3 rounded-lg" placeholder="Phone Number" required
                    onChange={(e)=>setPhoneNumber(e.target.value)} />
                <input className="w-full border p-2 mb-3 rounded-lg" placeholder="License Number" required
                    onChange={(e)=>setLicenseNumber(e.target.value)} />
                <input type="number" min="0" className="w-full border p-2 mb-3 rounded-lg" placeholder="Consultation Fee" required
                    onChange={(e)=>setConsultationFee(e.target.value)} />
                <select className="w-full border p-2 mb-3 rounded-lg" required onChange={
                    (e)=>(setSpecialty(e.target.value),setSpecialtyId(e.target.value))}>
                    <option>Select Specialty</option>
                    {specialties.map((specialty) => (
                    <option key={specialty.id} value={specialty.id}>{specialty.name}</option>
                    ))}
                </select>
                <textarea className="w-full border p-2 mb-3 rounded-lg" placeholder="Bio" required rows="3" 
                    onChange={(e)=>setBio(e.target.value)} > 
                </textarea>
                <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                    Register
                </button>
                <div className="mt-4 text-sm text-gray-500 text-center">
                    Already have an account?{" "}
                    <a href="/login?role=doctor" className=" button text-green-600 hover:underline">
                    Login here
                    </a>
                </div>
            </form>
        </div>
    );
}

async function addDoctor(newDoctor){
    try {
        const response = await api.post("/users/register/doctor", JSON.stringify(newDoctor));
        if (response.status === 201) {
            toast.success("Doctor registered successfully!");
        } 
        else {
            toast.error("Error creating Doctor!");
        }
    } 
    catch (error) {
        toast.error("ERROR: Email or License Number already exists. Please use different values!");   
    }
}
