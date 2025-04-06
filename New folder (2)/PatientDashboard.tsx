import React, { useState } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import AppointmentCard from '../components/AppointmentCard';

const PatientDashboard: React.FC = () => {
  // Mock data - will be replaced with actual data from API
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
  ]);

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="لوحة تحكم المريض" subtitle="إدارة مواعيدك ومعلوماتك الشخصية" />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <section className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">المواعيد القادمة</h2>
                <Button variant="primary" size="sm">حجز موعد جديد</Button>
              </div>
              
              <div>
                {appointments.filter(app => app.status === 'scheduled').map(appointment => (
                  <AppointmentCard
                    key={appointment.id}
                    doctorName={appointment.doctorName}
                    clinicNumber={appointment.clinicNumber}
                    date={appointment.date}
                    time={appointment.time}
                    status={appointment.status}
                    type={appointment.type}
                    onCancel={() => handleCancelAppointment(appointment.id)}
                    onReschedule={() => handleRescheduleAppointment(appointment.id)}
                  />
                ))}
                
                {appointments.filter(app => app.status === 'scheduled').length === 0 && (
                  <div className="card text-center py-8">
                    <p className="text-gray-500">ليس لديك مواعيد قادمة</p>
                    <Button variant="primary" size="sm" className="mt-4">حجز موعد جديد</Button>
                  </div>
                )}
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">المواعيد السابقة</h2>
              <div>
                {appointments.filter(app => app.status === 'completed' || app.status === 'cancelled').map(appointment => (
                  <AppointmentCard
                    key={appointment.id}
                    doctorName={appointment.doctorName}
                    clinicNumber={appointment.clinicNumber}
                    date={appointment.date}
                    time={appointment.time}
                    status={appointment.status}
                    type={appointment.type}
                  />
                ))}
                
                {appointments.filter(app => app.status === 'completed' || app.status === 'cancelled').length === 0 && (
                  <div className="card text-center py-8">
                    <p className="text-gray-500">ليس لديك مواعيد سابقة</p>
                  </div>
                )}
              </div>
            </section>
          </div>
          
          <div>
            <div className="card mb-6">
              <h2 className="text-xl font-semibold mb-4">معلوماتك الشخصية</h2>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-600 block text-sm">الاسم:</span>
                  <span className="font-medium">محمد أحمد</span>
                </div>
                <div>
                  <span className="text-gray-600 block text-sm">البريد الإلكتروني:</span>
                  <span className="font-medium">mohammed@example.com</span>
                </div>
                <div>
                  <span className="text-gray-600 block text-sm">رقم الهاتف:</span>
                  <span className="font-medium">+966 50 123 4567</span>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" size="sm">تعديل المعلومات الشخصية</Button>
              </div>
            </div>
            
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">التواصل المباشر</h2>
              <p className="text-sm text-gray-600 mb-4">
                يمكنك التواصل مباشرة مع الطبيب المعالج أو مع الاستعلامات
              </p>
              <div className="space-y-2">
                <Button variant="primary" fullWidth>التواصل مع الطبيب</Button>
                <Button variant="secondary" fullWidth>التواصل مع الاستعلامات</Button>
              </div>
            </div>
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

export default PatientDashboard;
