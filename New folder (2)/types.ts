export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'patient' | 'doctor' | 'admin' | 'developer';
  profileImage?: string;
}

export interface Doctor extends User {
  specialization: string;
  clinicNumber: number;
  availability: Availability[];
}

export interface Patient extends User {
  medicalHistory?: string;
  appointments: Appointment[];
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  clinicNumber: number;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: 'checkup' | 'treatment' | 'follow-up';
  notes?: string;
}

export interface Clinic {
  number: number;
  doctorId: string;
  name: string;
}

export interface Availability {
  day: 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
  startTime: string;
  endTime: string;
}

export interface AppSettings {
  primaryColor: string;
  secondaryColor: string;
  logo: string;
  clinicName: string;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
}
