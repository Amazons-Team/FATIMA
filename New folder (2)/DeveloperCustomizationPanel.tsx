import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import ResponsiveHeader from '../components/ResponsiveHeader';
import { useAuth } from '../contexts/AuthContext';

interface AppSettings {
  primaryColor: string;
  secondaryColor: string;
  logoUrl: string;
  clinicName: string;
  clinicAddress: string;
  clinicPhone: string;
  clinicEmail: string;
  welcomeMessage: string;
  footerText: string;
  enableSocialLogin: boolean;
  enableNotifications: boolean;
  maxAppointmentsPerDay: number;
  workingHoursStart: string;
  workingHoursEnd: string;
  workingDays: string[];
}

const CustomizationPanel: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'general' | 'appearance' | 'appointments' | 'advanced'>('general');
  
  // Initial settings (would normally be loaded from backend)
  const [settings, setSettings] = useState<AppSettings>({
    primaryColor: '#3b82f6',
    secondaryColor: '#10b981',
    logoUrl: '/logo.png',
    clinicName: 'مركز فاطمة لطب الأسنان',
    clinicAddress: 'شارع الملك فهد، الرياض، المملكة العربية السعودية',
    clinicPhone: '+966 11 234 5678',
    clinicEmail: 'info@fatimadental.com',
    welcomeMessage: 'مرحباً بكم في مركز فاطمة لطب الأسنان، نسعى دائماً لتقديم أفضل خدمات طب الأسنان',
    footerText: 'جميع الحقوق محفوظة © 2025 - مركز فاطمة لطب الأسنان',
    enableSocialLogin: true,
    enableNotifications: true,
    maxAppointmentsPerDay: 50,
    workingHoursStart: '09:00',
    workingHoursEnd: '17:00',
    workingDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
  });
  
  // Preview state
  const [previewMode, setPreviewMode] = useState(false);
  
  // Form state
  const [formValues, setFormValues] = useState<AppSettings>(settings);
  
  // Update form values when settings change
  useEffect(() => {
    setFormValues(settings);
  }, [settings]);
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };
  
  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    setFormValues(prev => ({
      ...prev,
      [name]: checked,
    }));
  };
  
  // Handle working days changes
  const handleWorkingDayToggle = (day: string) => {
    setFormValues(prev => {
      const workingDays = [...prev.workingDays];
      
      if (workingDays.includes(day)) {
        return {
          ...prev,
          workingDays: workingDays.filter(d => d !== day),
        };
      } else {
        return {
          ...prev,
          workingDays: [...workingDays, day],
        };
      }
    });
  };
  
  // Save settings
  const handleSaveSettings = () => {
    setSettings(formValues);
    alert('تم حفظ الإعدادات بنجاح');
    
    // In a real application, we would save to backend here
    // saveSettingsToBackend(formValues);
  };
  
  // Apply settings to preview
  const applySettingsToPreview = () => {
    // Apply CSS variables
    document.documentElement.style.setProperty('--primary-color', formValues.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', formValues.secondaryColor);
    
    setPreviewMode(true);
  };
  
  // Reset preview
  const resetPreview = () => {
    document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', settings.secondaryColor);
    
    setPreviewMode(false);
    setFormValues(settings);
  };
  
  // Check if user has developer role
  if (user?.role !== 'developer') {
    return (
      <div className="min-h-screen flex flex-col">
        <ResponsiveHeader title="لوحة التخصيص" subtitle="تخصيص إعدادات التطبيق" />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <Card className="max-w-lg mx-auto text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-danger-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-xl font-bold mb-2">غير مصرح بالوصول</h2>
            <p className="text-gray-600 mb-6">
              عذراً، هذه الصفحة متاحة فقط للمستخدمين بصلاحيات المطور.
            </p>
            <Button variant="primary" onClick={() => window.history.back()}>
              العودة للصفحة السابقة
            </Button>
          </Card>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <ResponsiveHeader title="لوحة التخصيص" subtitle="تخصيص إعدادات التطبيق" />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Sidebar */}
              <div className="w-full md:w-64 bg-gray-50 p-4">
                <h2 className="text-lg font-semibold mb-4">الإعدادات</h2>
                <nav className="space-y-1">
                  <button
                    className={`w-full text-right px-3 py-2 rounded-md ${
                      activeTab === 'general' ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('general')}
                  >
                    الإعدادات العامة
                  </button>
                  <button
                    className={`w-full text-right px-3 py-2 rounded-md ${
                      activeTab === 'appearance' ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('appearance')}
                  >
                    المظهر والألوان
                  </button>
                  <button
                    className={`w-full text-right px-3 py-2 rounded-md ${
                      activeTab === 'appointments' ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('appointments')}
                  >
                    إعدادات المواعيد
                  </button>
                  <button
                    className={`w-full text-right px-3 py-2 rounded-md ${
                      activeTab === 'advanced' ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('advanced')}
                  >
                    إعدادات متقدمة
                  </button>
                </nav>
                
                <div className="mt-8 space-y-3">
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={applySettingsToPreview}
                  >
                    معاينة التغييرات
                  </Button>
                  
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={resetPreview}
                    disabled={!previewMode}
                  >
                    إلغاء المعاينة
                  </Button>
                  
                  <Button
                    variant="secondary"
                    fullWidth
                    onClick={handleSaveSettings}
                  >
                    حفظ الإعدادات
                  </Button>
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 p-6">
                {/* General Settings */}
                {activeTab === 'general' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6">الإعدادات العامة</h2>
                    
                    <div className="space-y-4">
                      <Input
                        label="اسم المركز"
                        name="clinicName"
                        value={formValues.clinicName}
                        onChange={handleInputChange}
                        required
                      />
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          عنوان المركز
                        </label>
                        <textarea
                          name="clinicAddress"
                          value={formValues.clinicAddress}
                          onChange={handleInputChange}
                          className="input"
                          rows={2}
                        ></textarea>
                      </div>
                      
                      <Input
                        label="رقم الهاتف"
                        name="clinicPhone"
                        value={formValues.clinicPhone}
                        onChange={handleInputChange}
                      />
                      
                      <Input
                        label="البريد الإلكتروني"
                        name="clinicEmail"
                        type="email"
                        value={formValues.clinicEmail}
                        onChange={handleInputChange}
                      />
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          رسالة الترحيب
                        </label>
                        <textarea
                          name="welcomeMessage"
                          value={formValues.welcomeMessage}
                          onChange={handleInputChange}
                          className="input"
                          rows={3}
                        ></textarea>
                      </div>
                      
                      <Input
                        label="نص التذييل"
                        name="footerText"
                        value={formValues.footerText}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                )}
                
                {/* Appearance Settings */}
                {activeTab === 'appearance' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6">المظهر والألوان</h2>
                    
                    <div className="space-y-4">
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          اللون الرئيسي
                        </label>
                        <div className="flex items-center">
                          <input
                            type="color"
                            name="primaryColor"
                            value={formValues.primaryColor}
                            onChange={handleInputChange}
                            className="h-10 w-10 border border-gray-300 rounded mr-2"
                          />
                          <input
                            type="text"
                            name="primaryColor"
                            value={formValues.primaryColor}
                            onChange={handleInputChange}
                            className="input"
                          />
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          اللون الثانوي
                        </label>
                        <div className="flex items-center">
                          <input
                            type="color"
                            name="secondaryColor"
                            value={formValues.secondaryColor}
                            onChange={handleInputChange}
                            className="h-10 w-10 border border-gray-300 rounded mr-2"
                          />
                          <input
                            type="text"
                            name="secondaryColor"
                            value={formValues.secondaryColor}
                            onChange={handleInputChange}
                            className="input"
                          />
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          رابط الشعار
                        </label>
                        <div className="flex items-center">
                          <input
                            type="text"
                            name="logoUrl"
                            value={formValues.logoUrl}
                            onChange={handleInputChange}
                            className="input"
                          />
                          <button
                            type="button"
                            className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                          >
                            استعراض
                          </button>
                        </div>
                      </div>
                      
                      <div className="mt-8">
                        <h3 className="text-lg font-medium mb-4">معاينة الألوان</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 rounded-md text-white" style={{ backgroundColor: formValues.primaryColor }}>
                            اللون الرئيسي
                          </div>
                          <div className="p-4 rounded-md text-white" style={{ backgroundColor: formValues.secondaryColor }}>
                            اللون الثانوي
                          </div>
                          <div className="p-4 rounded-md text-white bg-primary-500">
                            زر رئيسي
                          </div>
                          <div className="p-4 rounded-md text-white bg-secondary-500">
                            زر ثانوي
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Appointment Settings */}
                {activeTab === 'appointments' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6">إعدادات المواعيد</h2>
                    
                    <div className="space-y-4">
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          الحد الأقصى للمواعيد في اليوم
                        </label>
                        <input
                          type="number"
                          name="maxAppointmentsPerDay"
                          value={formValues.maxAppointmentsPerDay}
                          onChange={handleInputChange}
                          min="1"
                          max="100"
             
(Content truncated due to size limit. Use line ranges to read in chunks)