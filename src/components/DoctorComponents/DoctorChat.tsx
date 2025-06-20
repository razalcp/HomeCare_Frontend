

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

