import { NavLink } from "react-router";

export default function ViewAllDoctors(){
  
    return(
        <section className="m-auto max-w-lg my-10 px-4">
            <NavLink to="/doctors"
                className="block bg-blue-700 hover:bg-blue-800 text-white text-center py-4 px-6 rounded-xl">
                View All Doctors
            </NavLink>
        </section>
    );
}