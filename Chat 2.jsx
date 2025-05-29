import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Chat = () => {
  const { userId } = useParams();
  const currentUser = 'user123'; // فرض کنیم یوزر فعال اینه

  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');

  useEffect(() => {
    // پیام‌های تستی
    const dummyMsgs = [
      { from: 'user123', to: userId, text: 'Hi there!' },
      { from: userId, to: 'user123', text: 'Hey, what’s up?' }
    ];
    setMessages(dummyMsgs);
  }, [userId]);

  const sendMessage = () => {
    if (!newMsg.trim()) return;
    const msg = { from: currentUser, to: userId, text: newMsg };
    setMessages(prev => [...prev, msg]);
    setNewMsg('');
  };

  return (
    <div style={styles.container}>
      <h2>🔐 Private Chat with {userId}</h2>
      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div key={i} style={msg.from === currentUser ? styles.sent : styles.received}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div style={styles.inputRow}>
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type your message..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.btn}>Send</button>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: 20, fontFamily: 'Arial' },
  chatBox: { border: '1px solid #ccc', padding: 10, minHeight: 300, marginBottom: 10 },
  sent: { textAlign: 'right', background: '#ddf', margin: '4px 0', padding: 8, borderRadius: 6 },
  received: { textAlign: 'left', background: '#f5f5f5', margin: '4px 0', padding: 8, borderRadius: 6 },
  inputRow: { display: 'flex', gap: 10 },
  input: { flex: 1, padding: 8 },
  btn: { padding: '8px 16px', background: '#007bff', color: '#fff', border: 'none', borderRadius: 4 }
};

export default Chat;
