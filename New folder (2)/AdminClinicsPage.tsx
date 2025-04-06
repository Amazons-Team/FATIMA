import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import Input from '../components/Input';

const AdminClinicsPage: React.FC = () => {
  // Mock data for clinics
  const [clinics, setClinics] = useState([
    { id: 1, number: 1, doctorName: 'د. أحمد محمد', specialization: 'طب الأسنان العام', status: 'busy' },
    { id: 2, number: 2, doctorName: 'د. سارة علي', specialization: 'تقويم الأسنان', status: 'available' },
    { id: 3, number: 3, doctorName: 'د. محمد خالد', specialization: 'علاج العصب', status: 'busy' },
    { id: 4, number: 4, doctorName: 'د. فاطمة أحمد', specialization: 'طب أسنان الأطفال', status: 'available' },
    { id: 5, number: 5, doctorName: 'د. عمر حسن', specialization: 'زراعة الأسنان', status: 'unavailable' },
    { id: 6, number: 6, doctorName: 'د. ليلى محمود', specialization: 'جراحة الفم والأسنان', status: 'available' },
    { id: 7, number: 7, doctorName: 'د. خالد عبدالله', specialization: 'علاج اللثة', status: 'busy' },
    { id: 8, number: 8, doctorName: 'د. نورا سعيد', specialization: 'طب الأسنان التجميلي', status: 'available' },
    { id: 9, number: 9, doctorName: 'د. حسن علي', specialization: 'طب الأسنان الوقائي', status: 'unavailable' },
    { id: 10, number: 10, doctorName: 'د. سلمى أحمد', specialization: 'تبييض الأسنان', status: 'available' },
    { id: 11, number: 11, doctorName: 'د. ياسر محمد', specialization: 'طب الأسنان العام', status: 'busy' },
    { id: 12, number: 12, doctorName: 'د. رنا خالد', specialization: 'تقويم الأسنان', status: 'available' },
    { id: 13, number: 13, doctorName: 'د. عمرو سامي', specialization: 'علاج العصب', status: 'unavailable' },
    { id: 14, number: 14, doctorName: 'د. دينا محمود', specialization: 'طب أسنان الأطفال', status: 'available' },
    { id: 15, number: 15, doctorName: 'د. أيمن حسن', specialization: 'زراعة الأسنان', status: 'busy' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedClinic, setSelectedClinic] = useState<number | null>(null);
  
  // Mock data for doctors (for assigning to clinics)
  const doctors = [
    { id: 1, name: 'د. أحمد محمد', specialization: 'طب الأسنان العام' },
    { id: 2, name: 'د. سارة علي', specialization: 'تقويم الأسنان' },
    { id: 3, name: 'د. محمد خالد', specialization: 'علاج العصب' },
    { id: 4, name: 'د. فاطمة أحمد', specialization: 'طب أسنان الأطفال' },
    { id: 5, name: 'د. عمر حسن', specialization: 'زراعة الأسنان' },
    { id: 6, name: 'د. ليلى محمود', specialization: 'جراحة الفم والأسنان' },
    { id: 7, name: 'د. خالد عبدالله', specialization: 'علاج اللثة' },
    { id: 8, name: 'د. نورا سعيد', specialization: 'طب الأسنان التجميلي' },
    { id: 9, name: 'د. حسن علي', specialization: 'طب الأسنان الوقائي' },
    { id: 10, name: 'د. سلمى أحمد', specialization: 'تبييض الأسنان' },
  ];
  
  const [editForm, setEditForm] = useState({
    doctorId: '',
    status: ''
  });
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
  };
  
  const handleEditClinic = (clinicId: number) => {
    const clinic = clinics.find(c => c.id === clinicId);
    if (clinic) {
      const doctorId = doctors.find(d => d.name === clinic.doctorName)?.id.toString() || '';
      setEditForm({
        doctorId,
        status: clinic.status
      });
      setSelectedClinic(clinicId);
    }
  };
  
  const handleFormChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSaveChanges = () => {
    if (selectedClinic) {
      setClinics(clinics.map(clinic => {
        if (clinic.id === selectedClinic) {
          const selectedDoctor = doctors.find(d => d.id.toString() === editForm.doctorId);
          return {
            ...clinic,
            doctorName: selectedDoctor ? selectedDoctor.name : clinic.doctorName,
            specialization: selectedDoctor ? selectedDoctor.specialization : clinic.specialization,
            status: editForm.status as 'available' | 'busy' | 'unavailable'
          };
        }
        return clinic;
      }));
      
      // Reset selection
      setSelectedClinic(null);
    }
  };
  
  const filteredClinics = clinics.filter(clinic => {
    // Filter by search term
    const matchesSearch = 
      clinic.number.toString().includes(searchTerm) ||
      clinic.doctorName.includes(searchTerm) ||
      clinic.specialization.includes(searchTerm);
    
    // Filter by status
    const matchesStatus = 
      statusFilter === 'all' || 
      clinic.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const selectedClinicData = clinics.find(c => c.id === selectedClinic);

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="إدارة العيادات" subtitle="عرض وإدارة عيادات المركز" />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="relative w-full md:w-auto">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input
                type="search"
                className="input pr-10 w-full md:w-64"
                placeholder="البحث عن عيادة..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            <div className="flex space-x-2 space-x-reverse">
              <button 
                className={`px-4 py-2 rounded-md ${statusFilter === 'all' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => handleStatusFilterChange('all')}
              >
                الكل
              </button>
              <button 
                className={`px-4 py-2 rounded-md ${statusFilter === 'available' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => handleStatusFilterChange('available')}
              >
                متاح
              </button>
              <button 
                className={`px-4 py-2 rounded-md ${statusFilter === 'busy' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => handleStatusFilterChange('busy')}
              >
                مشغول
              </button>
              <button 
                className={`px-4 py-2 rounded-md ${statusFilter === 'unavailable' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => handleStatusFilterChange('unavailable')}
              >
                غير متاح
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="card">
                <h2 className="text-xl font-semibold mb-4">قائمة العيادات</h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2 text-right">رقم العيادة</th>
                        <th className="border p-2 text-right">الطبيب</th>
                        <th className="border p-2 text-right">التخصص</th>
                        <th className="border p-2 text-right">الحالة</th>
                        <th className="border p-2 text-right">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredClinics.map(clinic => (
                        <tr key={clinic.id} className="hover:bg-gray-50">
                          <td className="border p-2 font-medium">{clinic.number}</td>
                          <td className="border p-2">{clinic.doctorName}</td>
                          <td className="border p-2">{clinic.specialization}</td>
                          <td className="border p-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              clinic.status === 'available' ? 'bg-green-100 text-green-800' :
                              clinic.status === 'busy' ? 'bg-amber-100 text-amber-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {clinic.status === 'available' ? 'متاح' :
                               clinic.status === 'busy' ? 'مشغول' : 'غير متاح'}
                            </span>
                          </td>
                          <td className="border p-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditClinic(clinic.id)}
                            >
                              تعديل
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              {selectedClinicData ? (
                <div className="card h-full">
                  <h2 className="text-xl font-semibold mb-4">
                    تعديل العيادة رقم {selectedClinicData.number}
                  </h2>
                  
                  <div className="mb-4">
                    <label htmlFor="doctorId" className="block text-sm font-medium text-gray-700 mb-1">
                      الطبيب المسؤول
                    </label>
                    <select
                      id="doctorId"
                      name="doctorId"
                      value={editForm.doctorId}
                      onChange={handleFormChange}
                      className="input"
                    >
                      <option value="">-- اختر الطبيب --</option>
                      {doctors.map(doctor => (
                        <option key={doctor.id} value={doctor.id}>
                          {doctor.name} - {doctor.specialization}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                      حالة العيادة
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={editForm.status}
                      onChange={handleFormChange}
                      className="input"
                    >
                      <option value="available">متاح</option>
                      <option value="busy">مشغول</option>
                      <option value="unavailable">غير متاح</option>
                    </select>
                  </div>
                  
                  <div className="flex justify-end space-x-2 space-x-reverse">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedClinic(null)}
                    >
                      إلغاء
                    </Button>
                    <Button
                      variant="primary"
                      onClick={handleSaveChanges}
                    >
                      حفظ التغييرات
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="card h-full flex items-center justify-center">
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-gray-700 mb-2">اختر عيادة للتعديل</h3>
                    <p className="text-gray-500">
                      اختر عيادة من القائمة لتعديل بياناتها
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link to="/admin/dashboard">
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

export default AdminClinicsPage;
