import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';

const AdminChatPage: React.FC = () => {
  // Mock data for conversations
  const [conversations, setConversations] = useState([
    { id: 1, name: 'محمد أحمد', role: 'patient', lastMessage: 'أريد تغيير موعدي', time: '10:30 ص', unread: 1 },
    { id: 2, name: 'د. أحمد محمد', role: 'doctor', lastMessage: 'هل يمكنني الحصول على جدول مواعيد الأسبوع القادم؟', time: 'أمس', unread: 0 },
    { id: 3, name: 'فاطمة علي', role: 'patient', lastMessage: 'شكراً لكم', time: '2 أبريل', unread: 0 },
    { id: 4, name: 'د. سارة علي', role: 'doctor', lastMessage: 'سأكون متأخرة غداً', time: 'أمس', unread: 2 },
    { id: 5, name: 'خالد عمر', role: 'patient', lastMessage: 'هل يمكنني حجز موعد للأسبوع القادم؟', time: '3 أبريل', unread: 1 },
  ]);

  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  
  // Mock data for messages in the selected conversation
  const [messages, setMessages] = useState([
    { id: 1, conversationId: 1, sender: 'other', text: 'مرحباً، أريد تغيير موعدي من يوم الثلاثاء إلى يوم الأربعاء', time: '10:15 ص' },
    { id: 2, conversationId: 1, sender: 'user', text: 'مرحباً بك، سأتحقق من توفر المواعيد', time: '10:20 ص' },
    { id: 3, conversationId: 1, sender: 'user', text: 'نعم، يوجد موعد متاح يوم الأربعاء الساعة 11 صباحاً', time: '10:25 ص' },
    { id: 4, conversationId: 1, sender: 'other', text: 'أريد تغيير موعدي إلى هذا الوقت من فضلك', time: '10:30 ص' },
    { id: 5, conversationId: 2, sender: 'other', text: 'مرحباً، هل يمكنني الحصول على جدول مواعيد الأسبوع القادم؟', time: '3:00 م أمس' },
    { id: 6, conversationId: 3, sender: 'other', text: 'شكراً لكم على الخدمة الممتازة', time: '9:00 ص 2 أبريل' },
    { id: 7, conversationId: 3, sender: 'user', text: 'شكراً لك، نحن سعداء بخدمتك', time: '9:15 ص 2 أبريل' },
    { id: 8, conversationId: 3, sender: 'other', text: 'شكراً لكم', time: '9:20 ص 2 أبريل' },
    { id: 9, conversationId: 4, sender: 'other', text: 'مرحباً، أود إخباركم أنني سأكون متأخرة غداً بسبب ظروف طارئة', time: '4:00 م أمس' },
    { id: 10, conversationId: 4, sender: 'other', text: 'سأصل الساعة 10 بدلاً من 9', time: '4:05 م أمس' },
    { id: 11, conversationId: 5, sender: 'other', text: 'مرحباً، هل يمكنني حجز موعد للأسبوع القادم؟', time: '11:00 ص 3 أبريل' },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    // Add new message to the messages array
    const newMessageObj = {
      id: messages.length + 1,
      conversationId: selectedConversation,
      sender: 'user',
      text: newMessage,
      time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessageObj]);

    // Update last message in conversations
    setConversations(conversations.map(conv => 
      conv.id === selectedConversation 
        ? { ...conv, lastMessage: newMessage, time: 'الآن', unread: 0 }
        : conv
    ));

    // Clear input
    setNewMessage('');
  };

  const filteredConversations = conversations.filter(conv => {
    // Filter by search term
    const matchesSearch = conv.name.includes(searchTerm) || conv.lastMessage.includes(searchTerm);
    
    // Filter by role
    const matchesRole = roleFilter === 'all' || conv.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  const filteredMessages = messages.filter(msg => msg.conversationId === selectedConversation);

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="المحادثات" subtitle="التواصل مع المرضى والأطباء" />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex h-[calc(80vh-100px)]">
            {/* Conversations sidebar */}
            <div className="w-1/3 border-l overflow-y-auto">
              <div className="p-4 border-b">
                <div className="relative mb-4">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </div>
                  <input
                    type="search"
                    className="input pr-10 w-full"
                    placeholder="البحث عن محادثة..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex space-x-2 space-x-reverse">
                  <button 
                    className={`px-3 py-1 rounded-md text-sm ${roleFilter === 'all' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                    onClick={() => setRoleFilter('all')}
                  >
                    الكل
                  </button>
                  <button 
                    className={`px-3 py-1 rounded-md text-sm ${roleFilter === 'patient' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                    onClick={() => setRoleFilter('patient')}
                  >
                    المرضى
                  </button>
                  <button 
                    className={`px-3 py-1 rounded-md text-sm ${roleFilter === 'doctor' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                    onClick={() => setRoleFilter('doctor')}
                  >
                    الأطباء
                  </button>
                </div>
              </div>
              
              <div>
                {filteredConversations.map(conversation => (
                  <div 
                    key={conversation.id}
                    className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${selectedConversation === conversation.id ? 'bg-primary-50' : ''}`}
                    onClick={() => {
                      setSelectedConversation(conversation.id);
                      // Mark as read when selected
                      setConversations(conversations.map(conv => 
                        conv.id === conversation.id 
                          ? { ...conv, unread: 0 }
                          : conv
                      ));
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                          conversation.role === 'patient' ? 'bg-blue-500' : 'bg-green-500'
                        }`}>
                          {conversation.name.charAt(0)}
                        </div>
                        <div className="mr-3">
                          <div className="font-medium">{conversation.name}</div>
                          <div className="text-sm text-gray-500">
                            {conversation.role === 'patient' ? 'مريض' : 'طبيب'}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">{conversation.time}</div>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <div className="text-sm text-gray-600 truncate max-w-[80%]">
                        {conversation.lastMessage}
                      </div>
                      {conversation.unread > 0 && (
                        <div className="bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {conversation.unread}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Chat area */}
            <div className="w-2/3 flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Chat header */}
                  <div className="p-4 border-b flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                        conversations.find(c => c.id === selectedConversation)?.role === 'patient' 
                          ? 'bg-blue-500' 
                          : 'bg-green-500'
                      }`}>
                        {conversations.find(c => c.id === selectedConversation)?.name.charAt(0)}
                      </div>
                      <div className="mr-3">
                        <div className="font-medium">
                          {conversations.find(c => c.id === selectedConversation)?.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {conversations.find(c => c.id === selectedConversation)?.role === 'patient' 
                            ? 'مريض' 
                            : 'طبيب'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 space-x-reverse">
                      {conversations.find(c => c.id === selectedConversation)?.role === 'patient' && (
                        <Link to="/admin/patients">
                          <Button variant="outline" size="sm">
                            عرض ملف المريض
                          </Button>
                        </Link>
                      )}
                      {conversations.find(c => c.id === selectedConversation)?.role === 'doctor' && (
                        <Link to="/admin/doctors">
                          <Button variant="outline" size="sm">
                            عرض ملف الطبيب
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                  
                  {/* Messages */}
                  <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
                    {filteredMessages.map(message => (
                      <div 
                        key={message.id}
                        className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.sender === 'user' 
                              ? 'bg-primary-500 text-white rounded-br-none' 
                              : 'bg-white border rounded-bl-none'
                          }`}
                        >
                          <div>{message.text}</div>
                          <div className={`text-xs mt-1 ${message.sender === 'user' ? 'text-primary-100' : 'text-gray-500'}`}>
                            {message.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Message input */}
                  <div className="p-4 border-t">
                    <div className="flex">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="اكتب رسالتك هنا..."
                        className="input flex-grow"
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <Button 
                        variant="primary" 
                        className="mr-2"
                        onClick={handleSendMessage}
                      >
                        إرسال
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-grow flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <div className="text-gray-400 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-600">اختر محادثة للبدء</h3>
                    <p className="text-gray-500 mt-1">يمكنك التواصل مع المرضى أو الأطباء</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <Link to="/admin/dashboard">
            <Button variant="outline">العودة للوحة التحكم</Button>
          </Link>
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

export default AdminChatPage;
