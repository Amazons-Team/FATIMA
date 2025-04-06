import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import Input from '../components/Input';

const DoctorPatientsPage: React.FC = () => {
  // Mock data for patients
  const [patients, setPatients] = useState([
    { 
      id: 'P001', 
      name: 'محمد أحمد', 
      phone: '+966 50 123 4567', 
      email: 'mohammed@example.com',
      lastVisit: '2025-03-25',
      nextAppointment: '2025-04-10',
      medicalHistory: 'لا توجد أمراض مزمنة',
      allergies: 'حساسية من البنسلين'
    },
    { 
      id: 'P002', 
      name: 'فاطمة علي', 
      phone: '+966 50 987 6543', 
      email: 'fatima@example.com',
      lastVisit: '2025-03-20',
      nextAppointment: '2025-04-15',
      medicalHistory: 'ضغط دم مرتفع',
      allergies: 'لا توجد'
    },
    { 
      id: 'P003', 
      name: 'أحمد خالد', 
      phone: '+966 50 111 2222', 
      email: 'ahmed@example.com',
      lastVisit: '2025-02-15',
      nextAppointment: null,
      medicalHistory: 'سكري',
      allergies: 'لا توجد'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredPatients = patients.filter(patient => 
    patient.name.includes(searchTerm) || 
    patient.id.includes(searchTerm) ||
    patient.phone.includes(searchTerm) ||
    patient.email.includes(searchTerm)
  );
  
  const selectedPatientData = patients.find(p => p.id === selectedPatient);
  
  const handleAddNotes = () => {
    if (notes.trim() && selectedPatient) {
      // In a real app, this would send the notes to an API
      console.log(`Adding notes for patient ${selectedPatient}: ${notes}`);
      setNotes('');
      // Show success message or update UI as needed
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="إدارة المرضى" subtitle="عرض وإدارة بيانات المرضى" />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input
                type="search"
                className="input pr-10"
                placeholder="البحث عن مريض بالاسم أو رقم الهاتف..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="card h-full">
                <h2 className="text-xl font-semibold mb-4">قائمة المرضى</h2>
                
                {filteredPatients.length > 0 ? (
                  <div className="space-y-3 max-h-[600px] overflow-y-auto">
                    {filteredPatients.map(patient => (
                      <div 
                        key={patient.id}
                        className={`p-3 border rounded-md cursor-pointer transition-colors ${
                          selectedPatient === patient.id ? 'bg-primary-50 border-primary-500' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedPatient(patient.id)}
                      >
                        <div className="font-medium">{patient.name}</div>
                        <div className="text-sm text-gray-600">رقم المريض: {patient.id}</div>
                        <div className="text-sm text-gray-600">{patient.phone}</div>
                        {patient.nextAppointment && (
                          <div className="text-xs mt-1 text-primary-600">
                            الموعد القادم: {patient.nextAppointment}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    لا توجد نتائج مطابقة للبحث
                  </div>
                )}
              </div>
            </div>
            
            <div className="lg:col-span-2">
              {selectedPatientData ? (
                <div>
                  <div className="card mb-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-xl font-semibold">{selectedPatientData.name}</h2>
                        <div className="text-gray-600">رقم المريض: {selectedPatientData.id}</div>
                      </div>
                      <div className="flex space-x-2 space-x-reverse">
                        <Button variant="outline" size="sm">
                          <Link to={`/doctor/chat?patient=${selectedPatientData.id}`}>
                            التواصل مع المريض
                          </Link>
                        </Button>
                        <Button variant="primary" size="sm">
                          <Link to={`/doctor/appointments?patient=${selectedPatientData.id}`}>
                            عرض المواعيد
                          </Link>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">معلومات الاتصال</h3>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <span className="text-gray-600 ml-2">الهاتف:</span>
                            <span>{selectedPatientData.phone}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-600 ml-2">البريد الإلكتروني:</span>
                            <span>{selectedPatientData.email}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">المواعيد</h3>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <span className="text-gray-600 ml-2">آخر زيارة:</span>
                            <span>{selectedPatientData.lastVisit}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-600 ml-2">الموعد القادم:</span>
                            <span>{selectedPatientData.nextAppointment || 'لا يوجد'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">التاريخ الطبي</h3>
                      <p className="p-3 bg-gray-50 rounded-md">{selectedPatientData.medicalHistory}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">الحساسية من الأدوية</h3>
                      <p className="p-3 bg-gray-50 rounded-md">{selectedPatientData.allergies}</p>
                    </div>
                  </div>
                  
                  <div className="card">
                    <h2 className="text-xl font-semibold mb-4">إضافة ملاحظات</h2>
                    
                    <div className="mb-4">
                      <textarea
                        rows={4}
                        className="input"
                        placeholder="أضف ملاحظات طبية أو تعليقات حول حالة المريض..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      ></textarea>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        variant="primary"
                        onClick={handleAddNotes}
                        disabled={!notes.trim()}
                      >
                        إضافة ملاحظات
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card h-full flex items-center justify-center">
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-gray-700 mb-2">اختر مريضاً من القائمة</h3>
                    <p className="text-gray-500">
                      اختر مريضاً لعرض معلوماته وإدارة ملفه الطبي
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link to="/doctor/dashboard">
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

export default DoctorPatientsPage;
