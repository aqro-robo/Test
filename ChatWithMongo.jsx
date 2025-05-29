import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatWithMongo = ({ userId, partnerId }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  const API = 'http://localhost:3000/api/messages';

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const res = await axios.get(`${API}/${userId}/${partnerId}`);
        setMessages(res.data);
      } catch (err) {
        console.error('Load failed', err);
      }
    };
    loadMessages();
  }, [userId, partnerId]);

  const sendMessage = async () => {
    if (!text.trim()) return;
    try {
      const res = await axios.post(`${API}/send`, {
        from: userId,
        to: partnerId,
        text
      });
      setMessages(prev => [...prev, res.data]);
      setText('');
    } catch (err) {
      console.error('Send failed', err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>💬 Chat with {partnerId}</h2>
      <div style={{ border: '1px solid #ccc', height: 300, overflowY: 'scroll', marginBottom: 10 }}>
        {messages.map((msg, idx) => (
          <div key={idx}>
            <strong>{msg.from}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type message"
        style={{ width: '70%' }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatWithMongo;
