import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/AuthService';

const AuthContext = createContext();

export function useAuth() {
    
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export function AuthProvider({children}) {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    async function checkAuthStatus(){
        try {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        
        if (token && savedUser) {
            const parsedUser = JSON.parse(savedUser);
            setUser(parsedUser);
            setIsAuthenticated(true);
            
        } else {
            setUser(null);
            setIsAuthenticated(false);
        }
        } catch (error) {
            console.error('Authorization check failed:', error);
            logout();
        }
    }

    async function login(email,password){
        
        const newUser = {email,password};

        try {
            const response = await api.post("/auth/login",JSON.stringify(newUser));
            if (!response.data.token) {
                throw new Error("No token");
            }
            
            if (!response.data.userId || !response.data.role) {
                throw new Error("Invalid response format");
            }
            
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data));
            
            setUser(response.data);
            setIsAuthenticated(true);
            
            return {success:true,user:response.data};
        } catch (error) {
            console.error("Login failed:", error);
        }
    }

    function logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
    }

    function isDoctor(){
        return user?.role === 'DOCTOR';
    }

    function isPatient(){
        return user?.role === 'PATIENT';
    }

    function getProfileId() {
        return user?.profileId;
    }

    function getUserId(){
        return user?.userId;
    }

    const value = {
        user,
        isAuthenticated,
        login,
        logout,
        isDoctor,
        isPatient,
        getProfileId,
        getUserId,
        checkAuthStatus,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}