import { Link } from "react-router";

export default function SpecialtyListing({specialty}){
  
  return(
    <Link to={`/doctors/specialty/${specialty.name}`} className="block w-full max-w-[415px] h-30 p-8 border border-[#ADADAD] 
        rounded-lg shadow-sm bg-white hover:bg-gray-200 transition-colors duration-200 cursor-pointer">
        <h3 className="text-xl text-gray-900 text-center font-bold">{specialty.name}</h3>
    </Link>
  );
}