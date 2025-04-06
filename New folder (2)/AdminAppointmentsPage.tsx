import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import Input from '../components/Input';

const AdminAppointmentsPage: React.FC = () => {
  // Mock data for appointments
  const [appointments, setAppointments] = useState([
    {
      id: '1',
      patientName: 'محمد أحمد',
      patientId: 'P001',
      doctorName: 'د. أحمد محمد',
      clinicNumber: 3,
      date: '2025-04-10',
      time: '10:00 ص',
      status: 'scheduled' as const,
      type: 'checkup' as const,
    },
    {
      id: '2',
      patientName: 'فاطمة علي',
      patientId: 'P002',
      doctorName: 'د. سارة علي',
      clinicNumber: 7,
      date: '2025-04-10',
      time: '11:30 ص',
      status: 'scheduled' as const,
      type: 'treatment' as const,
    },
    {
      id: '3',
      patientName: 'أحمد خالد',
      patientId: 'P003',
      doctorName: 'د. محمد خالد',
      clinicNumber: 5,
      date: '2025-04-10',
      time: '09:00 ص',
      status: 'completed' as const,
      type: 'follow-up' as const,
    },
    {
      id: '4',
      patientName: 'سارة محمود',
      patientId: 'P004',
      doctorName: 'د. فاطمة أحمد',
      clinicNumber: 4,
      date: '2025-04-11',
      time: '10:00 ص',
      status: 'scheduled' as const,
      type: 'checkup' as const,
    },
    {
      id: '5',
      patientName: 'خالد عمر',
      patientId: 'P005',
      doctorName: 'د. عمر حسن',
      clinicNumber: 1,
      date: '2025-04-11',
      time: '12:00 م',
      status: 'cancelled' as const,
      type: 'treatment' as const,
    },
  ]);

  const [selectedDate, setSelectedDate] = useState('2025-04-10');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);
  
  // Mock data for doctors and patients (for creating/editing appointments)
  const doctors = [
    { id: 1, name: 'د. أحمد محمد', clinicNumber: 3 },
    { id: 2, name: 'د. سارة علي', clinicNumber: 7 },
    { id: 3, name: 'د. محمد خالد', clinicNumber: 5 },
    { id: 4, name: 'د. فاطمة أحمد', clinicNumber: 4 },
    { id: 5, name: 'د. عمر حسن', clinicNumber: 1 },
  ];
  
  const patients = [
    { id: 'P001', name: 'محمد أحمد' },
    { id: 'P002', name: 'فاطمة علي' },
    { id: 'P003', name: 'أحمد خالد' },
    { id: 'P004', name: 'سارة محمود' },
    { id: 'P005', name: 'خالد عمر' },
  ];
  
  const [editForm, setEditForm] = useState({
    patientId: '',
    doctorId: '',
    date: '',
    time: '',
    type: 'checkup' as 'checkup' | 'treatment' | 'follow-up',
    status: 'scheduled' as 'scheduled' | 'completed' | 'cancelled',
  });
  
  const [isCreating, setIsCreating] = useState(false);
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    setSelectedAppointment(null);
  };
  
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setSelectedAppointment(null);
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleEditAppointment = (id: string) => {
    const appointment = appointments.find(app => app.id === id);
    if (appointment) {
      setEditForm({
        patientId: appointment.patientId,
        doctorId: doctors.find(d => d.name === appointment.doctorName)?.id.toString() || '',
        date: appointment.date,
        time: appointment.time,
        type: appointment.type,
        status: appointment.status,
      });
      setSelectedAppointment(id);
      setIsCreating(false);
    }
  };
  
  const handleCreateAppointment = () => {
    setEditForm({
      patientId: '',
      doctorId: '',
      date: selectedDate,
      time: '',
      type: 'checkup',
      status: 'scheduled',
    });
    setSelectedAppointment(null);
    setIsCreating(true);
  };
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSaveChanges = () => {
    if (isCreating) {
      // Create new appointment
      const newAppointment = {
        id: `${appointments.length + 1}`,
        patientName: patients.find(p => p.id === editForm.patientId)?.name || '',
        patientId: editForm.patientId,
        doctorName: doctors.find(d => d.id.toString() === editForm.doctorId)?.name || '',
        clinicNumber: doctors.find(d => d.id.toString() === editForm.doctorId)?.clinicNumber || 0,
        date: editForm.date,
        time: editForm.time,
        status: editForm.status,
        type: editForm.type,
      };
      
      setAppointments([...appointments, newAppointment]);
      setIsCreating(false);
    } else if (selectedAppointment) {
      // Update existing appointment
      setAppointments(appointments.map(app => {
        if (app.id === selectedAppointment) {
          return {
            ...app,
            patientName: patients.find(p => p.id === editForm.patientId)?.name || app.patientName,
            patientId: editForm.patientId,
            doctorName: doctors.find(d => d.id.toString() === editForm.doctorId)?.name || app.doctorName,
            clinicNumber: doctors.find(d => d.id.toString() === editForm.doctorId)?.clinicNumber || app.clinicNumber,
            date: editForm.date,
            time: editForm.time,
            status: editForm.status,
            type: editForm.type,
          };
        }
        return app;
      }));
      
      setSelectedAppointment(null);
    }
  };
  
  const handleDeleteAppointment = () => {
    if (selectedAppointment) {
      setAppointments(appointments.filter(app => app.id !== selectedAppointment));
      setSelectedAppointment(null);
    }
  };
  
  const filteredAppointments = appointments.filter(app => {
    // Filter by date
    if (app.date !== selectedDate) return false;
    
    // Filter by status
    if (filter !== 'all' && app.status !== filter) return false;
    
    // Filter by search term
    if (searchTerm && 
        !app.patientName.includes(searchTerm) && 
        !app.patientId.includes(searchTerm) && 
        !app.doctorName.includes(searchTerm)) {
      return false;
    }
    
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
            
            <div className="relative w-full md:w-auto">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input
                type="search"
                className="input pr-10 w-full md:w-64"
                placeholder="البحث عن موعد..."
                value={searchTerm}
                onChange={handleSearch}
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
            <div className="lg:col-span-2">
              <div className="card">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">قائمة المواعيد</h2>
                  <Button 
                    variant="primary"
                    onClick={handleCreateAppointment}
                  >
                    إضافة موعد جديد
                  </Button>
                </div>
                
                {filteredAppointments.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border p-2 text-right">المريض</th>
                          <th className="border p-2 text-right">الطبيب</th>
                          <th className="border p-2 text-right">العيادة</th>
                          <th className="border p-2 text-right">الوقت</th>
                          <th className="border p-2 text-right">النوع</th>
                          <th className="border p-2 text-right">الحالة</th>
                          <th className="border p-2 text-right">الإجراءات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAppointments.map(appointment => (
                          <tr key={appointment.id} className="hover:bg-gray-50">
                            <td className="border p-2 font-medium">{appointment.patientName}</td>
                            <td className="border p-2">{appointment.doctorName}</td>
                            <td className="border p-2">{appointment.clinicNumber}</td>
                            <td className="border p-2">{appointment.time}</td>
                            <td className="border p-2">
                              {appointment.type === 'checkup' ? 'كشف' :
                               appointment.type === 'treatment' ? 'علاج' : 'متابعة'}
                            </td>
                            <td className="border p-2">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                                appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {appointment.status === 'scheduled' ? 'مجدول' :
                                 appointment.status === 'completed' ? 'مكتمل' : 'ملغي'}
                              </span>
                            </td>
                            <td className="border p-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleEditAppointment(appointment.id)}
                              >
                                تعديل
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    لا توجد مواعيد في هذا اليوم
                  </div>
                )}
              </div>
            </div>
            
            <div className="lg:col-span-1">
              {(selectedAppointmentData || isCreating) ? (
                <div className="card h-full">
                  <h2 className="text-xl font-semibold mb-4">
                    {isCreating ? 'إضافة موعد جديد' : 'تعديل الموعد'}
                  </h2>
                  
                  <div className="mb-4">
                    <label htmlFor="patientId" className="block text-sm font-medium text-gray-700 mb-1">
                      المريض
                    </label>
                    <select
                      id="patientId"
                      name="patientId"
                      value={editForm.patientId}
                      onChange={handleFormChange}
                      className="input"
                      required
                    >
                      <option value="">-- اختر المريض --</option>
                      {patients.map(patient => (
                        <option key={patient.id} value={patient.id}>
                          {patient.name} ({patient.id})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="doctorId" className="block text-sm font-medium text-gray-700 mb-1">
                      الطبيب
                    </label>
                    <select
                      id="doctorId"
                      name="doctorId"
                      value={editForm.doctorId}
                      onChange={handleFormChange}
                      className="input"
                      required
                    >
                      <option value="">-- اختر الطبيب --</option>
                      {doctors.map(doctor => (
                        <option key={doctor.id} value={doctor.id}>
                          {doctor.name} (عيادة {doctor.clinicNumber})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                        التاريخ
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={editForm.date}
                        onChange={handleFormChange}
                        className="input"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                        الوقت
                      </label>
                      <select
                        id="time"
                        name="time"
                        value={editForm.time}
                        onChange={handleFormChange}
                        clas
(Content truncated due to size limit. Use line ranges to read in chunks)