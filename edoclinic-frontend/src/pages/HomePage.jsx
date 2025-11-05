import Hero from "../components/Hero";
import SpecialtyListings from "../components/SpecialtyListings";
import DoctorListings from "../components/DoctorListings";
import ViewAllDoctors from "../components/ViewAllDoctors";

export default function HomePage(){
    
    return(
        <>
            <Hero />
            <SpecialtyListings />
            <DoctorListings isHome={true}/>
            <ViewAllDoctors />
        </> 
    );
}