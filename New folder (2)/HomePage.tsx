import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header title="مركز فاطمة لطب الأسنان" subtitle="الرعاية المتكاملة لصحة أسنانك" />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <section className="card mb-8">
            <h2 className="text-2xl font-bold mb-4">مرحباً بكم في مركز فاطمة لطب الأسنان</h2>
            <p className="mb-4">
              نقدم خدمات طب الأسنان المتكاملة بأحدث التقنيات وأفضل الكفاءات الطبية.
              يضم المركز 15 عيادة متخصصة لتقديم كافة خدمات طب الأسنان.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Link to="/patient/login">
                <Button variant="primary" fullWidth>دخول المرضى</Button>
              </Link>
              <Link to="/doctor/login">
                <Button variant="secondary" fullWidth>دخول الأطباء</Button>
              </Link>
              <Link to="/admin/login">
                <Button variant="outline" fullWidth>دخول الإدارة</Button>
              </Link>
              <Link to="/developer/login">
                <Button variant="outline" fullWidth>دخول المطور</Button>
              </Link>
            </div>
          </section>
          
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card">
              <h3 className="text-xl font-semibold mb-2">حجز موعد</h3>
              <p className="text-gray-600 mb-4">احجز موعدك بسهولة مع أطبائنا المتخصصين</p>
              <Link to="/patient/login">
                <Button variant="primary" size="sm">حجز الآن</Button>
              </Link>
            </div>
            
            <div className="card">
              <h3 className="text-xl font-semibold mb-2">خدماتنا</h3>
              <p className="text-gray-600 mb-4">نقدم مجموعة متكاملة من خدمات طب الأسنان</p>
              <Link to="/services">
                <Button variant="secondary" size="sm">استعراض الخدمات</Button>
              </Link>
            </div>
            
            <div className="card">
              <h3 className="text-xl font-semibold mb-2">تواصل معنا</h3>
              <p className="text-gray-600 mb-4">للاستفسارات والطوارئ، تواصل معنا مباشرة</p>
              <Link to="/contact">
                <Button variant="outline" size="sm">اتصل بنا</Button>
              </Link>
            </div>
          </section>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>جميع الحقوق محفوظة &copy; {new Date().getFullYear()} - مركز فاطمة لطب الأسنان</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
