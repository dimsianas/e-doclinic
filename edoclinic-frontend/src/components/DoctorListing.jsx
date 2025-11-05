import {Link} from "react-router";

export default function DoctorListing({doctor,specialty,isHomePage=true}){
  
  return(
    <div className={`h-[200px] border border-[#ADADAD] rounded-lg p-8 shadow-sm
        ${isHomePage ? "w-[415px] w-full" : "w-[350px] "} `}>
        <h5 className="mb-2 text-xl font-bold text-gray-900 tracking-tight">{`Dr ${doctor.fullName}`}</h5>
        <p className="mb-3 font-normal text-black">{specialty}</p>
        <p className="mb-3 font-normal text-black">{`Consultation Fee: €${doctor.consultationFee}`}</p>
        <div className="text-right">
            <Link to={`/doctors/${doctor.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium 
                text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none">
                Book Appointment
            </Link>
        </div>
    </div>
  );
}