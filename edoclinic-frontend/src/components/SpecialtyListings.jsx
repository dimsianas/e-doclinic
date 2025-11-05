import {api} from "../services/AuthService";
import { useState,useEffect } from "react";
import SpecialtyListing from "./SpecialtyListing";

export default function SpecialtyListings(){
    
    const [specialties,setSpecialties] = useState([]);
    
    async function loadSpecialties(){
        const spec = await api.get("/specialties");
        setSpecialties(spec.data);
    }
  
    useEffect(()=>{
        loadSpecialties();
    },[]
    );
    
    return(
        <section className="bg-gray-100 px-4 py-10">
            <div className="container-xl lg:container m-auto">
                <h2 className="text-3xl font-bold text-blue-700 mb-10 text-center">
                    Find Doctors By Specialty
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                {specialties.map((specialty)=>(
                    <SpecialtyListing key = {specialty.id} specialty={specialty} />
                ))}
                </div>    
            </div>
        </section>
    );
}