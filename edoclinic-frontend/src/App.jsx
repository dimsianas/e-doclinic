import { Route, createBrowserRouter, createRoutesFromElements,RouterProvider } from 'react-router';
import { ProtectedRoute, PatientRoute, DoctorRoute } from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/LoginPage';
import DoctorsPage from './pages/DoctorsPage';
import DoctorPage from './pages/DoctorPage';
import RegisterDoctorPage from './pages/RegisterDoctorPage';
import RegisterPatientPage from './pages/RegisterPatientPage';
import EditPatientPage from './pages/EditPatientPage';
import EditDoctorPage from './pages/EditDoctorPage';
import DoctorsWithSameSpecialtyPage from './pages/DoctorsWithSameSpecialtyPage';
import NotFoundPage from './pages/NotFoundPage';

import DoctorMainLayout from './layouts/DoctorMainLayout';
import DoctorsHomePage from './pages/DoctorsHomePage';
import DoctorWeeklySchedulePage from './pages/DoctorWeeklySchedulePage';
import DoctorsAppointmentPage from './pages/DoctorsAppointmentPage';
import DoctorsProfilePage from './pages/DoctorsProfilePage';

import PatientsProfilePage from './pages/PatientsProfilePage';
import PatientsAppointmentPage from './pages/PatientsAppointmentPage';

const router = createBrowserRouter(
    createRoutesFromElements(
    <>
        <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            
            <Route path="/login" element={
                <ProtectedRoute requireAuth={false}> 
                    <LoginPage />
                </ProtectedRoute>} />
            
            <Route path="/doctor_register" element={
                <ProtectedRoute requireAuth={false}>
                    <RegisterDoctorPage />
                </ProtectedRoute>} />
            
            <Route path="/patient_register" element={
                <ProtectedRoute requireAuth={false}>
                    <RegisterPatientPage />
                </ProtectedRoute>} />

            <Route path="/doctors" element={<DoctorsPage />} />

            <Route path="/doctors/:id" element={
                <PatientRoute>
                    <DoctorPage />
                </PatientRoute>} />

            <Route path="/doctors/specialty/:specialty_name" element={<DoctorsWithSameSpecialtyPage />} />

            <Route path="/patients/profile" element={
                <PatientRoute>
                    <PatientsProfilePage />
                </PatientRoute>} />

            <Route path="/patients/profile/edit" element={
                <PatientRoute>
                    <EditPatientPage />
                </PatientRoute>} />

            <Route path="/patients/appointments" element={
                <PatientRoute>
                    <PatientsAppointmentPage />
                </PatientRoute>} />

            <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="/doctor_homepage" element={<DoctorMainLayout />}>
            
            <Route path="/doctor_homepage" element={
                <DoctorRoute>
                    <DoctorsHomePage />
                </DoctorRoute>} />

            <Route path="/doctor_homepage/appointments" element={
                <DoctorRoute>
                    <DoctorsAppointmentPage />
                </DoctorRoute>} />

            <Route path="/doctor_homepage/weekly_schedule" element={
                <DoctorRoute>
                    <DoctorWeeklySchedulePage />
                </DoctorRoute>} />

            <Route path="/doctor_homepage/profile" element={
                <DoctorRoute>
                    <DoctorsProfilePage />
                </DoctorRoute>} />

            <Route path="/doctor_homepage/profile/edit" element={
                <DoctorRoute>
                    <EditDoctorPage />
                </DoctorRoute>} />
            
            <Route path="*" element={<NotFoundPage />} />
        </Route>
    </>
    )
);

function App() {
    return (
        <RouterProvider router={router}/>
    );
}

export default App
