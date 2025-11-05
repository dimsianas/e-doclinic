import { Navigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

export function ProtectedRoute({children,requireAuth=true}){
    const { isAuthenticated } = useAuth();

    if (requireAuth && !isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!requireAuth && isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    return children;
}

export function DoctorRoute({children}){
    const {isAuthenticated,isDoctor} = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login?role=doctor" replace />;
    }
    if (!isDoctor()) {
        return <Navigate to="/" replace />;
    }
    return children;
}

export function PatientRoute({children}){
    const {isAuthenticated,isPatient} = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login?role=patient" replace />;
    }
    if (!isPatient()) {
        return <Navigate to="/" replace />;
    }
    return children;
}