import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

export default function LoginForm(){

    const location = useLocation();
    const [role,setRole] = useState("patient");
    const {login,logout} = useAuth();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const params = new URLSearchParams(location.search);
        const roleURL = params.get("role");
        if (roleURL === "doctor" || roleURL === "patient") {
            setRole(roleURL);
        }
    },[location.search]);
    
    function handleRoleChange(newRole){
        setRole(newRole);
        navigate(`/login?role=${newRole}`);
    }

    async function submitForm(e){
        e.preventDefault();
        try{
            const result = await login(email, password);  
            if (result.success) {
                const userRole = result.user.role;
                const userName = result.user.email;
                const expectedRole = role.toUpperCase();
                    
                if (userRole !== expectedRole) {
                    toast.error(`Login failed: You are a ${userRole}. You should use Login as ${userRole}`);
                    await logout();
                    return;
                }
                
                toast.success(`Login successful! Welcome ${userName}`);
                
                setTimeout(() => {
                    navigate("/");
                }, 100);
            }
        } catch (error){
            toast.error("Login failed: " + error.message);
        }
    }
    
    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100"> 
            <form className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md" onSubmit={(e)=>submitForm(e)} >
                {(role === "patient") && (<h2 className="text-xl font-semibold mb-4">Login as Patient</h2>)}
                {(role === "doctor") && (<h2 className="text-xl font-semibold mb-4">Login as Doctor</h2>)}
            
                <input type="email" className="w-full border p-2 mb-3 rounded-lg" placeholder="Email" required
                    onChange={(e)=> setEmail(e.target.value)} />
                <input type="password" className="w-full border p-2 mb-3 rounded-lg" placeholder="Password" required
                    onChange={(e)=> setPassword(e.target.value)}/>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    Login
                </button>

                {(role=="patient") && (
                <>
                <div className="mt-4 text-sm text-gray-500 text-center">
                    Are you a doctor?{" "}
                    <button type="button" className="text-blue-700 hover:underline" onClick={()=>handleRoleChange("doctor")}>
                        Click here
                    </button>
                </div>
                <div className="mt-4 text-sm text-gray-500 text-center">
                    New to EdoClinic?{" "}
                    <a href="/patient_register" className="button text-blue-700 hover:underline">
                        Create an account
                    </a>
                </div>
                </>)}

                {(role === "doctor") && (
                <>
                <div className="mt-4 text-sm text-gray-500 text-center">
                    Are you a patient?{" "}
                    <button type="button" className="text-blue-700 hover:underline" onClick={()=>handleRoleChange("patient")}>
                        Click here
                    </button>
                </div>
                <div className="mt-4 text-sm text-gray-500 text-center">
                    New to EdoClinic?{" "}
                    <a href="/doctor_register" className="button text-blue-700 hover:underline">
                        Create an account
                    </a>
                </div>
                </>)}
            </form>
        </div>
    );
}