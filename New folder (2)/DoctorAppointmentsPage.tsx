import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';

const DoctorAppointmentsPage: React.FC = () => {
  // Mock data for appointments
  const [appointments, setAppointments] = useState([
    {
      id: '1',
      patientName: 'محمد أحمد',
      patientId: 'P001',
      date: '2025-04-10',
      time: '10:00 ص',
      status: 'scheduled' as const,
      type: 'checkup' as const,
      notes: '',
    },
    {
      id: '2',
      patientName: 'فاطمة علي',
      patientId: 'P002',
      date: '2025-04-10',
      time: '11:30 ص',
      status: 'scheduled' as const,
      type: 'treatment' as const,
      notes: 'متابعة علاج العصب',
    },
    {
      id: '3',
      patientName: 'أحمد خالد',
      patientId: 'P003',
      date: '2025-04-10',
      time: '09:00 ص',
      status: 'completed' as const,
      type: 'follow-up' as const,
      notes: 'تم الانتهاء من العلاج بنجاح',
    },
    {
      id: '4',
      patientName: 'سارة محمود',
      patientId: 'P004',
      date: '2025-04-11',
      time: '10:00 ص',
      status: 'scheduled' as const,
      type: 'checkup' as const,
      notes: '',
    },
  ]);

  const [selectedDate, setSelectedDate] = useState('2025-04-10');
  const [filter, setFilter] = useState('all');
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);
  const [appointmentNotes, setAppointmentNotes] = useState('');
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    setSelectedAppointment(null);
  };
  
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setSelectedAppointment(null);
  };
  
  const handleCompleteAppointment = (id: string) => {
    setAppointments(appointments.map(app => 
      app.id === id ? { ...app, status: 'completed' as const } : app
    ));
  };
  
  const handleCancelAppointment = (id: string) => {
    setAppointments(appointments.map(app => 
      app.id === id ? { ...app, status: 'cancelled' as const } : app
    ));
  };
  
  const handleSaveNotes = () => {
    if (selectedAppointment && appointmentNotes.trim()) {
      setAppointments(appointments.map(app => 
        app.id === selectedAppointment ? { ...app, notes: appointmentNotes } : app
      ));
      // Reset selection
      setSelectedAppointment(null);
      setAppointmentNotes('');
    }
  };
  
  const filteredAppointments = appointments.filter(app => {
    // Filter by date
    if (app.date !== selectedDate) return false;
    
    // Filter by status
    if (filter === 'scheduled' && app.status !== 'scheduled') return false;
    if (filter === 'completed' && app.status !== 'completed') return false;
    if (filter === 'cancelled' && app.status !== 'cancelled') return false;
    
    return true;
  });
  
  const selectedAppointmentData = appointments.find(app => app.id === selectedAppointment);

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="إدارة المواعيد" subtitle="عرض وإدارة مواعيد المرضى" />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex items-center">
              <label htmlFor="date" className="ml-2 font-medium">التاريخ:</label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="input w-auto"
              />
            </div>
            
            <div className="flex space-x-2 space-x-reverse">
              <button 
                className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => handleFilterChange('all')}
              >
                الكل
              </button>
              <button 
                className={`px-4 py-2 rounded-md ${filter === 'scheduled' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => handleFilterChange('scheduled')}
              >
                المجدولة
              </button>
              <button 
                className={`px-4 py-2 rounded-md ${filter === 'completed' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => handleFilterChange('completed')}
              >
                المكتملة
              </button>
              <button 
                className={`px-4 py-2 rounded-md ${filter === 'cancelled' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => handleFilterChange('cancelled')}
              >
                الملغاة
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="card h-full">
                <h2 className="text-xl font-semibold mb-4">قائمة المواعيد</h2>
                
                {filteredAppointments.length > 0 ? (
                  <div className="space-y-3 max-h-[600px] overflow-y-auto">
                    {filteredAppointments.map(appointment => (
                      <div 
                        key={appointment.id}
                        className={`p-3 border rounded-md cursor-pointer transition-colors ${
                          selectedAppointment === appointment.id ? 'bg-primary-50 border-primary-500' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => {
                          setSelectedAppointment(appointment.id);
                          setAppointmentNotes(appointment.notes);
                        }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{appointment.patientName}</div>
                            <div className="text-sm text-gray-600">
                              {appointment.time} - {
                                appointment.type === 'checkup' ? 'كشف' :
                                appointment.type === 'treatment' ? 'علاج' : 'متابعة'
                              }
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                            appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {appointment.status === 'scheduled' ? 'مجدول' :
                             appointment.status === 'completed' ? 'مكتمل' : 'ملغي'}
                          </span>
                        </div>
                        {appointment.notes && (
                          <div className="mt-2 text-xs text-gray-500 truncate">
                            {appointment.notes}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    لا توجد مواعيد في هذا اليوم
                  </div>
                )}
              </div>
            </div>
            
            <div className="lg:col-span-2">
              {selectedAppointmentData ? (
                <div className="card h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-xl font-semibold">{selectedAppointmentData.patientName}</h2>
                      <div className="text-gray-600">رقم المريض: {selectedAppointmentData.patientId}</div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      selectedAppointmentData.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                      selectedAppointmentData.status === 'completed' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedAppointmentData.status === 'scheduled' ? 'مجدول' :
                       selectedAppointmentData.status === 'completed' ? 'مكتمل' : 'ملغي'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">تفاصيل الموعد</h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <span className="text-gray-600 ml-2">التاريخ:</span>
                          <span>{selectedAppointmentData.date}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-600 ml-2">الوقت:</span>
                          <span>{selectedAppointmentData.time}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-600 ml-2">نوع الموعد:</span>
                          <span>
                            {selectedAppointmentData.type === 'checkup' ? 'كشف' :
                             selectedAppointmentData.type === 'treatment' ? 'علاج' : 'متابعة'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">الإجراءات</h3>
                      <div className="space-y-2">
                        <Button 
                          variant="primary" 
                          size="sm" 
                          fullWidth
                          disabled={selectedAppointmentData.status !== 'scheduled'}
                          onClick={() => handleCompleteAppointment(selectedAppointmentData.id)}
                        >
                          إكمال الموعد
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          fullWidth
                          disabled={selectedAppointmentData.status !== 'scheduled'}
                          onClick={() => handleCancelAppointment(selectedAppointmentData.id)}
                        >
                          إلغاء الموعد
                        </Button>
                        <Link to={`/doctor/patients?id=${selectedAppointmentData.patientId}`}>
                          <Button variant="secondary" size="sm" fullWidth>
                            عرض ملف المريض
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">ملاحظات الموعد</h3>
                    <textarea
                      rows={4}
                      className="input w-full"
                      placeholder="أضف ملاحظات حول الموعد والإجراءات المتخذة..."
                      value={appointmentNotes}
                      onChange={(e) => setAppointmentNotes(e.target.value)}
                      disabled={selectedAppointmentData.status === 'cancelled'}
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      variant="primary"
                      onClick={handleSaveNotes}
                      disabled={selectedAppointmentData.status === 'cancelled' || !appointmentNotes.trim()}
                    >
                      حفظ الملاحظات
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="card h-full flex items-center justify-center">
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-gray-700 mb-2">اختر موعداً من القائمة</h3>
                    <p className="text-gray-500">
                      اختر موعداً لعرض التفاصيل وإدارته
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link to="/doctor/dashboard">
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

export default DoctorAppointmentsPage;
