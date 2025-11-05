import {api} from "../services/AuthService.js";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router";

export default function SpecialtiesSidebar({activeSpec=null}){

    const [specialties,setSpecialties] = useState([]);
    const [activeSpecialty, setActiveSpecialty] = useState(activeSpec);
    const navigate = useNavigate();

    async function loadSpecialties(){
        const result = await api.get("/specialties");
        setSpecialties(result.data);
    }

    useEffect(()=>{
        loadSpecialties();  
    },[]
    );

    return(
        <div className="flex-col gap-3 text-sm text-gray-600 sm:flex mt-10">
            <li key = {"All"} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 
                rounded transition-all cursor-pointer ${activeSpecialty === "all" ? "bg-gray-300" : "bg-white"}`}
                onClick={()=>{navigate("/doctors");setActiveSpecialty("all");}}>All Specialties
            </li>
            {specialties.map((specialty)=>(
            <li key = {specialty.id} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 
                rounded transition-all cursor-pointer ${activeSpecialty === specialty.name ? "bg-gray-300" : "bg-white"}`}
                onClick={()=>{navigate(`/doctors/specialty/${specialty.name}`);setActiveSpecialty(specialty.name);}}>{specialty.name}
            </li>
            ))}
        </div>
    );
}