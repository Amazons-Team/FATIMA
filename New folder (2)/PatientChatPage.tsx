import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';

const PatientChatPage: React.FC = () => {
  // Mock data for conversations
  const [conversations, setConversations] = useState([
    { id: 1, name: 'د. أحمد محمد', role: 'doctor', lastMessage: 'متى يمكنني زيارتك مرة أخرى؟', time: '10:30 ص', unread: 1 },
    { id: 2, name: 'استعلامات المركز', role: 'admin', lastMessage: 'تم تأكيد موعدك ليوم الخميس', time: 'أمس', unread: 0 },
  ]);

  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  
  // Mock data for messages in the selected conversation
  const [messages, setMessages] = useState([
    { id: 1, conversationId: 1, sender: 'user', text: 'مرحباً دكتور، أريد استفساراً عن موعدي القادم', time: '10:15 ص' },
    { id: 2, conversationId: 1, sender: 'other', text: 'مرحباً بك، كيف يمكنني مساعدتك؟', time: '10:20 ص' },
    { id: 3, conversationId: 1, sender: 'user', text: 'متى يمكنني زيارتك مرة أخرى؟', time: '10:30 ص' },
    { id: 4, conversationId: 2, sender: 'user', text: 'مرحباً، أريد حجز موعد جديد', time: '9:00 ص أمس' },
    { id: 5, conversationId: 2, sender: 'other', text: 'مرحباً بك، يمكننا تحديد موعد يوم الخميس القادم الساعة 11 صباحاً', time: '9:15 ص أمس' },
    { id: 6, conversationId: 2, sender: 'user', text: 'نعم هذا مناسب لي', time: '9:20 ص أمس' },
    { id: 7, conversationId: 2, sender: 'other', text: 'تم تأكيد موعدك ليوم الخميس', time: '9:25 ص أمس' },
  ]);

  const [newMessage, setNewMessage] = useState('');

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

  const filteredMessages = messages.filter(msg => msg.conversationId === selectedConversation);

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="المحادثات" subtitle="تواصل مع الأطباء والاستعلامات" />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex h-[calc(80vh-100px)]">
            {/* Conversations sidebar */}
            <div className="w-1/3 border-l overflow-y-auto">
              <div className="p-4 border-b">
                <h2 className="font-semibold text-lg">المحادثات</h2>
              </div>
              
              <div>
                {conversations.map(conversation => (
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
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                          {conversation.name.charAt(0)}
                        </div>
                        <div className="mr-3">
                          <div className="font-medium">{conversation.name}</div>
                          <div className="text-sm text-gray-500">
                            {conversation.role === 'doctor' ? 'طبيب' : 'إدارة'}
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
                  <div className="p-4 border-b flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                      {conversations.find(c => c.id === selectedConversation)?.name.charAt(0)}
                    </div>
                    <div className="mr-3">
                      <div className="font-medium">
                        {conversations.find(c => c.id === selectedConversation)?.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {conversations.find(c => c.id === selectedConversation)?.role === 'doctor' ? 'طبيب' : 'إدارة'}
                      </div>
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
                    <p className="text-gray-500 mt-1">يمكنك التواصل مع الأطباء أو الاستعلامات</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <Link to="/patient/dashboard">
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

export default PatientChatPage;
