import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import { useAppointments } from '../contexts/AppointmentContext';
import { useAuth } from '../contexts/AuthContext';
import { Appointment, Doctor, Clinic } from '../interfaces/types';

const AppointmentBookingSystem: React.FC = () => {
  const { user } = useAuth();
  const { appointments, addAppointment, checkAvailability } = useAppointments();
  const navigate = useNavigate();
  
  // Mock data for doctors and clinics
  const [doctors, setDoctors] = useState<Doctor[]>([
    { id: 'D001', name: 'د. أحمد محمد', specialization: 'طب الأسنان العام', clinicId: 3 },
    { id: 'D002', name: 'د. سارة علي', specialization: 'تقويم الأسنان', clinicId: 7 },
    { id: 'D003', name: 'د. محمد خالد', specialization: 'علاج العصب', clinicId: 5 },
    { id: 'D004', name: 'د. فاطمة أحمد', specialization: 'طب أسنان الأطفال', clinicId: 4 },
    { id: 'D005', name: 'د. عمر حسن', specialization: 'زراعة الأسنان', clinicId: 1 },
    { id: 'D006', name: 'د. ليلى محمود', specialization: 'جراحة الفم والأسنان', clinicId: 6 },
    { id: 'D007', name: 'د. خالد عبدالله', specialization: 'علاج اللثة', clinicId: 8 },
    { id: 'D008', name: 'د. نورا سعيد', specialization: 'طب الأسنان التجميلي', clinicId: 9 },
    { id: 'D009', name: 'د. حسن علي', specialization: 'طب الأسنان الوقائي', clinicId: 10 },
    { id: 'D010', name: 'د. سلمى أحمد', specialization: 'تبييض الأسنان', clinicId: 11 },
    { id: 'D011', name: 'د. ياسر محمد', specialization: 'طب الأسنان العام', clinicId: 12 },
    { id: 'D012', name: 'د. رنا خالد', specialization: 'تقويم الأسنان', clinicId: 13 },
    { id: 'D013', name: 'د. عمرو سامي', specialization: 'علاج العصب', clinicId: 14 },
    { id: 'D014', name: 'د. دينا محمود', specialization: 'طب أسنان الأطفال', clinicId: 15 },
    { id: 'D015', name: 'د. أيمن حسن', specialization: 'زراعة الأسنان', clinicId: 2 },
  ]);
  
  const [clinics, setClinics] = useState<Clinic[]>([
    { id: 1, number: 1, name: 'عيادة 1', status: 'available' },
    { id: 2, number: 2, name: 'عيادة 2', status: 'available' },
    { id: 3, number: 3, name: 'عيادة 3', status: 'available' },
    { id: 4, number: 4, name: 'عيادة 4', status: 'available' },
    { id: 5, number: 5, name: 'عيادة 5', status: 'available' },
    { id: 6, number: 6, name: 'عيادة 6', status: 'available' },
    { id: 7, number: 7, name: 'عيادة 7', status: 'available' },
    { id: 8, number: 8, name: 'عيادة 8', status: 'available' },
    { id: 9, number: 9, name: 'عيادة 9', status: 'available' },
    { id: 10, number: 10, name: 'عيادة 10', status: 'available' },
    { id: 11, number: 11, name: 'عيادة 11', status: 'available' },
    { id: 12, number: 12, name: 'عيادة 12', status: 'available' },
    { id: 13, number: 13, name: 'عيادة 13', status: 'available' },
    { id: 14, number: 14, name: 'عيادة 14', status: 'available' },
    { id: 15, number: 15, name: 'عيادة 15', status: 'available' },
  ]);
  
  // State for booking form
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentType, setAppointmentType] = useState<'checkup' | 'treatment' | 'follow-up'>('checkup');
  const [notes, setNotes] = useState('');
  
  // Get unique specializations from doctors
  const specializations = [...new Set(doctors.map(doctor => doctor.specialization))];
  
  // Filter doctors by selected specialization
  const filteredDoctors = selectedSpecialization 
    ? doctors.filter(doctor => doctor.specialization === selectedSpecialization)
    : doctors;
  
  // Get available time slots for selected doctor and date
  const getAvailableTimeSlots = () => {
    if (!selectedDoctor || !selectedDate) return [];
    
    const timeSlots = [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', 
      '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
      '15:00', '15:30', '16:00', '16:30'
    ];
    
    return timeSlots.filter(time => 
      checkAvailability(selectedDoctor, selectedDate, time)
    );
  };
  
  const availableTimeSlots = getAvailableTimeSlots();
  
  // Handle form submission
  const handleBookAppointment = () => {
    if (!user) {
      alert('يرجى تسجيل الدخول أولاً');
      navigate('/login');
      return;
    }
    
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }
    
    const doctor = doctors.find(d => d.id === selectedDoctor);
    if (!doctor) return;
    
    const newAppointment: Omit<Appointment, 'id'> = {
      patientId: user.id,
      patientName: user.name,
      doctorId: selectedDoctor,
      doctorName: doctor.name,
      clinicId: doctor.clinicId,
      date: selectedDate,
      time: selectedTime,
      duration: appointmentType === 'checkup' ? 30 : appointmentType === 'follow-up' ? 30 : 60,
      type: appointmentType,
      status: 'scheduled',
      notes: notes,
      createdAt: new Date().toISOString().split('T')[0],
    };
    
    addAppointment(newAppointment);
    
    // Reset form and show success message
    setBookingStep(4);
  };
  
  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];
  
  // Format time for display
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    return `${hour > 12 ? hour - 12 : hour}:${minutes} ${hour >= 12 ? 'م' : 'ص'}`;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header title="حجز موعد" subtitle="حجز موعد جديد في مركز فاطمة لطب الأسنان" />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="card">
            {/* Booking steps progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className={`flex flex-col items-center ${bookingStep >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${bookingStep >= 1 ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-400'}`}>
                    1
                  </div>
                  <span className="text-sm">اختيار الطبيب</span>
                </div>
                <div className={`flex-1 h-1 mx-2 ${bookingStep >= 2 ? 'bg-primary-400' : 'bg-gray-200'}`}></div>
                <div className={`flex flex-col items-center ${bookingStep >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${bookingStep >= 2 ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-400'}`}>
                    2
                  </div>
                  <span className="text-sm">اختيار الموعد</span>
                </div>
                <div className={`flex-1 h-1 mx-2 ${bookingStep >= 3 ? 'bg-primary-400' : 'bg-gray-200'}`}></div>
                <div className={`flex flex-col items-center ${bookingStep >= 3 ? 'text-primary-600' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${bookingStep >= 3 ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-400'}`}>
                    3
                  </div>
                  <span className="text-sm">تأكيد الحجز</span>
                </div>
              </div>
            </div>
            
            {/* Step 1: Select Doctor */}
            {bookingStep === 1 && (
              <div>
                <h2 className="text-xl font-semibold mb-6">اختيار الطبيب</h2>
                
                <div className="mb-6">
                  <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">
                    التخصص
                  </label>
                  <select
                    id="specialization"
                    value={selectedSpecialization}
                    onChange={(e) => setSelectedSpecialization(e.target.value)}
                    className="input"
                  >
                    <option value="">-- اختر التخصص --</option>
                    {specializations.map((spec, index) => (
                      <option key={index} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="doctor" className="block text-sm font-medium text-gray-700 mb-1">
                    الطبيب
                  </label>
                  <select
                    id="doctor"
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    className="input"
                    required
                  >
                    <option value="">-- اختر الطبيب --</option>
                    {filteredDoctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name} - {doctor.specialization} (عيادة {doctor.clinicId})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="appointmentType" className="block text-sm font-medium text-gray-700 mb-1">
                    نوع الموعد
                  </label>
                  <select
                    id="appointmentType"
                    value={appointmentType}
                    onChange={(e) => setAppointmentType(e.target.value as 'checkup' | 'treatment' | 'follow-up')}
                    className="input"
                    required
                  >
                    <option value="checkup">كشف جديد</option>
                    <option value="treatment">علاج</option>
                    <option value="follow-up">متابعة</option>
                  </select>
                </div>
                
                <div className="flex justify-end">
                  <Button
                    variant="primary"
                    onClick={() => {
                      if (!selectedDoctor) {
                        alert('يرجى اختيار الطبيب');
                        return;
                      }
                      setBookingStep(2);
                    }}
                  >
                    التالي
                  </Button>
                </div>
              </div>
            )}
            
            {/* Step 2: Select Date and Time */}
            {bookingStep === 2 && (
              <div>
                <h2 className="text-xl font-semibold mb-6">اختيار الموعد</h2>
                
                <div className="mb-6">
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    التاريخ
                  </label>
                  <input
                    type="date"
                    id="date"
                    min={today}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="input"
                    required
                  />
                </div>
                
                {selectedDate && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      الوقت المتاح
                    </label>
                    
                    {availableTimeSlots.length > 0 ? (
                      <div className="grid grid-cols-3 gap-2">
                        {availableTimeSlots.map((time) => (
                          <button
                            key={time}
                            type="button"
                            className={`p-2 rounded-md text-center ${
                              selectedTime === time
                                ? 'bg-primary-500 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                            onClick={() => setSelectedTime(time)}
                          >
                            {formatTime(time)}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-gray-500">
                        لا توجد مواعيد متاحة في هذا اليوم
                      </div>
                    )}
                  </div>
                )}
                
                <div className="mb-6">
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                    ملاحظات (اختياري)
                  </label>
                  <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="input"
                    rows={3}
                    placeholder="أضف أي ملاحظات أو أعراض تريد إخبار الطبيب بها"
                  ></textarea>
                </div>
                
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setBookingStep(1)}
                  >
                    السابق
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      if (!selectedDate || !selectedTime) {
                        alert('يرجى اختيار التاريخ والوقت');
                        return;
                      }
                      setBookingStep(3);
                    }}
                  >
                    التالي
                  </Button>
                </div>
              </div>
            )}
            
            {/* Step 3: Confirm Booking */}
            {bookingStep === 3 && (
              <div>
                <h2 className="text-xl font-semibold mb-6">تأكيد الحجز</h2>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="font-medium text-lg mb-4">تفاصيل الموعد</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">الطبيب</p>
                      <p className="font-medium">{doctors.find(d => d.id === selectedDoctor)?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">التخصص</p>
                      <p className="font-medium">{doctors.find(d => d.id === selectedDoctor)?.specialization}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">العيادة</p>
                      <p className="font-medium">عيادة {doctors.find(d => d.id === selectedDoctor)?.clinicId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">نوع الموعد</p>
                      <p className="font-medium">
                        {appointmentType === 'checkup' ? 'كشف جديد' : 
                         appointmentType === 'treatment' ? 'علاج' : 'متابعة'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">التاريخ</p>
                      <p className="font-medium">{selectedDate}</p>
                    </div>
                    <div>
                      <p className="text-
(Content truncated due to size limit. Use line ranges to read in chunks)