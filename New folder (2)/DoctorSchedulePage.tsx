import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';

const DoctorSchedulePage: React.FC = () => {
  // Mock data for doctor's schedule
  const [schedule, setSchedule] = useState([
    { day: 'sunday', startTime: '09:00', endTime: '15:00', available: true },
    { day: 'monday', startTime: '09:00', endTime: '17:00', available: true },
    { day: 'tuesday', startTime: '09:00', endTime: '17:00', available: true },
    { day: 'wednesday', startTime: '09:00', endTime: '15:00', available: true },
    { day: 'thursday', startTime: '09:00', endTime: '14:00', available: true },
    { day: 'friday', startTime: '', endTime: '', available: false },
    { day: 'saturday', startTime: '', endTime: '', available: false },
  ]);

  const [editing, setEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    startTime: '',
    endTime: '',
    available: false
  });
  
  const [success, setSuccess] = useState(false);

  const dayNames = {
    sunday: 'الأحد',
    monday: 'الإثنين',
    tuesday: 'الثلاثاء',
    wednesday: 'الأربعاء',
    thursday: 'الخميس',
    friday: 'الجمعة',
    saturday: 'السبت'
  };

  const handleEdit = (day: string) => {
    const daySchedule = schedule.find(s => s.day === day);
    if (daySchedule) {
      setEditForm({
        startTime: daySchedule.startTime,
        endTime: daySchedule.endTime,
        available: daySchedule.available
      });
      setEditing(day);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setEditForm(prev => ({
        ...prev,
        [name]: target.checked
      }));
    } else {
      setEditForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = () => {
    if (editing) {
      setSchedule(schedule.map(s => 
        s.day === editing 
          ? { 
              ...s, 
              startTime: editForm.available ? editForm.startTime : '',
              endTime: editForm.available ? editForm.endTime : '',
              available: editForm.available 
            } 
          : s
      ));
      setEditing(null);
      
      // Show success message
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  const handleCancel = () => {
    setEditing(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="جدول المواعيد" subtitle="إدارة أوقات العمل والتوفر" />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {success && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
              تم تحديث جدول المواعيد بنجاح!
            </div>
          )}
          
          <div className="card mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">جدول أيام العمل</h2>
              <div className="text-sm text-gray-500">العيادة رقم: 3</div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-right">اليوم</th>
                    <th className="border p-2 text-right">وقت البدء</th>
                    <th className="border p-2 text-right">وقت الانتهاء</th>
                    <th className="border p-2 text-right">الحالة</th>
                    <th className="border p-2 text-right">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map(day => (
                    <tr key={day.day} className="hover:bg-gray-50">
                      <td className="border p-2 font-medium">{dayNames[day.day as keyof typeof dayNames]}</td>
                      <td className="border p-2">{day.available ? day.startTime : '-'}</td>
                      <td className="border p-2">{day.available ? day.endTime : '-'}</td>
                      <td className="border p-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          day.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {day.available ? 'متاح' : 'غير متاح'}
                        </span>
                      </td>
                      <td className="border p-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEdit(day.day)}
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
          
          {editing && (
            <div className="card mb-6">
              <h2 className="text-xl font-semibold mb-4">
                تعديل جدول يوم {dayNames[editing as keyof typeof dayNames]}
              </h2>
              
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="available"
                    checked={editForm.available}
                    onChange={handleChange}
                    className="h-5 w-5 text-primary-600 rounded"
                  />
                  <span className="mr-2 text-gray-700">متاح للعمل</span>
                </label>
              </div>
              
              {editForm.available && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                      وقت البدء
                    </label>
                    <select
                      id="startTime"
                      name="startTime"
                      value={editForm.startTime}
                      onChange={handleChange}
                      className="input"
                      required
                    >
                      <option value="08:00">08:00 صباحاً</option>
                      <option value="09:00">09:00 صباحاً</option>
                      <option value="10:00">10:00 صباحاً</option>
                      <option value="11:00">11:00 صباحاً</option>
                      <option value="12:00">12:00 ظهراً</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                      وقت الانتهاء
                    </label>
                    <select
                      id="endTime"
                      name="endTime"
                      value={editForm.endTime}
                      onChange={handleChange}
                      className="input"
                      required
                    >
                      <option value="13:00">01:00 مساءً</option>
                      <option value="14:00">02:00 مساءً</option>
                      <option value="15:00">03:00 مساءً</option>
                      <option value="16:00">04:00 مساءً</option>
                      <option value="17:00">05:00 مساءً</option>
                      <option value="18:00">06:00 مساءً</option>
                    </select>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end space-x-2 space-x-reverse">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                >
                  إلغاء
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSave}
                >
                  حفظ التغييرات
                </Button>
              </div>
            </div>
          )}
          
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">إعدادات المواعيد</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="appointmentDuration" className="block text-sm font-medium text-gray-700 mb-1">
                  مدة الموعد الافتراضية
                </label>
                <select
                  id="appointmentDuration"
                  name="appointmentDuration"
                  className="input"
                  defaultValue="30"
                >
                  <option value="15">15 دقيقة</option>
                  <option value="30">30 دقيقة</option>
                  <option value="45">45 دقيقة</option>
                  <option value="60">60 دقيقة</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="breakDuration" className="block text-sm font-medium text-gray-700 mb-1">
                  مدة الاستراحة بين المواعيد
                </label>
                <select
                  id="breakDuration"
                  name="breakDuration"
                  className="input"
                  defaultValue="10"
                >
                  <option value="5">5 دقائق</option>
                  <option value="10">10 دقائق</option>
                  <option value="15">15 دقيقة</option>
                  <option value="30">30 دقيقة</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button variant="primary">حفظ الإعدادات</Button>
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

export default DoctorSchedulePage;
