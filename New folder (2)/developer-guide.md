# دليل المطور - تطبيق مركز فاطمة لطب الأسنان

## مقدمة

هذا الدليل مخصص للمطورين الذين سيعملون على صيانة وتطوير تطبيق مركز فاطمة لطب الأسنان. يوفر هذا الدليل معلومات تفصيلية عن هيكل المشروع، التقنيات المستخدمة، وكيفية تعديل وتطوير وتخصيص التطبيق.

## جدول المحتويات

1. [نظرة عامة على التطبيق](#نظرة-عامة-على-التطبيق)
2. [التقنيات المستخدمة](#التقنيات-المستخدمة)
3. [متطلبات النظام](#متطلبات-النظام)
4. [إعداد بيئة التطوير](#إعداد-بيئة-التطوير)
5. [هيكل المشروع](#هيكل-المشروع)
6. [قاعدة البيانات](#قاعدة-البيانات)
7. [واجهات البرمجة (API)](#واجهات-البرمجة-api)
8. [المكونات الرئيسية](#المكونات-الرئيسية)
9. [نظام المصادقة](#نظام-المصادقة)
10. [نظام المواعيد](#نظام-المواعيد)
11. [نظام المحادثات](#نظام-المحادثات)
12. [ميزات PWA](#ميزات-pwa)
13. [التخصيص](#التخصيص)
14. [الاختبار](#الاختبار)
15. [النشر](#النشر)
16. [الصيانة والتحديث](#الصيانة-والتحديث)
17. [استكشاف الأخطاء وإصلاحها](#استكشاف-الأخطاء-وإصلاحها)

## نظرة عامة على التطبيق

تطبيق مركز فاطمة لطب الأسنان هو تطبيق ويب تقدمي (PWA) مصمم للعمل على أجهزة الكمبيوتر والهواتف المحمولة (أندرويد وآيفون). يوفر التطبيق واجهات مختلفة لأربعة أنواع من المستخدمين:

1. **المرضى**: يمكنهم حجز المواعيد وعرضها والتواصل مع الأطباء
2. **الأطباء**: يمكنهم إدارة المواعيد والمرضى وجدول العمل
3. **الإداريين**: يمكنهم إدارة العيادات والمستخدمين وجميع المواعيد
4. **المطورين**: يمكنهم تخصيص التطبيق وتعديل الإعدادات والسمات

## التقنيات المستخدمة

التطبيق مبني باستخدام التقنيات التالية:

- **الواجهة الأمامية**:
  - React.js: إطار عمل JavaScript لبناء واجهات المستخدم
  - TypeScript: لغة برمجة تضيف أنواع ثابتة إلى JavaScript
  - React Router: للتنقل بين الصفحات
  - Tailwind CSS: إطار عمل CSS للتصميم
  - PWA: لتوفير تجربة تطبيق أصلي على الأجهزة المحمولة

- **الواجهة الخلفية**:
  - Node.js: بيئة تشغيل JavaScript على الخادم
  - Express.js: إطار عمل للتطبيقات الخلفية
  - SQLite: قاعدة بيانات خفيفة الوزن

- **أدوات التطوير**:
  - npm: مدير حزم Node.js
  - Jest: إطار عمل للاختبار
  - ESLint: أداة تحليل الكود
  - Prettier: أداة تنسيق الكود

## متطلبات النظام

لتطوير وتشغيل التطبيق، تحتاج إلى:

- Node.js (الإصدار 14.0.0 أو أحدث)
- npm (الإصدار 6.0.0 أو أحدث)
- متصفح حديث (Chrome، Firefox، Safari، Edge)
- محرر نصوص أو بيئة تطوير متكاملة (VS Code موصى به)

## إعداد بيئة التطوير

لإعداد بيئة التطوير:

1. استنساخ المستودع:
   ```bash
   git clone https://github.com/fatimadental/dental-clinic-app.git
   cd dental-clinic-app
   ```

2. تثبيت التبعيات:
   ```bash
   npm install
   ```

3. إعداد قاعدة البيانات:
   ```bash
   npm run setup-db
   ```

4. تشغيل التطبيق في وضع التطوير:
   ```bash
   npm run dev
   ```

5. الوصول إلى التطبيق على العنوان:
   ```
   http://localhost:3000
   ```

## هيكل المشروع

```
dental-clinic-app/
├── public/                  # الملفات العامة
│   ├── icons/               # أيقونات التطبيق
│   ├── manifest.json        # ملف PWA manifest
│   ├── service-worker.js    # خدمة العامل للعمل بدون اتصال
│   └── offline.html         # صفحة العمل بدون اتصال
├── src/                     # كود المصدر
│   ├── components/          # مكونات React القابلة لإعادة الاستخدام
│   ├── contexts/            # سياقات React
│   ├── database/            # ملفات قاعدة البيانات
│   ├── interfaces/          # تعريفات TypeScript
│   ├── pages/               # صفحات التطبيق
│   ├── services/            # خدمات التطبيق
│   ├── styles/              # ملفات CSS
│   ├── utils/               # وظائف مساعدة
│   ├── App.tsx              # مكون التطبيق الرئيسي
│   └── index.tsx            # نقطة الدخول
├── tests/                   # اختبارات
├── docs/                    # وثائق
├── build.sh                 # سكريبت البناء
├── run_tests.sh             # سكريبت تشغيل الاختبارات
├── package.json             # تكوين المشروع
└── README.md                # وثائق المشروع
```

## قاعدة البيانات

يستخدم التطبيق قاعدة بيانات SQLite مع الجداول التالية:

### جدول المستخدمين (users)

```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### جدول الأطباء (doctors)

```sql
CREATE TABLE doctors (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  specialization TEXT NOT NULL,
  bio TEXT,
  clinic_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (clinic_id) REFERENCES clinics(id)
);
```

### جدول المرضى (patients)

```sql
CREATE TABLE patients (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  date_of_birth DATE,
  gender TEXT,
  address TEXT,
  medical_history TEXT,
  allergies TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### جدول العيادات (clinics)

```sql
CREATE TABLE clinics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active'
);
```

### جدول المواعيد (appointments)

```sql
CREATE TABLE appointments (
  id TEXT PRIMARY KEY,
  patient_id TEXT NOT NULL,
  doctor_id TEXT NOT NULL,
  clinic_id INTEGER NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  duration INTEGER DEFAULT 30,
  type TEXT NOT NULL,
  status TEXT DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id),
  FOREIGN KEY (doctor_id) REFERENCES doctors(id),
  FOREIGN KEY (clinic_id) REFERENCES clinics(id)
);
```

### جدول أوقات توفر الأطباء (availability)

```sql
CREATE TABLE availability (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  doctor_id TEXT NOT NULL,
  day_of_week INTEGER NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);
```

### جدول المحادثات (conversations)

```sql
CREATE TABLE conversations (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### جدول مشاركي المحادثات (conversation_participants)

```sql
CREATE TABLE conversation_participants (
  conversation_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  PRIMARY KEY (conversation_id, user_id),
  FOREIGN KEY (conversation_id) REFERENCES conversations(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### جدول الرسائل (messages)

```sql
CREATE TABLE messages (
  id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL,
  sender_id TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  read_at TIMESTAMP,
  FOREIGN KEY (conversation_id) REFERENCES conversations(id),
  FOREIGN KEY (sender_id) REFERENCES users(id)
);
```

### جدول إعدادات التطبيق (app_settings)

```sql
CREATE TABLE app_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## واجهات البرمجة (API)

التطبيق يستخدم واجهات برمجة RESTful للتواصل بين الواجهة الأمامية والخلفية. فيما يلي النقاط النهائية الرئيسية:

### المصادقة

- `POST /api/auth/register`: تسجيل مستخدم جديد
- `POST /api/auth/login`: تسجيل الدخول
- `POST /api/auth/logout`: تسجيل الخروج
- `GET /api/auth/me`: الحصول على معلومات المستخدم الحالي
- `POST /api/auth/reset-password`: إعادة تعيين كلمة المرور

### المستخدمين

- `GET /api/users`: الحصول على قائمة المستخدمين
- `GET /api/users/:id`: الحصول على مستخدم محدد
- `PUT /api/users/:id`: تحديث مستخدم
- `DELETE /api/users/:id`: حذف مستخدم

### الأطباء

- `GET /api/doctors`: الحصول على قائمة الأطباء
- `GET /api/doctors/:id`: الحصول على طبيب محدد
- `GET /api/doctors/:id/availability`: الحصول على أوقات توفر طبيب
- `PUT /api/doctors/:id/availability`: تحديث أوقات توفر طبيب

### المرضى

- `GET /api/patients`: الحصول على قائمة المرضى
- `GET /api/patients/:id`: الحصول على مريض محدد
- `GET /api/patients/:id/appointments`: الحصول على مواعيد مريض

### العيادات

- `GET /api/clinics`: الحصول على قائمة العيادات
- `GET /api/clinics/:id`: الحصول على عيادة محددة
- `POST /api/clinics`: إنشاء عيادة جديدة
- `PUT /api/clinics/:id`: تحديث عيادة
- `DELETE /api/clinics/:id`: حذف عيادة

### المواعيد

- `GET /api/appointments`: الحصول على قائمة المواعيد
- `GET /api/appointments/:id`: الحصول على موعد محدد
- `POST /api/appointments`: إنشاء موعد جديد
- `PUT /api/appointments/:id`: تحديث موعد
- `DELETE /api/appointments/:id`: إلغاء موعد
- `GET /api/appointments/available`: الحصول على الأوقات المتاحة

### المحادثات

- `GET /api/conversations`: الحصول على قائمة المحادثات
- `GET /api/conversations/:id`: الحصول على محادثة محددة
- `POST /api/conversations`: إنشاء محادثة جديدة
- `GET /api/conversations/:id/messages`: الحصول على رسائل محادثة
- `POST /api/conversations/:id/messages`: إرسال رسالة جديدة

### الإعدادات

- `GET /api/settings`: الحصول على إعدادات التطبيق
- `PUT /api/settings`: تحديث إعدادات التطبيق

## المكونات الرئيسية

### المكونات القابلة لإعادة الاستخدام

التطبيق يستخدم مجموعة من المكونات القابلة لإعادة الاستخدام:

- `Button.tsx`: زر قابل للتخصيص
- `Input.tsx`: حقل إدخال قابل للتخصيص
- `Card.tsx`: بطاقة قابلة للتخصيص
- `AppointmentCard.tsx`: بطاقة لعرض معلومات الموعد
- `ResponsiveHeader.tsx`: رأس متجاوب
- `MobileNavigation.tsx`: تنقل للهواتف المحمولة
- `ResponsiveTable.tsx`: جدول متجاوب
- `ResponsiveGrid.tsx`: شبكة متجاوبة

### الصفحات الرئيسية

- `HomePage.tsx`: الصفحة الرئيسية
- `LoginPage.tsx`: صفحة تسجيل الدخول
- `RegisterPage.tsx`: صفحة التسجيل
- `PatientDashboard.tsx`: لوحة تحكم المريض
- `DoctorDashboard.tsx`: لوحة تحكم الطبيب
- `AdminDashboard.tsx`: لوحة تحكم الإدارة
- `DeveloperDashboard.tsx`: لوحة تحكم المطور

### السياقات (Contexts)

- `AuthContext.tsx`: سياق المصادقة
- `AppointmentContext.tsx`: سياق المواعيد

## نظام المصادقة

نظام المصادقة مبني باستخدام JWT (JSON Web Tokens) ويدعم:

- تسجيل الدخول بالبريد الإلكتروني وكلمة المرور
- تسجيل الدخول عبر مواقع التواصل الاجتماعي (فيسبوك، جوجل)
- التحقق من البريد الإلكتروني
- إعادة تعيين كلمة المرور
- إدارة الجلسات

### تنفيذ المصادقة

```typescript
// src/contexts/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '../interfaces/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // التحقق من وجود جلسة نشطة عند تحميل التطبيق
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const userData = await response.json();
      setUser(userData);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const userData = await response.json();
      setUser(userData);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

## نظام المواعيد

نظام المواعيد يتكون من عدة مكونات:

### نظام حجز المواعيد

```typescript
// src/components/AppointmentBookingSystem.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useAppointment } from '../contexts/AppointmentContext';
import Button from './Button';
import Input from './Input';

const AppointmentBookingSystem: React.FC = () => {
  const { user } = useAuth();
  const { createAppointment, getAvailableSlots } = useAppointment();
  
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [notes, setNotes] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  
  // الحصول على الأوقات المتاحة عند اختيار طبيب وتاريخ
  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      const fetchAvailableSlots = async () => {
        const slots = await getAvailableSlots(selectedDoctor, selectedDate);
        setAvailableSlots(slots);
      };
      
      fetchAvailableSlots();
    }
  }, [selectedDoctor, selectedDate, getAvailableSlots]);
  
  // التقدم إلى الخطوة التالية
  const nextStep = () => {
    setStep(step + 1);
  };
  
  // العودة إلى الخطوة السابقة
  const prevStep = () => {
    setStep(step - 1);
  };
  
  // إرسال نموذج حجز الموعد
  const handleSubmit = async () => {
    try {
      await createAppointment({
        doctorId: selectedDoctor,
        date: selectedDate,
        time: selectedTime,
        type: appointmentType,
        notes,
      });
      
      // إعادة تعيين النموذج بعد الحجز الناجح
      setStep(1);
      setSelectedDoctor('');
      setSelectedDate('');
      setSelectedTime('');
      setAppointmentType('');
      setNotes('');
      
      alert('تم حجز الموعد بنجاح!');
    } catch (error) {
      console.error('Failed to book appointment:', error);
      alert('فشل في حجز الموعد. يرجى المحاولة مرة أخرى.');
    }
  };
  
  // عرض الخطوة الحالية من عملية الحجز
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2>اختيار الطبيب</h2>
            {/* نموذج اختيار الطبيب */}
            <Button onClick={nextStep}>التالي</Button>
          </div>
        );
      case 2:
        return (
          <div>
            <h2>اختيار الموعد</h2>
            {/* نموذج اختيار التاريخ والوقت */}
            <div className="flex space-x-2 space-x-reverse">
              <Button variant="outline" onClick={prevStep}>السابق</Button>
              <Button onClick={nextStep}>التالي</Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h2>تفاصيل الموعد</h2>
            {/* نموذج تفاصيل الموعد */}
            <div className="flex space-x-2 space-x-reverse">
              <Button variant="outline" onClick={prevStep}>السابق</Button>
              <Button onClick={handleSubmit}>تأكيد الحجز</Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-8">
        <div className="flex items-center">
          <div className={`
(Content truncated due to size limit. Use line ranges to read in chunks)