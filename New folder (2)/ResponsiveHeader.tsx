import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MobileNavigation from './MobileNavigation';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const ResponsiveHeader: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Define navigation items based on user role
  const getNavItems = () => {
    if (!user) {
      // Guest navigation
      return [
        { path: '/', label: 'الرئيسية' },
        { path: '/about', label: 'عن المركز' },
        { path: '/services', label: 'خدماتنا' },
        { path: '/doctors', label: 'الأطباء' },
        { path: '/contact', label: 'اتصل بنا' },
        { path: '/login', label: 'تسجيل الدخول' },
        { path: '/register', label: 'التسجيل' },
      ];
    }
    
    if (user.role === 'patient') {
      // Patient navigation
      return [
        { path: '/patient/dashboard', label: 'الرئيسية' },
        { path: '/appointment/booking', label: 'حجز موعد' },
        { path: '/patient/appointments', label: 'مواعيدي' },
        { path: '/patient/chat', label: 'المحادثات' },
        { path: '/patient/profile', label: 'الملف الشخصي' },
      ];
    }
    
    if (user.role === 'doctor') {
      // Doctor navigation
      return [
        { path: '/doctor/dashboard', label: 'الرئيسية' },
        { path: '/doctor/appointments', label: 'المواعيد' },
        { path: '/doctor/patients', label: 'المرضى' },
        { path: '/doctor/chat', label: 'المحادثات' },
        { path: '/doctor/schedule', label: 'الجدول' },
      ];
    }
    
    if (user.role === 'admin' || user.role === 'developer') {
      // Admin navigation
      return [
        { path: '/admin/dashboard', label: 'الرئيسية' },
        { path: '/admin/appointments', label: 'المواعيد' },
        { path: '/admin/clinics', label: 'العيادات' },
        { path: '/admin/doctors', label: 'الأطباء' },
        { path: '/admin/patients', label: 'المرضى' },
        { path: '/admin/users', label: 'المستخدمين' },
        { path: '/admin/chat', label: 'المحادثات' },
      ];
    }
    
    // Default navigation
    return [
      { path: '/', label: 'الرئيسية' },
      { path: '/login', label: 'تسجيل الدخول' },
    ];
  };
  
  const navItems = getNavItems();
  
  return (
    <>
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo and Title */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-xl">
                  ف
                </div>
                <div className="mr-3">
                  <h1 className="text-xl font-bold text-gray-800">مركز فاطمة لطب الأسنان</h1>
                  {!isMobile && subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
                </div>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 space-x-reverse">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === item.path
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {user && (
                <button
                  onClick={logout}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  تسجيل الخروج
                </button>
              )}
            </nav>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                type="button"
                className="touch-target inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="sr-only">فتح القائمة الرئيسية</span>
                {isMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          {/* Mobile Page Title */}
          {isMobile && (
            <div className="py-2 border-t border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
              {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
            </div>
          )}
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === item.path
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {user && (
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-right px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                >
                  تسجيل الخروج
                </button>
              )}
            </div>
          </div>
        )}
      </header>
      
      {/* Mobile Bottom Navigation */}
      {isMobile && <MobileNavigation currentPath={location.pathname} />}
    </>
  );
};

export default ResponsiveHeader;
