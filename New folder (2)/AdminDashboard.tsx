import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  
  // Mock data for dashboard
  const todayAppointments = 12;
  const totalDoctors = 15;
  const totalPatients = 120;
  const pendingRequests = 3;
  
  // Mock data for clinics
  const clinics = [
    { id: 1, number: 1, doctorName: 'د. أحمد محمد', specialization: 'طب الأسنان العام', status: 'busy' },
    { id: 2, number: 2, doctorName: 'د. سارة علي', specialization: 'تقويم الأسنان', status: 'available' },
    { id: 3, number: 3, doctorName: 'د. محمد خالد', specialization: 'علاج العصب', status: 'busy' },
    { id: 4, number: 4, doctorName: 'د. فاطمة أحمد', specialization: 'طب أسنان الأطفال', status: 'available' },
    { id: 5, number: 5, doctorName: 'د. عمر حسن', specialization: 'زراعة الأسنان', status: 'unavailable' },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header title="لوحة تحكم الإدارة" subtitle="مرحباً بك في مركز فاطمة لطب الأسنان" />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="card mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold mb-2">مرحباً، {user?.name}</h2>
                <p className="text-gray-600">مدير الاستعلامات | مركز فاطمة لطب الأسنان</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button variant="outline" onClick={logout}>تسجيل الخروج</Button>
              </div>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="card bg-blue-50 border-blue-200">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 ml-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-700">مواعيد اليوم</h3>
                  <p className="text-2xl font-bold text-blue-800">{todayAppointments}</p>
                </div>
              </div>
              <div className="mt-4">
                <Link to="/admin/appointments">
                  <Button variant="secondary" fullWidth>إدارة المواعيد</Button>
                </Link>
              </div>
            </div>
            
            <div className="card bg-green-50 border-green-200">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 ml-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-700">المرضى</h3>
                  <p className="text-2xl font-bold text-green-800">{totalPatients}</p>
                </div>
              </div>
              <div className="mt-4">
                <Link to="/admin/patients">
                  <Button variant="secondary" fullWidth>إدارة المرضى</Button>
                </Link>
              </div>
            </div>
            
            <div className="card bg-purple-50 border-purple-200">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 ml-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-700">الأطباء</h3>
                  <p className="text-2xl font-bold text-purple-800">{totalDoctors}</p>
                </div>
              </div>
              <div className="mt-4">
                <Link to="/admin/doctors">
                  <Button variant="secondary" fullWidth>إدارة الأطباء</Button>
                </Link>
              </div>
            </div>
            
            <div className="card bg-amber-50 border-amber-200">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 ml-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-amber-700">طلبات معلقة</h3>
                  <p className="text-2xl font-bold text-amber-800">{pendingRequests}</p>
                </div>
              </div>
              <div className="mt-4">
                <Link to="/admin/requests">
                  <Button variant="secondary" fullWidth>عرض الطلبات</Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Clinic Status */}
          <div className="card mb-6">
            <h2 className="text-xl font-semibold mb-4">حالة العيادات</h2>
            
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
                  {clinics.map(clinic => (
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
                        <Link to={`/admin/clinics/${clinic.id}`}>
                          <Button variant="outline" size="sm">
                            إدارة
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 text-center">
              <Link to="/admin/clinics">
                <Button variant="outline">إدارة جميع العيادات</Button>
              </Link>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">إجراءات سريعة</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/admin/appointments/new">
                <Button variant="primary" fullWidth>
                  إضافة موعد جديد
                </Button>
              </Link>
              
              <Link to="/admin/patients/new">
                <Button variant="primary" fullWidth>
                  تسجيل مريض جديد
                </Button>
              </Link>
              
              <Link to="/admin/chat">
                <Button variant="primary" fullWidth>
                  التواصل مع المرضى والأطباء
                </Button>
              </Link>
              
              <Link to="/admin/reports">
                <Button variant="primary" fullWidth>
                  تقارير وإحصائيات
                </Button>
              </Link>
              
              <Link to="/admin/settings">
                <Button variant="primary" fullWidth>
                  إعدادات المركز
                </Button>
              </Link>
              
              <Link to="/admin/users">
                <Button variant="primary" fullWidth>
                  إدارة المستخدمين
                </Button>
              </Link>
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

export default AdminDashboard;
