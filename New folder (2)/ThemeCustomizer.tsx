import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import ResponsiveHeader from '../components/ResponsiveHeader';
import { useAuth } from '../contexts/AuthContext';

interface ThemeSettings {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
}

const ThemeCustomizer: React.FC = () => {
  const { user } = useAuth();
  
  // Predefined themes
  const predefinedThemes: ThemeSettings[] = [
    {
      name: 'الافتراضي',
      primaryColor: '#3b82f6',
      secondaryColor: '#10b981',
      accentColor: '#f59e0b',
      backgroundColor: '#f9fafb',
      textColor: '#1f2937',
      fontFamily: 'Cairo, Tajawal, sans-serif',
    },
    {
      name: 'داكن',
      primaryColor: '#2563eb',
      secondaryColor: '#059669',
      accentColor: '#d97706',
      backgroundColor: '#1f2937',
      textColor: '#f9fafb',
      fontFamily: 'Cairo, Tajawal, sans-serif',
    },
    {
      name: 'هادئ',
      primaryColor: '#0ea5e9',
      secondaryColor: '#14b8a6',
      accentColor: '#f97316',
      backgroundColor: '#f0f9ff',
      textColor: '#0f172a',
      fontFamily: 'Tajawal, Cairo, sans-serif',
    },
    {
      name: 'دافئ',
      primaryColor: '#e11d48',
      secondaryColor: '#f97316',
      accentColor: '#eab308',
      backgroundColor: '#fff7ed',
      textColor: '#422006',
      fontFamily: 'Cairo, Tajawal, sans-serif',
    },
  ];
  
  // State for current theme
  const [currentTheme, setCurrentTheme] = useState<ThemeSettings>(predefinedThemes[0]);
  const [customTheme, setCustomTheme] = useState<ThemeSettings>({...predefinedThemes[0]});
  const [isCustomTheme, setIsCustomTheme] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  
  // Apply theme to document
  const applyTheme = (theme: ThemeSettings) => {
    document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
    document.documentElement.style.setProperty('--primary-dark', adjustColor(theme.primaryColor, -20));
    document.documentElement.style.setProperty('--primary-light', adjustColor(theme.primaryColor, 20));
    
    document.documentElement.style.setProperty('--secondary-color', theme.secondaryColor);
    document.documentElement.style.setProperty('--secondary-dark', adjustColor(theme.secondaryColor, -20));
    document.documentElement.style.setProperty('--secondary-light', adjustColor(theme.secondaryColor, 20));
    
    document.documentElement.style.setProperty('--background-color', theme.backgroundColor);
    document.documentElement.style.setProperty('--text-color', theme.textColor);
    
    document.body.style.fontFamily = theme.fontFamily;
  };
  
  // Helper function to adjust color brightness
  const adjustColor = (color: string, amount: number): string => {
    return color; // Simplified for this example
  };
  
  // Handle theme selection
  const handleThemeSelect = (theme: ThemeSettings) => {
    setCurrentTheme(theme);
    setIsCustomTheme(false);
    
    if (previewMode) {
      applyTheme(theme);
    }
  };
  
  // Handle custom theme changes
  const handleCustomThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setCustomTheme(prev => ({
      ...prev,
      [name]: value,
    }));
    
    setIsCustomTheme(true);
    
    if (previewMode) {
      applyTheme({
        ...customTheme,
        [name]: value,
      });
    }
  };
  
  // Toggle preview mode
  const togglePreviewMode = () => {
    if (!previewMode) {
      // Enter preview mode
      applyTheme(isCustomTheme ? customTheme : currentTheme);
      setPreviewMode(true);
    } else {
      // Exit preview mode
      applyTheme(predefinedThemes[0]); // Reset to default
      setPreviewMode(false);
    }
  };
  
  // Save theme
  const saveTheme = () => {
    const themeToSave = isCustomTheme ? customTheme : currentTheme;
    
    // In a real app, we would save to backend here
    // saveThemeToBackend(themeToSave);
    
    alert('تم حفظ السمة بنجاح');
    applyTheme(themeToSave);
  };
  
  // Check if user has developer role
  if (user?.role !== 'developer') {
    return (
      <div className="min-h-screen flex flex-col">
        <ResponsiveHeader title="مخصص السمات" subtitle="تخصيص مظهر التطبيق" />
        
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
      <ResponsiveHeader title="مخصص السمات" subtitle="تخصيص مظهر التطبيق" />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Card>
            <h2 className="text-xl font-semibold mb-6">تخصيص سمة التطبيق</h2>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">السمات المتاحة</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {predefinedThemes.map((theme, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      currentTheme.name === theme.name && !isCustomTheme
                        ? 'border-primary-500 ring-2 ring-primary-200'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleThemeSelect(theme)}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium">{theme.name}</h4>
                      {currentTheme.name === theme.name && !isCustomTheme && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="h-6 rounded" style={{ backgroundColor: theme.primaryColor }}></div>
                      <div className="h-6 rounded" style={{ backgroundColor: theme.secondaryColor }}></div>
                      <div className="h-6 rounded" style={{ backgroundColor: theme.accentColor }}></div>
                    </div>
                    <div className="flex justify-between">
                      <div className="h-6 w-6 rounded" style={{ backgroundColor: theme.backgroundColor }}></div>
                      <div className="h-6 w-6 rounded" style={{ backgroundColor: theme.textColor }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">تخصيص سمة مخصصة</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Input
                    label="اسم السمة"
                    name="name"
                    value={customTheme.name}
                    onChange={handleCustomThemeChange}
                  />
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      اللون الرئيسي
                    </label>
                    <div className="flex items-center">
                      <input
                        type="color"
                        name="primaryColor"
                        value={customTheme.primaryColor}
                        onChange={handleCustomThemeChange}
                        className="h-10 w-10 border border-gray-300 rounded mr-2"
                      />
                      <input
                        type="text"
                        name="primaryColor"
                        value={customTheme.primaryColor}
                        onChange={handleCustomThemeChange}
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
                        value={customTheme.secondaryColor}
                        onChange={handleCustomThemeChange}
                        className="h-10 w-10 border border-gray-300 rounded mr-2"
                      />
                      <input
                        type="text"
                        name="secondaryColor"
                        value={customTheme.secondaryColor}
                        onChange={handleCustomThemeChange}
                        className="input"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      لون التمييز
                    </label>
                    <div className="flex items-center">
                      <input
                        type="color"
                        name="accentColor"
                        value={customTheme.accentColor}
                        onChange={handleCustomThemeChange}
                        className="h-10 w-10 border border-gray-300 rounded mr-2"
                      />
                      <input
                        type="text"
                        name="accentColor"
                        value={customTheme.accentColor}
                        onChange={handleCustomThemeChange}
                        className="input"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      لون الخلفية
                    </label>
                    <div className="flex items-center">
                      <input
                        type="color"
                        name="backgroundColor"
                        value={customTheme.backgroundColor}
                        onChange={handleCustomThemeChange}
                        className="h-10 w-10 border border-gray-300 rounded mr-2"
                      />
                      <input
                        type="text"
                        name="backgroundColor"
                        value={customTheme.backgroundColor}
                        onChange={handleCustomThemeChange}
                        className="input"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      لون النص
                    </label>
                    <div className="flex items-center">
                      <input
                        type="color"
                        name="textColor"
                        value={customTheme.textColor}
                        onChange={handleCustomThemeChange}
                        className="h-10 w-10 border border-gray-300 rounded mr-2"
                      />
                      <input
                        type="text"
                        name="textColor"
                        value={customTheme.textColor}
                        onChange={handleCustomThemeChange}
                        className="input"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      الخط
                    </label>
                    <select
                      name="fontFamily"
                      value={customTheme.fontFamily}
                      onChange={(e) => {
                        setCustomTheme(prev => ({
                          ...prev,
                          fontFamily: e.target.value,
                        }));
                        setIsCustomTheme(true);
                      }}
                      className="input"
                    >
                      <option value="Cairo, Tajawal, sans-serif">Cairo</option>
                      <option value="Tajawal, Cairo, sans-serif">Tajawal</option>
                      <option value="Almarai, Cairo, sans-serif">Almarai</option>
                      <option value="Amiri, Cairo, sans-serif">Amiri</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-md font-medium mb-3">معاينة السمة المخصصة</h4>
                <div className="border rounded-lg p-6" style={{
                  backgroundColor: customTheme.backgroundColor,
                  color: customTheme.textColor,
                }}>
                  <h5 className="text-lg font-bold mb-2" style={{ color: customTheme.textColor }}>
                    معاينة النص والألوان
                  </h5>
                  <p className="mb-4" style={{ color: customTheme.textColor }}>
                    هذا نص توضيحي لمعاينة شكل النصوص باستخدام السمة المخصصة. يمكنك رؤية كيف ستظهر النصوص والألوان في التطبيق.
                  </p>
                  <div className="flex space-x-2 space-x-reverse">
                    <button className="px-4 py-2 rounded-md text-white" style={{ backgroundColor: customTheme.primaryColor }}>
                      زر رئيسي
                    </button>
                    <button className="px-4 py-2 rounded-md text-white" style={{ backgroundColor: customTheme.secondaryColor }}>
                      زر ثانوي
                    </button>
                    <button className="px-4 py-2 rounded-md text-white" style={{ backgroundColor: customTheme.accentColor }}>
                      زر تمييز
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => window.history.back()}
              >
                العودة
              </Button>
              
              <div className="flex space-x-2 space-x-reverse">
                <Button
                 
(Content truncated due to size limit. Use line ranges to read in chunks)