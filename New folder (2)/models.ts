// مخطط قاعدة البيانات لتطبيق مركز فاطمة لطب الأسنان

// نموذج المستخدم
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'patient' | 'doctor' | 'admin' | 'developer';
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

// نموذج الطبيب
interface Doctor {
  id: string;
  userId: string;
  specialization: string;
  clinicNumber: number;
  bio?: string;
  user?: User; // علاقة مع جدول المستخدمين
  availability?: Availability[]; // علاقة مع جدول أوقات التوفر
  appointments?: Appointment[]; // علاقة مع جدول المواعيد
}

// نموذج المريض
interface Patient {
  id: string;
  userId: string;
  medicalHistory?: string;
  dateOfBirth?: Date;
  user?: User; // علاقة مع جدول المستخدمين
  appointments?: Appointment[]; // علاقة مع جدول المواعيد
}

// نموذج الموعد
interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  clinicNumber: number;
  date: Date;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: 'checkup' | 'treatment' | 'follow-up';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  patient?: Patient; // علاقة مع جدول المرضى
  doctor?: Doctor; // علاقة مع جدول الأطباء
}

// نموذج أوقات توفر الطبيب
interface Availability {
  id: string;
  doctorId: string;
  dayOfWeek: 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
  startTime: string;
  endTime: string;
  doctor?: Doctor; // علاقة مع جدول الأطباء
}

// نموذج العيادة
interface Clinic {
  number: number;
  name: string;
  doctorId?: string;
  status: 'available' | 'busy' | 'unavailable';
  doctor?: Doctor; // علاقة مع جدول الأطباء
}

// نموذج المحادثة
interface Conversation {
  id: string;
  title: string;
  createdAt: Date;
  participants?: ConversationParticipant[]; // علاقة مع جدول المشاركين
  messages?: Message[]; // علاقة مع جدول الرسائل
}

// نموذج المشارك في المحادثة
interface ConversationParticipant {
  conversationId: string;
  userId: string;
  conversation?: Conversation; // علاقة مع جدول المحادثات
  user?: User; // علاقة مع جدول المستخدمين
}

// نموذج الرسالة
interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: Date;
  conversation?: Conversation; // علاقة مع جدول المحادثات
  sender?: User; // علاقة مع جدول المستخدمين
}

// نموذج إعدادات التطبيق
interface AppSettings {
  id: number;
  primaryColor: string;
  secondaryColor: string;
  logo: string;
  clinicName: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  updatedAt: Date;
}

// نموذج الإشعار
interface Notification {
  id: string;
  userId: string;
  title: string;
  content: string;
  isRead: boolean;
  createdAt: Date;
  user?: User; // علاقة مع جدول المستخدمين
}

export type {
  User,
  Doctor,
  Patient,
  Appointment,
  Availability,
  Clinic,
  Conversation,
  ConversationParticipant,
  Message,
  AppSettings,
  Notification
};
