import React, { useState, useEffect } from 'react';

import Message from './Message';
import { useSocket } from 'src/context/socketContext';


function Chat() {
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');
    const {createSocket , socket} = useSocket()


    useEffect(()=>{
        if(!socket){
            return 
        }
        socket?.on("sendMessage",(message)=>{
            console.log("socket received message",message);
            
        })
    },[socket])

//     useEffect(() => {
//     const handleMessage = (message) => {
//         console.log("received message", message);
//         setMessages((prevMessages) => [...prevMessages, message]);
//     };

//     socket.on('sendMessage', handleMessage);

//     return () => {
//         socket.off('sendMessage', handleMessage);
//     };
// }, []);


    const sendMessage = () => {
        socket.emit('sendMessage', { text: messageText });
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

export default Chat;