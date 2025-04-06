import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import { useAppointments } from '../contexts/AppointmentContext';
import { useAuth } from '../contexts/AuthContext';
import { Appointment, AppointmentStatus } from '../interfaces/types';

const AppointmentManagementSystem: React.FC = () => {
  const { user } = useAuth();
  const { 
    appointments, 
    updateAppointment, 
    deleteAppointment, 
    getAppointmentsByPatient,
    getAppointmentsByDoctor,
    getAppointmentsByDate
  } = useAppointments();
  
  const [userAppointments, setUserAppointments] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');
  const [dateFilter, setDateFilter] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  
  // Load user appointments based on role
  useEffect(() => {
    if (!user) return;
    
    let filteredAppointments: Appointment[] = [];
    
    if (user.role === 'patient') {
      filteredAppointments = getAppointmentsByPatient(user.id);
    } else if (user.role === 'doctor') {
      filteredAppointments = getAppointmentsByDoctor(user.id);
    } else {
      // Admin or developer sees all appointments
      filteredAppointments = [...appointments];
    }
    
    // Apply date filter if set
    if (dateFilter) {
      filteredAppointments = filteredAppointments.filter(app => app.date === dateFilter);
    }
    
    // Apply status filter
    if (filter !== 'all') {
      filteredAppointments = filteredAppointments.filter(app => {
        if (filter === 'upcoming') return app.status === 'scheduled';
        if (filter === 'completed') return app.status === 'completed';
        if (filter === 'cancelled') return app.status === 'cancelled';
        return true;
      });
    }
    
    // Sort by date and time
    filteredAppointments.sort((a, b) => {
      const dateComparison = a.date.localeCompare(b.date);
      if (dateComparison !== 0) return dateComparison;
      return a.time.localeCompare(b.time);
    });
    
    setUserAppointments(filteredAppointments);
  }, [user, appointments, filter, dateFilter]);
  
  // Handle appointment cancellation
  const handleCancelAppointment = (appointment: Appointment) => {
    if (window.confirm('هل أنت متأكد من رغبتك في إلغاء هذا الموعد؟')) {
      updateAppointment(appointment.id, { status: 'cancelled' });
    }
  };
  
  // Handle appointment completion
  const handleCompleteAppointment = (appointment: Appointment) => {
    updateAppointment(appointment.id, { status: 'completed' });
  };
  
  // Handle appointment deletion (admin only)
  const handleDeleteAppointment = (appointmentId: string) => {
    if (window.confirm('هل أنت متأكد من رغبتك في حذف هذا الموعد نهائياً؟')) {
      deleteAppointment(appointmentId);
      setSelectedAppointment(null);
    }
  };
  
  // Format time for display
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    return `${hour > 12 ? hour - 12 : hour}:${minutes} ${hour >= 12 ? 'م' : 'ص'}`;
  };
  
  // Get status label in Arabic
  const getStatusLabel = (status: AppointmentStatus) => {
    switch (status) {
      case 'scheduled': return 'مجدول';
      case 'completed': return 'مكتمل';
      case 'cancelled': return 'ملغي';
      default: return status;
    }
  };
  
  // Get appointment type label in Arabic
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'checkup': return 'كشف';
      case 'treatment': return 'علاج';
      case 'follow-up': return 'متابعة';
      default: return type;
    }
  };
  
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header title="إدارة المواعيد" subtitle="عرض وإدارة مواعيدك" />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex items-center">
              <label htmlFor="date" className="ml-2 font-medium">التاريخ:</label>
              <input
                type="date"
                id="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="input w-auto"
              />
              {dateFilter && (
                <button 
                  className="mr-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setDateFilter('')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
            
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
                المواعيد القادمة
              </button>
              <button 
                className={`px-4 py-2 rounded-md ${filter === 'completed' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setFilter('completed')}
              >
                المواعيد المكتملة
              </button>
              <button 
                className={`px-4 py-2 rounded-md ${filter === 'cancelled' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setFilter('cancelled')}
              >
                المواعيد الملغاة
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="card">
                <h2 className="text-xl font-semibold mb-4">قائمة المواعيد</h2>
                
                {userAppointments.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border p-2 text-right">التاريخ</th>
                          <th className="border p-2 text-right">الوقت</th>
                          {user?.role !== 'patient' && <th className="border p-2 text-right">المريض</th>}
                          {user?.role !== 'doctor' && <th className="border p-2 text-right">الطبيب</th>}
                          <th className="border p-2 text-right">العيادة</th>
                          <th className="border p-2 text-right">النوع</th>
                          <th className="border p-2 text-right">الحالة</th>
                          <th className="border p-2 text-right">الإجراءات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userAppointments.map(appointment => (
                          <tr 
                            key={appointment.id} 
                            className={`hover:bg-gray-50 ${
                              appointment.date === today ? 'bg-blue-50' : ''
                            }`}
                          >
                            <td className="border p-2">{appointment.date}</td>
                            <td className="border p-2">{formatTime(appointment.time)}</td>
                            {user?.role !== 'patient' && <td className="border p-2 font-medium">{appointment.patientName}</td>}
                            {user?.role !== 'doctor' && <td className="border p-2">{appointment.doctorName}</td>}
                            <td className="border p-2">عيادة {appointment.clinicId}</td>
                            <td className="border p-2">{getTypeLabel(appointment.type)}</td>
                            <td className="border p-2">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                                appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {getStatusLabel(appointment.status)}
                              </span>
                            </td>
                            <td className="border p-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedAppointment(appointment)}
                              >
                                التفاصيل
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    لا توجد مواعيد مطابقة للبحث
                  </div>
                )}
                
                {user?.role === 'patient' && (
                  <div className="mt-6 text-center">
                    <Link to="/appointment/booking">
                      <Button variant="primary">حجز موعد جديد</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
            
            <div className="lg:col-span-1">
              {selectedAppointment ? (
                <div className="card h-full">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold">تفاصيل الموعد</h2>
                    <button 
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => setSelectedAppointment(null)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">المريض</p>
                        <p className="font-medium">{selectedAppointment.patientName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">الطبيب</p>
                        <p className="font-medium">{selectedAppointment.doctorName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">العيادة</p>
                        <p className="font-medium">عيادة {selectedAppointment.clinicId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">التاريخ والوقت</p>
                        <p className="font-medium">{selectedAppointment.date} - {formatTime(selectedAppointment.time)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">نوع الموعد</p>
                        <p className="font-medium">{getTypeLabel(selectedAppointment.type)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">المدة</p>
                        <p className="font-medium">{selectedAppointment.duration} دقيقة</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">الحالة</p>
                        <p className="font-medium">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            selectedAppointment.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                            selectedAppointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {getStatusLabel(selectedAppointment.status)}
                          </span>
                        </p>
                      </div>
                      {selectedAppointment.notes && (
                        <div>
                          <p className="text-sm text-gray-500">ملاحظات</p>
                          <p className="font-medium">{selectedAppointment.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    {/* Patient can cancel upcoming appointments */}
                    {user?.role === 'patient' && selectedAppointment.status === 'scheduled' && (
                      <Button
                        variant="danger"
                        onClick={() => handleCancelAppointment(selectedAppointment)}
                      >
                        إلغاء الموعد
                      </Button>
                    )}
                    
                    {/* Doctor can mark appointments as completed */}
                    {user?.role === 'doctor' && selectedAppointment.status === 'scheduled' && (
                      <>
                        <Button
                          variant="primary"
                          onClick={() => handleCompleteAppointment(selectedAppointment)}
                        >
                          تأكيد اكتمال الموعد
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleCancelAppointment(selectedAppointment)}
                        >
                          إلغاء الموعد
                        </Button>
                      </>
                    )}
                    
                    {/* Admin can delete appointments */}
                    {(user?.role === 'admin' || user?.role === 'developer') && (
                      <>
                        {selectedAppointment.status === 'scheduled' && (
                          <Button
                            variant="primary"
                            onClick={() => handleCompleteAppointment(selectedAppointment)}
                          >
                            تأكيد اكتمال الموعد
                          </Button>
                        )}
                        {selectedAppointment.status === 'scheduled' && (
                          <Button
                            variant="danger"
                            onClick={() => handleCancelAppointme
(Content truncated due to size limit. Use line ranges to read in chunks)