import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import Input from '../components/Input';

const AdminUsersPage: React.FC = () => {
  // Mock data for users
  const [users, setUsers] = useState([
    { 
      id: 'U001', 
      name: 'محمد أحمد', 
      email: 'mohammed@example.com',
      phone: '+966 50 123 4567',
      role: 'patient',
      status: 'active',
      createdAt: '2025-01-15',
    },
    { 
      id: 'U002', 
      name: 'د. أحمد محمد', 
      email: 'dr.ahmed@example.com',
      phone: '+966 50 987 6543',
      role: 'doctor',
      status: 'active',
      createdAt: '2025-01-10',
    },
    { 
      id: 'U003', 
      name: 'سارة علي', 
      email: 'sara@example.com',
      phone: '+966 50 111 2222',
      role: 'admin',
      status: 'active',
      createdAt: '2025-01-05',
    },
    { 
      id: 'U004', 
      name: 'خالد عمر', 
      email: 'khaled@example.com',
      phone: '+966 50 333 4444',
      role: 'developer',
      status: 'active',
      createdAt: '2025-01-01',
    },
    { 
      id: 'U005', 
      name: 'فاطمة محمود', 
      email: 'fatima@example.com',
      phone: '+966 50 555 6666',
      role: 'patient',
      status: 'inactive',
      createdAt: '2025-02-15',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'patient' as 'patient' | 'doctor' | 'admin' | 'developer',
    status: 'active' as 'active' | 'inactive',
    password: '',
  });
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleRoleFilterChange = (role: string) => {
    setRoleFilter(role);
  };
  
  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
  };
  
  const handleEditUser = (id: string) => {
    const user = users.find(u => u.id === id);
    if (user) {
      setEditForm({
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role as 'patient' | 'doctor' | 'admin' | 'developer',
        status: user.status as 'active' | 'inactive',
        password: '',
      });
      setSelectedUser(id);
      setIsCreating(false);
    }
  };
  
  const handleCreateUser = () => {
    setEditForm({
      name: '',
      email: '',
      phone: '',
      role: 'patient',
      status: 'active',
      password: '',
    });
    setSelectedUser(null);
    setIsCreating(true);
  };
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSaveChanges = () => {
    if (isCreating) {
      // Create new user
      const newUser = {
        id: `U${(users.length + 1).toString().padStart(3, '0')}`,
        name: editForm.name,
        email: editForm.email,
        phone: editForm.phone,
        role: editForm.role,
        status: editForm.status,
        createdAt: new Date().toISOString().split('T')[0],
      };
      
      setUsers([...users, newUser]);
      setIsCreating(false);
    } else if (selectedUser) {
      // Update existing user
      setUsers(users.map(user => {
        if (user.id === selectedUser) {
          return {
            ...user,
            name: editForm.name,
            email: editForm.email,
            phone: editForm.phone,
            role: editForm.role,
            status: editForm.status,
          };
        }
        return user;
      }));
      
      setSelectedUser(null);
    }
  };
  
  const handleDeleteUser = () => {
    if (selectedUser) {
      setUsers(users.filter(user => user.id !== selectedUser));
      setSelectedUser(null);
    }
  };
  
  const filteredUsers = users.filter(user => {
    // Filter by search term
    const matchesSearch = 
      user.name.includes(searchTerm) ||
      user.email.includes(searchTerm) ||
      user.phone.includes(searchTerm) ||
      user.id.includes(searchTerm);
    
    // Filter by role
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    // Filter by status
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });
  
  const selectedUserData = users.find(u => u.id === selectedUser);
  
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'patient': return 'مريض';
      case 'doctor': return 'طبيب';
      case 'admin': return 'إداري';
      case 'developer': return 'مطور';
      default: return role;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="إدارة المستخدمين" subtitle="عرض وإدارة مستخدمي النظام" />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="relative w-full md:w-auto">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input
                type="search"
                className="input pr-10 w-full md:w-64"
                placeholder="البحث عن مستخدم..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="flex space-x-2 space-x-reverse">
                <button 
                  className={`px-3 py-1 rounded-md text-sm ${roleFilter === 'all' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => handleRoleFilterChange('all')}
                >
                  الكل
                </button>
                <button 
                  className={`px-3 py-1 rounded-md text-sm ${roleFilter === 'patient' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => handleRoleFilterChange('patient')}
                >
                  المرضى
                </button>
                <button 
                  className={`px-3 py-1 rounded-md text-sm ${roleFilter === 'doctor' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => handleRoleFilterChange('doctor')}
                >
                  الأطباء
                </button>
                <button 
                  className={`px-3 py-1 rounded-md text-sm ${roleFilter === 'admin' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => handleRoleFilterChange('admin')}
                >
                  الإداريين
                </button>
              </div>
              
              <div className="flex space-x-2 space-x-reverse mr-2">
                <button 
                  className={`px-3 py-1 rounded-md text-sm ${statusFilter === 'all' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => handleStatusFilterChange('all')}
                >
                  جميع الحالات
                </button>
                <button 
                  className={`px-3 py-1 rounded-md text-sm ${statusFilter === 'active' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => handleStatusFilterChange('active')}
                >
                  نشط
                </button>
                <button 
                  className={`px-3 py-1 rounded-md text-sm ${statusFilter === 'inactive' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => handleStatusFilterChange('inactive')}
                >
                  غير نشط
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="card">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">قائمة المستخدمين</h2>
                  <Button 
                    variant="primary"
                    onClick={handleCreateUser}
                  >
                    إضافة مستخدم جديد
                  </Button>
                </div>
                
                {filteredUsers.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border p-2 text-right">رقم المستخدم</th>
                          <th className="border p-2 text-right">الاسم</th>
                          <th className="border p-2 text-right">البريد الإلكتروني</th>
                          <th className="border p-2 text-right">الدور</th>
                          <th className="border p-2 text-right">الحالة</th>
                          <th className="border p-2 text-right">الإجراءات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map(user => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="border p-2">{user.id}</td>
                            <td className="border p-2 font-medium">{user.name}</td>
                            <td className="border p-2">{user.email}</td>
                            <td className="border p-2">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                user.role === 'patient' ? 'bg-blue-100 text-blue-800' :
                                user.role === 'doctor' ? 'bg-green-100 text-green-800' :
                                user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                'bg-amber-100 text-amber-800'
                              }`}>
                                {getRoleLabel(user.role)}
                              </span>
                            </td>
                            <td className="border p-2">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {user.status === 'active' ? 'نشط' : 'غير نشط'}
                              </span>
                            </td>
                            <td className="border p-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleEditUser(user.id)}
                              >
                                تعديل
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    لا توجد نتائج مطابقة للبحث
                  </div>
                )}
              </div>
            </div>
            
            <div className="lg:col-span-1">
              {(selectedUserData || isCreating) ? (
                <div className="card h-full">
                  <h2 className="text-xl font-semibold mb-4">
                    {isCreating ? 'إضافة مستخدم جديد' : 'تعديل المستخدم'}
                  </h2>
                  
                  <div className="mb-4">
                    <Input
                      label="الاسم الكامل"
                      name="name"
                      value={editForm.name}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <Input
                      label="البريد الإلكتروني"
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <Input
                      label="رقم الهاتف"
                      name="phone"
                      value={editForm.phone}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                      الدور
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={editForm.role}
                      onChange={handleFormChange}
                      className="input"
                      required
                    >
                      <option value="patient">مريض</option>
                      <option value="doctor">طبيب</option>
                      <option value="admin">إداري</option>
                      <option value="developer">مطور</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                      الحالة
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={editForm.status}
                      onChange={handleFormChange}
                      className="input"
                      required
                    >
                      <option value="active">نشط</option>
                      <option value="inactive">غير نشط</option>
                    </select>
                  </div>
                  
                  {isCreating && (
                    <div className="mb-6">
                      <Input
                        label="كلمة المرور"
                        type="password"
                        name="password"
                        value={editForm.password}
                        onChange={handleFormChange}
                        required={isCreating}
                      />
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <div>
                      {!isCreating && (
                        <Button
                          variant="danger"
                          onClick={handleDeleteUser}
                        >
                          حذف المستخدم
                        </Button>
                      )}
                    </div>
                    <div className="flex space-x-2 space-x-reverse">
                      <Button
                        vari
(Content truncated due to size limit. Use line ranges to read in chunks)