export default function PatientInfoCard({patient,dateOfBirth,userEmail}){
    
    return(
        <div className="flex-1 w-[500px] h-[200px] border border-[#ADADAD] rounded-lg p-8 py-7 bg-white">
            <div className="flex items-center gap-2 mt-1 text-gray-800">
                <p className="font-bold">Fullname :  
                    <span className="font-medium text-gray-800"> {patient.fullName}</span>
                </p>   
            </div>
            <div className="flex items-center gap-2 mt-1 text-gray-800">
                <p className="font-bold">Email : 
                    <span className="font-medium text-gray-800"> {userEmail}</span>
                </p>   
            </div>
            <div className="flex items-center gap-2 mt-1 text-gray-800">
                <p className="font-bold">Phone Number : 
                    <span className="font-medium text-gray-800"> {patient.phoneNumber}</span>
                </p>   
            </div>
            <div className="flex items-center gap-2 mt-1 text-gray-800">
                <p className="font-bold">Date Of Birth : 
                    <span className="font-medium text-gray-800"> {dateOfBirth}</span>
                </p>   
            </div>
            <div className="flex items-center gap-2 mt-1 text-gray-800">
                <p className="font-bold">Address : 
                    <span className="font-medium text-gray-800"> {patient.address}</span>
                </p>   
            </div>  
        </div>
    );
}
