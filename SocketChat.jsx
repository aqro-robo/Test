import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const token = localStorage.getItem("jwt_token"); // فرض ذخیره JWT در localStorage
const socket = io("http://localhost:4000", {
  auth: { token }
});

const SocketChat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('receiveMessage', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;
    const msg = {
      from: "me", // می‌توان از userId واقعی استفاده کرد
      text: input,
      time: new Date().toISOString()
    };
    socket.emit('sendMessage', msg);
    setMessages(prev => [...prev, msg]);
    setInput('');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>⚡ Real-Time Chat</h2>
      <div style={{ height: 300, border: '1px solid #ddd', overflowY: 'auto', marginBottom: 10 }}>
        {messages.map((msg, i) => (
          <div key={i}><strong>{msg.from}:</strong> {msg.text}</div>
        ))}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type message..."
        style={{ width: '70%' }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default SocketChat;
