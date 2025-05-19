// import React, { useEffect, useRef, useState } from 'react';
// import { bookedUsers } from 'src/services/doctor/doctorapi';

// Type definitions
// interface Message {
//   id: string;
//   senderId: string;
//   text: string;
//   timestamp: Date;
// }

// interface Contact {
//   _id: string;
//   name: string;
//   email: string;
//   mobile: string;
//   profileIMG: string;
//   lastMessage?: string;
//   unreadCount?: number;
//   online: boolean;
// }

// const DoctorChat: React.FC = () => {
//   const [contacts, setContacts] = useState<Contact[]>([
//   ]);

//   useEffect(() => {
//     console.log("useEffect worked");

//     async function getBookedUsers() {
//       const userData = await bookedUsers()
//       console.log(userData);
//       setContacts(userData as Contact[])

//     }
//     getBookedUsers()
//   }, [contacts])
//   // Sample data
  

//   const [messages, setMessages] = useState<Record<string, Message[]>>({
//     '1': [
//       { id: 'm1', senderId: '1', text: 'Hey there!', timestamp: new Date(2025, 3, 24, 9, 30) },
//       { id: 'm2', senderId: 'me', text: 'Hi John! How are you?', timestamp: new Date(2025, 3, 24, 9, 31) },
//       { id: 'm3', senderId: '1', text: 'I\'m doing great! How about you?', timestamp: new Date(2025, 3, 24, 9, 32) },
//       { id: 'm4', senderId: '1', text: 'Hey, how are you doing?', timestamp: new Date(2025, 3, 24, 9, 33) }
//     ],
//     '2': [
//       { id: 'm1', senderId: '2', text: 'Hello!', timestamp: new Date(2025, 3, 24, 8, 0) },
//       { id: 'm2', senderId: 'me', text: 'Hi Jane, about the project...', timestamp: new Date(2025, 3, 24, 8, 1) },
//       { id: 'm3', senderId: '2', text: 'The project is due tomorrow', timestamp: new Date(2025, 3, 24, 8, 2) }
//     ],
//     '3': [
//       { id: 'm1', senderId: '3', text: 'Check this out!', timestamp: new Date(2025, 3, 23, 18, 15) },
//       { id: 'm2', senderId: 'me', text: 'Thanks Mike, I\'ll take a look', timestamp: new Date(2025, 3, 23, 18, 16) },
//       { id: 'm3', senderId: '3', text: 'Did you see the latest update?', timestamp: new Date(2025, 3, 23, 18, 17) }
//     ]
//   });

//   const [selectedContact, setSelectedContact] = useState<string>(contacts[0]._id);
//   const [newMessage, setNewMessage] = useState<string>('');

//   // Handle message submit
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (newMessage.trim() === '') return;

//     const message: Message = {
//       id: `m${Date.now()}`,
//       senderId: 'me',
//       text: newMessage,
//       timestamp: new Date()
//     };

//     setMessages(prev => ({
//       ...prev,
//       [selectedContact]: [...(prev[selectedContact] || []), message]
//     }));

//     setNewMessage('');
//   };

//   // Mark messages as read when selecting a contact
//   const handleContactSelect = (contactId: string) => {
//     setSelectedContact(contactId);
//     setContacts(prev =>
//       prev.map(contact =>
//         contact._id === contactId ? { ...contact, unreadCount: 0 } : contact
//       )
//     );
//   };

//   // Format timestamp
//   const formatTime = (date: Date) => {
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Left sidebar - Contacts */}
//       <div className="w-1/3 bg-white border-r border-gray-200">
//         <div className="p-4 border-b border-gray-200">
//           <h2 className="text-xl font-semibold">Chats</h2>
//           <div className="mt-2 relative">
//             <input
//               type="text"
//               placeholder="Search contacts..."
//               className="w-full p-2 pl-8 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <svg className="absolute left-2 top-3 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//           </div>
//         </div>
//         <div className="overflow-y-auto h-[calc(100%-72px)]">
//           {contacts.map(contact => (
//             <div
//               key={contact._id}
//               className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 ${selectedContact === contact._id ? 'bg-blue-50' : ''}`}
//               onClick={() => handleContactSelect(contact._id)}
//             >
//               <div className="relative">
//                 <img
//                   src={contact.profileIMG}
//                   alt={contact.name}
//                   className="w-10 h-10 rounded-full"
//                 />
//                 {contact.online && (
//                   <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
//                 )}
//               </div>
//               <div className="ml-3 flex-1">
//                 <div className="flex justify-between items-center">
//                   <h3 className="font-medium">{contact.name}</h3>
//                   {contact.unreadCount ? (
//                     <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">{contact.unreadCount}</span>
//                   ) : null}
//                 </div>
//                 <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Right side - Chat area */}
//       <div className="w-2/3 flex flex-col">
//         {/* Chat header */}
//         <div className="p-4 bg-white border-b border-gray-200 flex items-center">
//           {selectedContact && (
//             <>
//               <img
//                 src={contacts.find(c => c._id === selectedContact)?.profileIMG}
//                 alt={contacts.find(c => c._id === selectedContact)?.name}
//                 className="w-8 h-8 rounded-full"
//               />
//               <div className="ml-3">
//                 <h3 className="font-medium">{contacts.find(c => c._id === selectedContact)?.name}</h3>
//                 <p className="text-xs text-gray-500">
//                   {contacts.find(c => c._id === selectedContact)?.online ? 'Online' : 'Offline'}
//                 </p>
//               </div>
//             </>
//           )}
//         </div>

//         {/* Messages area */}
//         <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
//           {messages[selectedContact]?.map(message => (
//             <div
//               key={message.id}
//               className={`mb-4 ${message.senderId === 'me' ? 'flex justify-end' : 'flex justify-start'}`}
//             >
//               <div
//                 className={`max-w-xs p-3 rounded-lg ${message.senderId === 'me'
//                   ? 'bg-blue-500 text-white rounded-br-none'
//                   : 'bg-white border border-gray-200 rounded-bl-none'
//                   }`}
//               >
//                 <p>{message.text}</p>
//                 <p className={`text-xs mt-1 ${message.senderId === 'me' ? 'text-blue-100' : 'text-gray-500'}`}>
//                   {formatTime(message.timestamp)}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Message input */}
//         <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200">
//           <div className="flex items-center">
//             <button
//               type="button"
//               className="p-2 text-gray-500 hover:text-gray-700"
//             >
//               <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
//               </svg>
//             </button>
//             <input
//               type="text"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               placeholder="Type a message..."
//               className="flex-1 p-2 mx-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <button
//               type="submit"
//               className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
//             >
//               <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
//               </svg>
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default DoctorChat;


////////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Message from './Message';

const socket = io('http://localhost:3001');

function DoctorChat() {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  //attach ids to messages
  useEffect(() => {
    socket.on('sendMessage', (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = () => {
    const messageData = {
      textOne: messageText,
      receiverId: "67c6a1060e912a2b7180ac35"
    };
    // console.log("This is message Data",messageData)

    socket.emit('sendMessage', messageData)
    setMessageText('');
  };

  return (
    <div className="App">
      <h1>Real-Time Chat App</h1>
      <div className="messages">
        {messages.map((message, index) => (
          <Message key={index} username={message.username} text={message.text} />
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default DoctorChat;

// interface Contact {
//   _id: string;
//   name: string;
//   email: string;
//   mobile: string;
//   profileIMG?: string;
// }

// const DoctorChat = () => {
//   const [contacts, setContacts] = useState<Contact[]>([]);
//   const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
//   const [messages, setMessages] = useState<Record<string, any[]>>({});
//   const [newMessage, setNewMessage] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [messageText, setMessageText] = useState('');
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // Fetch contacts from backend
//   useEffect(() => {
    

//     async function getBookedUsers() {
//       try {
//         setLoading(true);
//         const userData = await bookedUsers();
//         console.log(userData);
//         setContacts(userData as Contact[]);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching booked users:", error);
//         setLoading(false);
//       }
//     }
//     getBookedUsers();
//   }, []); // Remove contacts dependency to avoid infinite loop




//   useEffect(() => {
//     scrollToBottom();
//   }, [selectedContact, messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const handleContactSelect = (contact: Contact) => {
//     setSelectedContact(contact);
//   };

//     const sendMessage = () => {
//     const messageData = {
//       textOne: messageText,
//       receiverId: "67c6a1060e912a2b7180ac35"
//     };
//     // console.log("This is message Data",messageData)

//     socket.emit('sendMessage', messageData)
//     setMessageText('');
//   };

//   const formatTime = (timestamp: string) => {
//     const date = new Date(timestamp);
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-100">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading contacts...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Contacts Sidebar */}
//       <div className="w-1/4 bg-white border-r border-gray-200">
//         <div className="p-4 border-b border-gray-200">
//           <h2 className="text-xl font-semibold text-gray-800">Contacts</h2>
//         </div>
//         <div className="overflow-y-auto h-full">
//           {contacts.length === 0 ? (
//             <div className="p-4 text-center text-gray-500">
//               No contacts found
//             </div>
//           ) : (
//             contacts.map(contact => (
//               <div 
//                 key={contact._id}
//                 onClick={() => handleContactSelect(contact)}
//                 className={`flex items-center p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
//                   selectedContact?._id === contact._id ? 'bg-blue-50' : ''
//                 }`}
//               >
//                 <div className="flex-shrink-0">
//                   {contact.profileIMG ? (
//                     <img 
//                       src={contact.profileIMG} 
//                       alt={contact.name} 
//                       className="w-10 h-10 rounded-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
//                       {contact.name.charAt(0)}
//                     </div>
//                   )}
//                 </div>
//                 <div className="ml-3">
//                   <p className="text-sm font-medium text-gray-900">{contact.name}</p>
//                   <p className="text-xs text-gray-500">{contact.email}</p>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
      
//       {/* Chat Area */}
//       <div className="flex-1 flex flex-col">
//         {selectedContact ? (
//           <>
//             {/* Chat Header */}
//             <div className="p-4 border-b border-gray-200 bg-white flex items-center">
//               <div className="flex-shrink-0">
//                 {selectedContact.profileIMG ? (
//                   <img 
//                     src={selectedContact.profileIMG} 
//                     alt={selectedContact.name} 
//                     className="w-10 h-10 rounded-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
//                     {selectedContact.name.charAt(0)}
//                   </div>
//                 )}
//               </div>
//               <div className="ml-3">
//                 <p className="font-medium text-gray-900">{selectedContact.name}</p>
//                 <p className="text-sm text-gray-500">{selectedContact.mobile}</p>
//               </div>
//             </div>
            
//             {/* Messages */}
//             <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
//               {messages[selectedContact._id]?.map(message => (
//                 <div 
//                   key={message.id}
//                   className={`mb-4 flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
//                 >
//                   <div 
//                     className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg ${
//                       message.sender === 'me' 
//                         ? 'bg-blue-500 text-white' 
//                         : 'bg-white text-gray-800 border border-gray-200'
//                     }`}
//                   >
//                     <p>{message.text}</p>
//                     <p className={`text-xs mt-1 ${message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'}`}>
//                       {formatTime(message.timestamp)}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//               <div ref={messagesEndRef} />
//             </div>
            
//             {/* Message Input */}
//             <form  className="p-4 border-t border-gray-200 bg-white">
//               <div className="flex items-center">
//                 <input
//                   type="text"
              
//                   value={messageText}
//                   onChange={(e) => setMessageText(e.target.value)}
//                   placeholder="Type a message..."
//                   className="flex-1 border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 onClick={sendMessage}
//                 >
//                   Send
//                 </button>
//               </div>
//             </form>
//           </>
//         ) : (
//           <div className="flex-1 flex items-center justify-center bg-gray-50">
//             <div className="text-center">
//               <p className="text-xl text-gray-500">Select a contact to start chatting</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DoctorChat;