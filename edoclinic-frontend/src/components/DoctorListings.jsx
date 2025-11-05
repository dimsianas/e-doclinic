import {useState,useEffect} from "react";
import DoctorListing from "./DoctorListing";
import SpecialtiesSidebar from "./SpecialtiesSideBar";
import {api} from "../services/AuthService";

export default function DoctorListings({isHome=false}){
    
    const [doctors,setDoctors] = useState([]);
    const [recentDoctors,setRecentDoctors] = useState([]);
        
    async function loadDoctors(){
        const result = await api.get("/doctors");
        setDoctors(result.data);
    }

    useEffect(()=>{
        loadDoctors();    
    },[]
    );

    useEffect(()=>{
        setRecentDoctors(doctors.slice(0,3));    
    },[doctors]
    );
  
    let content = 
    <div className="flex flex-col sm:flex-row items-start gap-5 bg-gray-100">
        <SpecialtiesSidebar activeSpec={"all"} />
        <section className=" px-4 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                {doctors.map((doctor)=>(
                    <DoctorListing key={doctor.id} doctor={doctor} specialty={doctor.specialty.name} isHomePage={isHome} />
                ))}
            </div>
        </section>
    </div>;

    if(isHome){
        content = 
        <section className=" px-4 py-10 bg-gray-100">
            <div className="container-xl lg:container m-auto ">
                <h2 className="text-3xl font-bold text-blue-700 mb-10 text-center">Doctors to Book</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {recentDoctors.map((doctor)=>(
                        <DoctorListing key={doctor.id} doctor={doctor} specialty={doctor.specialty.name} />
                    ))}
                </div>    
            </div>
        </section>;
    }
    return(
        <>{content}</>
    );
}
