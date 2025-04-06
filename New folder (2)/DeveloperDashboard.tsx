import React, { useState } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import Input from '../components/Input';

const DeveloperDashboard: React.FC = () => {
  // Mock data - will be replaced with actual data from API
  const [appSettings, setAppSettings] = useState({
    primaryColor: '#0ea5e9',
    secondaryColor: '#14b8a6',
    logo: '/logo.png',
    clinicName: 'مركز فاطمة لطب الأسنان',
    contactInfo: {
      phone: '+966 50 123 4567',
      email: 'info@fatimadental.com',
      address: 'الرياض، المملكة العربية السعودية',
    }
  });

  const [formData, setFormData] = useState({
    primaryColor: appSettings.primaryColor,
    secondaryColor: appSettings.secondaryColor,
    clinicName: appSettings.clinicName,
    phone: appSettings.contactInfo.phone,
    email: appSettings.contactInfo.email,
    address: appSettings.contactInfo.address,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This will be implemented with actual API calls in later steps
    console.log('Saving settings:', formData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="لوحة تحكم المطور" subtitle="تخصيص وإدارة التطبيق" />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <section className="card mb-8">
              <h2 className="text-xl font-semibold mb-6">إعدادات التطبيق</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <Input
                    label="اسم المركز"
                    name="clinicName"
                    value={formData.clinicName}
                    onChange={handleChange}
                    required
                  />
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      شعار المركز
                    </label>
                    <div className="flex items-center">
                      <img 
                        src={appSettings.logo} 
                        alt="شعار المركز" 
                        className="w-16 h-16 object-contain border rounded mr-4"
                      />
                      <Button variant="outline" size="sm">تغيير الشعار</Button>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      اللون الرئيسي
                    </label>
                    <div className="flex items-center">
                      <input
                        type="color"
                        name="primaryColor"
                        value={formData.primaryColor}
                        onChange={handleChange}
                        className="w-10 h-10 border-0 p-0 mr-2"
                      />
                      <Input
                        label=""
                        name="primaryColor"
                        value={formData.primaryColor}
                        onChange={handleChange}
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
                        value={formData.secondaryColor}
                        onChange={handleChange}
                        className="w-10 h-10 border-0 p-0 mr-2"
                      />
                      <Input
                        label=""
                        name="secondaryColor"
                        value={formData.secondaryColor}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-medium mb-4">معلومات الاتصال</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <Input
                    label="رقم الهاتف"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  
                  <Input
                    label="البريد الإلكتروني"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <Input
                  label="العنوان"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
                
                <div className="mt-6 flex justify-end">
                  <Button type="submit" variant="primary">حفظ التغييرات</Button>
                </div>
              </form>
            </section>
            
            <section className="card">
              <h2 className="text-xl font-semibold mb-6">إدارة العيادات والأطباء</h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">إضافة عيادة جديدة</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="رقم العيادة"
                    type="number"
                    name="clinicNumber"
                    value=""
                    onChange={() => {}}
                    required
                  />
                  
                  <Input
                    label="اسم الطبيب"
                    name="doctorName"
                    value=""
                    onChange={() => {}}
                    required
                  />
                </div>
                
                <div className="mt-4">
                  <Button variant="primary" size="sm">إضافة عيادة</Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">إضافة طبيب جديد</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="اسم الطبيب"
                    name="newDoctorName"
                    value=""
                    onChange={() => {}}
                    required
                  />
                  
                  <Input
                    label="التخصص"
                    name="specialization"
                    value=""
                    onChange={() => {}}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Input
                    label="البريد الإلكتروني"
                    type="email"
                    name="doctorEmail"
                    value=""
                    onChange={() => {}}
                    required
                  />
                  
                  <Input
                    label="رقم الهاتف"
                    name="doctorPhone"
                    value=""
                    onChange={() => {}}
                    required
                  />
                </div>
                
                <div className="mt-4">
                  <Button variant="primary" size="sm">إضافة طبيب</Button>
                </div>
              </div>
            </section>
          </div>
          
          <div>
            <div className="card mb-6">
              <h2 className="text-xl font-semibold mb-4">معاينة التغييرات</h2>
              <div className="border rounded-md p-4 bg-gray-50">
                <div 
                  className="p-4 rounded-md mb-4" 
                  style={{ backgroundColor: formData.primaryColor, color: 'white' }}
                >
                  <h3 className="font-bold">اللون الرئيسي</h3>
                  <p>هذا مثال على استخدام اللون الرئيسي</p>
                </div>
                
                <div 
                  className="p-4 rounded-md mb-4" 
                  style={{ backgroundColor: formData.secondaryColor, color: 'white' }}
                >
                  <h3 className="font-bold">اللون الثانوي</h3>
                  <p>هذا مثال على استخدام اللون الثانوي</p>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h3 className="font-bold">{formData.clinicName}</h3>
                  <p>{formData.address}</p>
                  <p>{formData.phone}</p>
                  <p>{formData.email}</p>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" size="sm">معاينة التطبيق كاملاً</Button>
              </div>
            </div>
            
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">إدارة النظام</h2>
              <div className="space-y-3">
                <Button variant="primary" fullWidth>تحديث قاعدة البيانات</Button>
                <Button variant="secondary" fullWidth>إعادة تشغيل التطبيق</Button>
                <Button variant="outline" fullWidth>نسخ احتياطي للبيانات</Button>
                <Button variant="outline" fullWidth className="border-red-500 text-red-500 hover:bg-red-50">
                  إعادة ضبط المصنع
                </Button>
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

export default DeveloperDashboard;
