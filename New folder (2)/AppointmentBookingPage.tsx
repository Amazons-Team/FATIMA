import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import Input from '../components/Input';

const AppointmentBookingPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Mock data for clinics and doctors
  const clinics = [
    { id: 1, name: 'عيادة الأسنان العامة', doctorName: 'د. أحمد محمد' },
    { id: 2, name: 'عيادة تقويم الأسنان', doctorName: 'د. سارة علي' },
    { id: 3, name: 'عيادة علاج العصب', doctorName: 'د. محمد خالد' },
    { id: 4, name: 'عيادة طب أسنان الأطفال', doctorName: 'د. فاطمة أحمد' },
    { id: 5, name: 'عيادة زراعة الأسنان', doctorName: 'د. عمر حسن' },
  ];
  
  const [formData, setFormData] = useState({
    clinicId: '',
    appointmentType: 'checkup',
    date: '',
    time: '',
    notes: '',
  });
  
  const [errors, setErrors] = useState({
    clinicId: '',
    date: '',
    time: '',
    general: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {
      clinicId: !formData.clinicId ? 'يرجى اختيار العيادة' : '',
      date: !formData.date ? 'يرجى اختيار التاريخ' : '',
      time: !formData.time ? 'يرجى اختيار الوقت' : '',
      general: '',
    };
    
    setErrors(newErrors);
    
    // Check if there are any errors
    if (Object.values(newErrors).some(error => error !== '')) {
      return;
    }
    
    // If no errors, proceed with booking
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      setSuccess(true);
      
      // Reset form
      setFormData({
        clinicId: '',
        appointmentType: 'checkup',
        date: '',
        time: '',
        notes: '',
      });
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/patient/dashboard');
      }, 2000);
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        general: 'حدث خطأ أثناء حجز الموعد. يرجى المحاولة مرة أخرى.'
      }));
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header title="حجز موعد جديد" subtitle="اختر العيادة والوقت المناسب لك" />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="card">
            {success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-green-600 mb-2">تم حجز الموعد بنجاح!</h2>
                <p className="text-gray-600 mb-6">سيتم تحويلك إلى لوحة التحكم خلال لحظات...</p>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-6">حجز موعد جديد</h2>
                
                {errors.general && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {errors.general}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="clinicId" className="block text-sm font-medium text-gray-700 mb-1">
                      اختر العيادة <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="clinicId"
                      name="clinicId"
                      value={formData.clinicId}
                      onChange={handleChange}
                      className={`input ${errors.clinicId ? 'border-red-500 focus:ring-red-500' : ''}`}
                      required
                    >
                      <option value="">-- اختر العيادة --</option>
                      {clinics.map(clinic => (
                        <option key={clinic.id} value={clinic.id}>
                          {clinic.name} - {clinic.doctorName}
                        </option>
                      ))}
                    </select>
                    {errors.clinicId && <p className="mt-1 text-sm text-red-500">{errors.clinicId}</p>}
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="appointmentType" className="block text-sm font-medium text-gray-700 mb-1">
                      نوع الموعد <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="appointmentType"
                      name="appointmentType"
                      value={formData.appointmentType}
                      onChange={handleChange}
                      className="input"
                      required
                    >
                      <option value="checkup">كشف</option>
                      <option value="treatment">علاج</option>
                      <option value="follow-up">متابعة</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                        التاريخ <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className={`input ${errors.date ? 'border-red-500 focus:ring-red-500' : ''}`}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                      {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                        الوقت <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className={`input ${errors.time ? 'border-red-500 focus:ring-red-500' : ''}`}
                        required
                      >
                        <option value="">-- اختر الوقت --</option>
                        <option value="09:00">09:00 صباحاً</option>
                        <option value="10:00">10:00 صباحاً</option>
                        <option value="11:00">11:00 صباحاً</option>
                        <option value="12:00">12:00 ظهراً</option>
                        <option value="13:00">01:00 مساءً</option>
                        <option value="14:00">02:00 مساءً</option>
                        <option value="15:00">03:00 مساءً</option>
                        <option value="16:00">04:00 مساءً</option>
                      </select>
                      {errors.time && <p className="mt-1 text-sm text-red-500">{errors.time}</p>}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                      ملاحظات إضافية
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={3}
                      className="input"
                      placeholder="أي معلومات إضافية ترغب في إضافتها"
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate('/patient/dashboard')}
                    >
                      إلغاء
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={loading}
                    >
                      {loading ? 'جاري الحجز...' : 'تأكيد الحجز'}
                    </Button>
                  </div>
                </form>
              </>
            )}
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

export default AppointmentBookingPage;
