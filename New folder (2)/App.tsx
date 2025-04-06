import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './styles/globals.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import DeveloperDashboard from './pages/DeveloperDashboard';

// Protected Route Component
const ProtectedRoute = ({ 
  allowedRoles 
}: { 
  allowedRoles: Array<'patient' | 'doctor' | 'admin' | 'developer'> 
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">جاري التحميل...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen" dir="rtl">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/patient/login" element={<LoginPage userType="patient" />} />
            <Route path="/doctor/login" element={<LoginPage userType="doctor" />} />
            <Route path="/admin/login" element={<LoginPage userType="admin" />} />
            <Route path="/developer/login" element={<LoginPage userType="developer" />} />
            <Route path="/patient/register" element={<RegisterPage />} />

            {/* Protected Patient Routes */}
            <Route element={<ProtectedRoute allowedRoles={['patient']} />}>
              <Route path="/patient/dashboard" element={<PatientDashboard />} />
            </Route>

            {/* Protected Doctor Routes */}
            <Route element={<ProtectedRoute allowedRoles={['doctor']} />}>
              <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            </Route>

            {/* Protected Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>

            {/* Protected Developer Routes */}
            <Route element={<ProtectedRoute allowedRoles={['developer']} />}>
              <Route path="/developer/dashboard" element={<DeveloperDashboard />} />
            </Route>

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
