import { useState,useEffect } from "react";
import { useParams } from "react-router";
import DoctorListing from "../components/DoctorListing";
import SpecialtiesSidebar from "../components/SpecialtiesSideBar";
import {api} from "../services/AuthService";

export default function DoctorsWithSameSpecialtyPage(){
  
    const[doctors,setDoctors]= useState([]);
    const {specialty_name} = useParams();
    
    async function doctorSpecLoader(){
        const result = await api.get(`/doctors?specialty=${specialty_name}`);
        setDoctors(result.data);
    }

    useEffect(()=>{
        doctorSpecLoader();
    },[specialty_name]
    );

    return(
        <div className="min-h-screen flex flex-col sm:flex-row items-start gap-5 bg-gray-100">
            <SpecialtiesSidebar activeSpec={specialty_name}/>
            <section className="px-4 py-10">
                <div className="container-xl lg:container m-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
                        {doctors.map((doctor)=>(
                        <DoctorListing key={doctor.id} doctor={doctor} specialty={doctor.specialty.name} isHomePage={false} />
                        ))}
                    </div>    
                </div>
            </section>
        </div>
    );
}