import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC<{ userType: 'patient' | 'doctor' | 'admin' | 'developer' }> = ({ userType }) => {
  const navigate = useNavigate();
  const { login, loginWithSocial, loading } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState({
    email: '',
    password: '',
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
    
    // Simple validation
    const newErrors = {
      email: !formData.email ? 'البريد الإلكتروني مطلوب' : '',
      password: !formData.password ? 'كلمة المرور مطلوبة' : '',
      general: '',
    };
    
    setErrors(newErrors);
    
    // If no errors, proceed with login
    if (!newErrors.email && !newErrors.password) {
      const success = await login(formData.email, formData.password);
      
      if (success) {
        // Redirect based on user type
        switch (userType) {
          case 'patient':
            navigate('/patient/dashboard');
            break;
          case 'doctor':
            navigate('/doctor/dashboard');
            break;
          case 'admin':
            navigate('/admin/dashboard');
            break;
          case 'developer':
            navigate('/developer/dashboard');
            break;
        }
      } else {
        setErrors(prev => ({
          ...prev,
          general: 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
        }));
      }
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
  
  const getTitleByUserType = () => {
    switch (userType) {
      case 'patient': return 'تسجيل دخول المريض';
      case 'doctor': return 'تسجيل دخول الطبيب';
      case 'admin': return 'تسجيل دخول الإدارة';
      case 'developer': return 'تسجيل دخول المطور';
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header title={getTitleByUserType()} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="card">
            <h2 className="text-xl font-semibold mb-6 text-center">{getTitleByUserType()}</h2>
            
            {errors.general && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {errors.general}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
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
                label="كلمة المرور"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="أدخل كلمة المرور"
                required
                error={errors.password}
              />
              
              <div className="mb-4 text-left">
                <Link to="/forgot-password" className="text-sm text-primary-600 hover:text-primary-800">
                  نسيت كلمة المرور؟
                </Link>
              </div>
              
              <Button type="submit" variant="primary" fullWidth disabled={loading}>
                {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {userType === 'patient' && 'ليس لديك حساب؟ '}
                {userType === 'patient' && (
                  <Link to="/patient/register" className="text-primary-600 hover:text-primary-800">
                    إنشاء حساب جديد
                  </Link>
                )}
              </p>
              
              <div className="mt-4">
                <Link to="/" className="text-sm text-gray-600 hover:text-gray-800">
                  العودة للصفحة الرئيسية
                </Link>
              </div>
            </div>
            
            {userType === 'patient' && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-4">أو تسجيل الدخول باستخدام:</p>
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

export default LoginPage;
