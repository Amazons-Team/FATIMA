import React from 'react';

interface AppointmentCardProps {
  doctorName: string;
  clinicNumber: number;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: 'checkup' | 'treatment' | 'follow-up';
  onCancel?: () => void;
  onReschedule?: () => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  doctorName,
  clinicNumber,
  date,
  time,
  status,
  type,
  onCancel,
  onReschedule,
}) => {
  const statusColors = {
    scheduled: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  const typeLabels = {
    checkup: 'كشف',
    treatment: 'علاج',
    'follow-up': 'متابعة',
  };

  return (
    <div className="card mb-4 border-r-4 border-primary-500">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{doctorName}</h3>
          <p className="text-sm text-gray-600">عيادة رقم: {clinicNumber}</p>
          <p className="text-sm text-gray-600">
            {date} - {time}
          </p>
          <p className="text-sm mt-2">
            نوع الموعد: <span className="font-medium">{typeLabels[type]}</span>
          </p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs ${statusColors[status]}`}>
          {status === 'scheduled' && 'مجدول'}
          {status === 'completed' && 'مكتمل'}
          {status === 'cancelled' && 'ملغي'}
        </span>
      </div>
      
      {status === 'scheduled' && (
        <div className="mt-4 flex space-x-2 space-x-reverse">
          {onReschedule && (
            <button 
              onClick={onReschedule}
              className="btn-outline text-sm px-3 py-1"
            >
              إعادة جدولة
            </button>
          )}
          {onCancel && (
            <button 
              onClick={onCancel}
              className="text-red-600 hover:text-red-800 text-sm px-3 py-1"
            >
              إلغاء
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;
