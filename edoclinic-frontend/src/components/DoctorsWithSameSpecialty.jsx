import DoctorListing from "./DoctorListing";

export default function DoctorsWithSameSpecialty(){
    return(
        <section className="px-4 py-10">
            <div className="container-xl lg:container m-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {doctors.map((doctor)=>(
                        <DoctorListing key={doctor.id} doctor={doctor} specialty={doctor.specialty.name} />
                    ))}
                </div>    
            </div>
        </section>
    );
}