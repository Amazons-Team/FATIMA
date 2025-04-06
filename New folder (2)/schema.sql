-- مركز فاطمة لطب الأسنان - مخطط قاعدة البيانات

-- جدول المستخدمين
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  role ENUM('patient', 'doctor', 'admin', 'developer') NOT NULL,
  profile_image VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- جدول الأطباء
CREATE TABLE doctors (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  specialization VARCHAR(100) NOT NULL,
  clinic_number INT NOT NULL UNIQUE,
  bio TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- جدول المرضى
CREATE TABLE patients (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  medical_history TEXT,
  date_of_birth DATE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- جدول المواعيد
CREATE TABLE appointments (
  id VARCHAR(36) PRIMARY KEY,
  patient_id VARCHAR(36) NOT NULL,
  doctor_id VARCHAR(36) NOT NULL,
  clinic_number INT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  status ENUM('scheduled', 'completed', 'cancelled') NOT NULL DEFAULT 'scheduled',
  type ENUM('checkup', 'treatment', 'follow-up') NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
  FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE,
  FOREIGN KEY (clinic_number) REFERENCES doctors(clinic_number)
);

-- جدول أوقات توفر الأطباء
CREATE TABLE availability (
  id VARCHAR(36) PRIMARY KEY,
  doctor_id VARCHAR(36) NOT NULL,
  day_of_week ENUM('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday') NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE,
  UNIQUE KEY (doctor_id, day_of_week)
);

-- جدول العيادات
CREATE TABLE clinics (
  number INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  doctor_id VARCHAR(36),
  status ENUM('available', 'busy', 'unavailable') NOT NULL DEFAULT 'available',
  FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE SET NULL
);

-- جدول المحادثات
CREATE TABLE conversations (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول المشاركين في المحادثات
CREATE TABLE conversation_participants (
  conversation_id VARCHAR(36) NOT NULL,
  user_id VARCHAR(36) NOT NULL,
  PRIMARY KEY (conversation_id, user_id),
  FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- جدول الرسائل
CREATE TABLE messages (
  id VARCHAR(36) PRIMARY KEY,
  conversation_id VARCHAR(36) NOT NULL,
  sender_id VARCHAR(36) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
  FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE
);

-- جدول إعدادات التطبيق
CREATE TABLE app_settings (
  id INT PRIMARY KEY DEFAULT 1,
  primary_color VARCHAR(20) NOT NULL DEFAULT '#0ea5e9',
  secondary_color VARCHAR(20) NOT NULL DEFAULT '#14b8a6',
  logo VARCHAR(255) NOT NULL DEFAULT '/logo.png',
  clinic_name VARCHAR(100) NOT NULL DEFAULT 'مركز فاطمة لطب الأسنان',
  contact_phone VARCHAR(20) NOT NULL DEFAULT '+966 50 123 4567',
  contact_email VARCHAR(100) NOT NULL DEFAULT 'info@fatimadental.com',
  contact_address TEXT NOT NULL DEFAULT 'الرياض، المملكة العربية السعودية',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CHECK (id = 1) -- لضمان وجود صف واحد فقط
);

-- جدول الإشعارات
CREATE TABLE notifications (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  title VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- إنشاء بيانات افتراضية لإعدادات التطبيق
INSERT INTO app_settings (primary_color, secondary_color, logo, clinic_name, contact_phone, contact_email, contact_address)
VALUES ('#0ea5e9', '#14b8a6', '/logo.png', 'مركز فاطمة لطب الأسنان', '+966 50 123 4567', 'info@fatimadental.com', 'الرياض، المملكة العربية السعودية');
