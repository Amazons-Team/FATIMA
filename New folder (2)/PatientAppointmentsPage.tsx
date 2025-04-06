import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import AppointmentCard from '../components/AppointmentCard';
import { useAuth } from '../contexts/AuthContext';

const PatientAppointmentsPage: React.FC = () => {
  const { user } = useAuth();
  
  // Mock data for appointments
  const [appointments, setAppointments] = useState([
    {
      id: '1',
      doctorName: 'د. أحمد محمد',
      clinicNumber: 3,
      date: '2025-04-10',
      time: '10:00 ص',
      status: 'scheduled' as const,
      type: 'checkup' as const,
    },
    {
      id: '2',
      doctorName: 'د. سارة علي',
      clinicNumber: 7,
      date: '2025-04-15',
      time: '11:30 ص',
      status: 'scheduled' as const,
      type: 'treatment' as const,
    },
    {
      id: '3',
      doctorName: 'د. محمد خالد',
      clinicNumber: 5,
      date: '2025-03-25',
      time: '09:00 ص',
      status: 'completed' as const,
      type: 'follow-up' as const,
    },
    {
      id: '4',
      doctorName: 'د. فاطمة أحمد',
      clinicNumber: 4,
      date: '2025-03-20',
      time: '14:00 م',
      status: 'cancelled' as const,
      type: 'checkup' as const,
    },
  ]);

  const [filter, setFilter] = useState('all');

  const handleCancelAppointment = (id: string) => {
    // This will be implemented with actual API calls in later steps
    setAppointments(appointments.map(app => 
      app.id === id ? { ...app, status: 'cancelled' as const } : app
    ));
  };

  const handleRescheduleAppointment = (id: string) => {
    // This will be implemented with actual functionality in later steps
    console.log('Reschedule appointment', id);
  };

  const filteredAppointments = appointments.filter(app => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') return app.status === 'scheduled';
    if (filter === 'completed') return app.status === 'completed';
    if (filter === 'cancelled') return app.status === 'cancelled';
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="مواعيدي" subtitle="إدارة مواعيدك الطبية" />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-2 space-x-reverse">
              <button 
                className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setFilter('all')}
              >
                الكل
              </button>
              <button 
                className={`px-4 py-2 rounded-md ${filter === 'upcoming' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setFilter('upcoming')}
              >
                القادمة
              </button>
              <button 
                className={`px-4 py-2 rounded-md ${filter === 'completed' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setFilter('completed')}
              >
                المكتملة
              </button>
              <button 
                className={`px-4 py-2 rounded-md ${filter === 'cancelled' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setFilter('cancelled')}
              >
                الملغاة
              </button>
            </div>
            
            <Link to="/patient/book-appointment">
              <Button variant="primary">حجز موعد جديد</Button>
            </Link>
          </div>
          
          {filteredAppointments.length > 0 ? (
            <div>
              {filteredAppointments.map(appointment => (
                <AppointmentCard
                  key={appointment.id}
                  doctorName={appointment.doctorName}
                  clinicNumber={appointment.clinicNumber}
                  date={appointment.date}
                  time={appointment.time}
                  status={appointment.status}
                  type={appointment.type}
                  onCancel={appointment.status === 'scheduled' ? () => handleCancelAppointment(appointment.id) : undefined}
                  onReschedule={appointment.status === 'scheduled' ? () => handleRescheduleAppointment(appointment.id) : undefined}
                />
              ))}
            </div>
          ) : (
            <div className="card text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">لا توجد مواعيد</h3>
              <p className="text-gray-500 mb-6">
                {filter === 'all' ? 'ليس لديك أي مواعيد حالياً' : 
                 filter === 'upcoming' ? 'ليس لديك مواعيد قادمة' : 
                 filter === 'completed' ? 'ليس لديك مواعيد مكتملة' : 'ليس لديك مواعيد ملغاة'}
              </p>
              <Link to="/patient/book-appointment">
                <Button variant="primary">حجز موعد جديد</Button>
              </Link>
            </div>
          )}
          
          <div className="mt-8 text-center">
            <Link to="/patient/dashboard">
              <Button variant="outline">العودة للوحة التحكم</Button>
            </Link>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>جميع الحقوق محفوظة &copy; {new Date().getFullYear()} - مركز فاطمة لطب الأسنان</p>
        </div>
      </footer>
    </div>
  );
};

export default PatientAppointmentsPage;
