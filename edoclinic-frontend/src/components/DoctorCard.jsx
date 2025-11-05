export default function DoctorCard({doctor}){
    
    return(
        <div className="flex-1 w-[415px] h-[267px] border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">{doctor.fullName}</p>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
                <p>Specialty - 
                    <span className="text-gray-800"> {doctor.specialty.name}</span>
                </p>   
            </div>
            <div>
                <p className="flex items-center gap-1 text-sm font-bold text-[#262626] mt-3">Bio</p>
                <p className="text-sm text-gray-600 max-w-[800px] mt-1">{doctor.bio}</p>
                <p className="text-gray-600 font-medium mt-12">Consultation Fee :  
                    <span className="text-gray-800"> €{doctor.consultationFee}</span>
                </p>
            </div>
      </div>
    ); 
}