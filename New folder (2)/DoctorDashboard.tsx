import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';

const DoctorDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  
  // Mock data for dashboard
  const todayAppointments = [
    { id: '1', patientName: 'محمد أحمد', time: '10:00 ص', type: 'كشف' },
    { id: '2', patientName: 'فاطمة علي', time: '11:30 ص', type: 'علاج' },
    { id: '3', patientName: 'أحمد خالد', time: '01:00 م', type: 'متابعة' },
  ];
  
  const unreadMessages = 3;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header title="لوحة تحكم الطبيب" subtitle="مرحباً بك في مركز فاطمة لطب الأسنان" />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="card mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold mb-2">مرحباً، {user?.name}</h2>
                <p className="text-gray-600">العيادة رقم: 3 | التخصص: طب الأسنان العام</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button variant="outline" onClick={logout}>تسجيل الخروج</Button>
              </div>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="card bg-blue-50 border-blue-200">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 ml-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-700">مواعيد اليوم</h3>
                  <p className="text-2xl font-bold text-blue-800">{todayAppointments.length}</p>
                </div>
              </div>
              <div className="mt-4">
                <Link to="/doctor/appointments">
                  <Button variant="secondary" fullWidth>عرض المواعيد</Button>
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
                  <p className="text-2xl font-bold text-green-800">15</p>
                </div>
              </div>
              <div className="mt-4">
                <Link to="/doctor/patients">
                  <Button variant="secondary" fullWidth>إدارة المرضى</Button>
                </Link>
              </div>
            </div>
            
            <div className="card bg-purple-50 border-purple-200">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 ml-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-700">رسائل جديدة</h3>
                  <p className="text-2xl font-bold text-purple-800">{unreadMessages}</p>
                </div>
              </div>
              <div className="mt-4">
                <Link to="/doctor/chat">
                  <Button variant="secondary" fullWidth>عرض المحادثات</Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Today's Appointments */}
          <div className="card mb-6">
            <h2 className="text-xl font-semibold mb-4">مواعيد اليوم</h2>
            
            {todayAppointments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-right">المريض</th>
                      <th className="border p-2 text-right">الوقت</th>
                      <th className="border p-2 text-right">نوع الموعد</th>
                      <th className="border p-2 text-right">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todayAppointments.map(appointment => (
                      <tr key={appointment.id} className="hover:bg-gray-50">
                        <td className="border p-2 font-medium">{appointment.patientName}</td>
                        <td className="border p-2">{appointment.time}</td>
                        <td className="border p-2">{appointment.type}</td>
                        <td className="border p-2">
                          <Link to={`/doctor/appointments?id=${appointment.id}`}>
                            <Button variant="outline" size="sm">
                              عرض التفاصيل
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                لا توجد مواعيد لهذا اليوم
              </div>
            )}
            
            <div className="mt-4 text-center">
              <Link to="/doctor/appointments">
                <Button variant="outline">عرض كل المواعيد</Button>
              </Link>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">إجراءات سريعة</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/doctor/schedule">
                <Button variant="primary" fullWidth>
                  إدارة جدول المواعيد
                </Button>
              </Link>
              
              <Link to="/doctor/patients">
                <Button variant="primary" fullWidth>
                  البحث عن مريض
                </Button>
              </Link>
              
              <Link to="/doctor/chat">
                <Button variant="primary" fullWidth>
                  التواصل مع المرضى
                </Button>
              </Link>
              
              <Link to="/doctor/appointments">
                <Button variant="primary" fullWidth>
                  إدارة المواعيد
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

export default DoctorDashboard;
