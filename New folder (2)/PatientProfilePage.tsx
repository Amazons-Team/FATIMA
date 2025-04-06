import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import Input from '../components/Input';

const PatientProfilePage: React.FC = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: 'محمد أحمد',
    email: 'patient@example.com',
    phone: '+966 50 123 4567',
    dateOfBirth: '1990-01-01',
    medicalHistory: 'لا توجد أمراض مزمنة',
    allergies: 'حساسية من البنسلين'
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    general: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      name: !formData.name ? 'الاسم مطلوب' : '',
      email: !formData.email ? 'البريد الإلكتروني مطلوب' : '',
      phone: !formData.phone ? 'رقم الهاتف مطلوب' : '',
      general: '',
    };
    
    setErrors(newErrors);
    
    // Check if there are any errors
    if (Object.values(newErrors).some(error => error !== '')) {
      return;
    }
    
    // If no errors, proceed with updating profile
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      setSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        general: 'حدث خطأ أثناء تحديث البيانات. يرجى المحاولة مرة أخرى.'
      }));
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header title="الملف الشخصي" subtitle="إدارة معلوماتك الشخصية" />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="card">
            <h2 className="text-xl font-semibold mb-6">معلوماتك الشخصية</h2>
            
            {success && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                تم تحديث البيانات بنجاح!
              </div>
            )}
            
            {errors.general && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {errors.general}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                  label="الاسم الكامل"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  error={errors.name}
                />
                
                <Input
                  label="البريد الإلكتروني"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  error={errors.email}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                  label="رقم الهاتف"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  error={errors.phone}
                />
                
                <div className="mb-4">
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                    تاريخ الميلاد
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="medicalHistory" className="block text-sm font-medium text-gray-700 mb-1">
                  التاريخ الطبي
                </label>
                <textarea
                  id="medicalHistory"
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleChange}
                  rows={3}
                  className="input"
                  placeholder="أي معلومات طبية مهمة"
                ></textarea>
              </div>
              
              <div className="mb-6">
                <label htmlFor="allergies" className="block text-sm font-medium text-gray-700 mb-1">
                  الحساسية من الأدوية
                </label>
                <textarea
                  id="allergies"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  rows={2}
                  className="input"
                  placeholder="أي حساسية من الأدوية"
                ></textarea>
              </div>
              
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/patient/dashboard')}
                >
                  العودة للوحة التحكم
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading}
                >
                  {loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                </Button>
              </div>
            </form>
          </div>
          
          <div className="card mt-6">
            <h2 className="text-xl font-semibold mb-6">تغيير كلمة المرور</h2>
            
            <form>
              <div className="mb-4">
                <Input
                  label="كلمة المرور الحالية"
                  type="password"
                  name="currentPassword"
                  value=""
                  onChange={() => {}}
                  required
                />
              </div>
              
              <div className="mb-4">
                <Input
                  label="كلمة المرور الجديدة"
                  type="password"
                  name="newPassword"
                  value=""
                  onChange={() => {}}
                  required
                />
              </div>
              
              <div className="mb-6">
                <Input
                  label="تأكيد كلمة المرور الجديدة"
                  type="password"
                  name="confirmPassword"
                  value=""
                  onChange={() => {}}
                  required
                />
              </div>
              
              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                >
                  تغيير كلمة المرور
                </Button>
              </div>
            </form>
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

export default PatientProfilePage;
