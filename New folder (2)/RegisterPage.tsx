import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, loginWithSocial, loading } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    general: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      password: !formData.password ? 'كلمة المرور مطلوبة' : 
               formData.password.length < 6 ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : '',
      confirmPassword: formData.password !== formData.confirmPassword ? 'كلمات المرور غير متطابقة' : '',
      general: '',
    };
    
    setErrors(newErrors);
    
    // Check if there are any errors
    if (Object.values(newErrors).some(error => error !== '')) {
      return;
    }
    
    // If no errors, proceed with registration
    const success = await register({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      role: 'patient',
    });
    
    if (success) {
      navigate('/patient/dashboard');
    } else {
      setErrors(prev => ({
        ...prev,
        general: 'فشل في إنشاء الحساب. يرجى المحاولة مرة أخرى.'
      }));
    }
  };
  
  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    const success = await loginWithSocial(provider);
    
    if (success) {
      navigate('/patient/dashboard');
    } else {
      setErrors(prev => ({
        ...prev,
        general: `فشل تسجيل الدخول باستخدام ${provider === 'google' ? 'جوجل' : 'فيسبوك'}`
      }));
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header title="إنشاء حساب جديد" />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="card">
            <h2 className="text-xl font-semibold mb-6 text-center">إنشاء حساب مريض جديد</h2>
            
            {errors.general && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {errors.general}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <Input
                label="الاسم الكامل"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="أدخل اسمك الكامل"
                required
                error={errors.name}
              />
              
              <Input
                label="البريد الإلكتروني"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="أدخل بريدك الإلكتروني"
                required
                error={errors.email}
              />
              
              <Input
                label="رقم الهاتف"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="أدخل رقم هاتفك"
                required
                error={errors.phone}
              />
              
              <Input
                label="كلمة المرور"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="أدخل كلمة المرور"
                required
                error={errors.password}
              />
              
              <Input
                label="تأكيد كلمة المرور"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="أعد إدخال كلمة المرور"
                required
                error={errors.confirmPassword}
              />
              
              <Button type="submit" variant="primary" fullWidth disabled={loading}>
                {loading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                لديك حساب بالفعل؟{' '}
                <Link to="/patient/login" className="text-primary-600 hover:text-primary-800">
                  تسجيل الدخول
                </Link>
              </p>
              
              <div className="mt-4">
                <Link to="/" className="text-sm text-gray-600 hover:text-gray-800">
                  العودة للصفحة الرئيسية
                </Link>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-4">أو إنشاء حساب باستخدام:</p>
              <div className="flex justify-center space-x-4 space-x-reverse">
                <button 
                  type="button"
                  onClick={() => handleSocialLogin('facebook')}
                  className="btn bg-blue-600 text-white hover:bg-blue-700"
                  disabled={loading}
                >
                  فيسبوك
                </button>
                <button 
                  type="button"
                  onClick={() => handleSocialLogin('google')}
                  className="btn bg-red-600 text-white hover:bg-red-700"
                  disabled={loading}
                >
                  جوجل
                </button>
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

export default RegisterPage;
