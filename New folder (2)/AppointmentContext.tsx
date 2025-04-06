import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Appointment, AppointmentStatus, AppointmentType } from '../interfaces/types';

interface AppointmentContextType {
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;
  getAppointmentsByPatient: (patientId: string) => Appointment[];
  getAppointmentsByDoctor: (doctorId: string) => Appointment[];
  getAppointmentsByClinic: (clinicId: number) => Appointment[];
  getAppointmentsByDate: (date: string) => Appointment[];
  getAppointmentsByStatus: (status: AppointmentStatus) => Appointment[];
  checkAvailability: (doctorId: string, date: string, time: string) => boolean;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

// Mock data for initial appointments
const initialAppointments: Appointment[] = [
  {
    id: '1',
    patientId: 'P001',
    patientName: 'محمد أحمد',
    doctorId: 'D001',
    doctorName: 'د. أحمد محمد',
    clinicId: 3,
    date: '2025-04-10',
    time: '10:00',
    duration: 30,
    type: 'checkup',
    status: 'scheduled',
    notes: '',
    createdAt: '2025-04-01',
  },
  {
    id: '2',
    patientId: 'P002',
    patientName: 'فاطمة علي',
    doctorId: 'D002',
    doctorName: 'د. سارة علي',
    clinicId: 7,
    date: '2025-04-10',
    time: '11:30',
    duration: 60,
    type: 'treatment',
    status: 'scheduled',
    notes: 'علاج جذور',
    createdAt: '2025-04-02',
  },
  {
    id: '3',
    patientId: 'P003',
    patientName: 'أحمد خالد',
    doctorId: 'D003',
    doctorName: 'د. محمد خالد',
    clinicId: 5,
    date: '2025-04-10',
    time: '09:00',
    duration: 30,
    type: 'follow-up',
    status: 'completed',
    notes: 'متابعة بعد خلع الضرس',
    createdAt: '2025-04-01',
  },
  {
    id: '4',
    patientId: 'P004',
    patientName: 'سارة محمود',
    doctorId: 'D004',
    doctorName: 'د. فاطمة أحمد',
    clinicId: 4,
    date: '2025-04-11',
    time: '10:00',
    duration: 30,
    type: 'checkup',
    status: 'scheduled',
    notes: '',
    createdAt: '2025-04-03',
  },
  {
    id: '5',
    patientId: 'P005',
    patientName: 'خالد عمر',
    doctorId: 'D005',
    doctorName: 'د. عمر حسن',
    clinicId: 1,
    date: '2025-04-11',
    time: '12:00',
    duration: 45,
    type: 'treatment',
    status: 'cancelled',
    notes: 'تم الإلغاء بواسطة المريض',
    createdAt: '2025-04-02',
  },
];

export const AppointmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);

  // Load appointments from localStorage on component mount
  useEffect(() => {
    const storedAppointments = localStorage.getItem('appointments');
    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments));
    }
  }, []);

  // Save appointments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: `${appointments.length + 1}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setAppointments([...appointments, newAppointment]);
  };

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    setAppointments(
      appointments.map(appointment =>
        appointment.id === id ? { ...appointment, ...updates } : appointment
      )
    );
  };

  const deleteAppointment = (id: string) => {
    setAppointments(appointments.filter(appointment => appointment.id !== id));
  };

  const getAppointmentsByPatient = (patientId: string) => {
    return appointments.filter(appointment => appointment.patientId === patientId);
  };

  const getAppointmentsByDoctor = (doctorId: string) => {
    return appointments.filter(appointment => appointment.doctorId === doctorId);
  };

  const getAppointmentsByClinic = (clinicId: number) => {
    return appointments.filter(appointment => appointment.clinicId === clinicId);
  };

  const getAppointmentsByDate = (date: string) => {
    return appointments.filter(appointment => appointment.date === date);
  };

  const getAppointmentsByStatus = (status: AppointmentStatus) => {
    return appointments.filter(appointment => appointment.status === status);
  };

  const checkAvailability = (doctorId: string, date: string, time: string) => {
    // Check if the doctor has any appointments at the specified date and time
    const conflictingAppointments = appointments.filter(
      appointment =>
        appointment.doctorId === doctorId &&
        appointment.date === date &&
        appointment.time === time &&
        appointment.status !== 'cancelled'
    );
    
    return conflictingAppointments.length === 0;
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        addAppointment,
        updateAppointment,
        deleteAppointment,
        getAppointmentsByPatient,
        getAppointmentsByDoctor,
        getAppointmentsByClinic,
        getAppointmentsByDate,
        getAppointmentsByStatus,
        checkAvailability,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error('useAppointments must be used within an AppointmentProvider');
  }
  return context;
};
