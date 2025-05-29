import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Chat = () => {
  const { userId } = useParams();
  const currentUser = 'user123'; // فرضی

  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');

  const sendMessage = async () => {
    if (!newMsg.trim()) return;

    // ارسال به API دروغ‌سنج
    const response = await fetch('http://localhost:7000/api/ai/analyzeMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: newMsg })
    });

    const result = await response.json();
    const trust = result?.trust ?? null; // true | false | null

    const msg = {
      from: currentUser,
      to: userId,
      text: newMsg,
      trust
    };

    setMessages(prev => [...prev, msg]);
    setNewMsg('');
  };

  useEffect(() => {
    const dummyMsgs = [
      { from: userId, to: 'user123', text: 'I own a Ferrari', trust: false },
      { from: 'user123', to: userId, text: 'Nice! I live in Tehran', trust: true }
    ];
    setMessages(dummyMsgs);
  }, [userId]);

  return (
    <div style={styles.container}>
      <h2>🤖 Private Chat + AI Lie Detector</h2>
      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.msg,
              ...(msg.from === currentUser ? styles.sent : styles.received),
              backgroundColor:
                msg.trust === false ? '#ffcccc' : msg.trust === true ? '#ccffcc' : '#f0f0f0'
            }}
          >
            <p>{msg.text}</p>
            {msg.trust === false && <span style={styles.flag}>⚠️ Suspected</span>}
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
  msg: { margin: '5px 0', padding: 10, borderRadius: 6, position: 'relative' },
  sent: { textAlign: 'right', alignSelf: 'flex-end' },
  received: { textAlign: 'left', alignSelf: 'flex-start' },
  inputRow: { display: 'flex', gap: 10 },
  input: { flex: 1, padding: 8 },
  btn: { padding: '8px 16px', background: '#007bff', color: '#fff', border: 'none', borderRadius: 4 },
  flag: { fontSize: 12, color: '#900', marginLeft: 8 }
};

export default Chat;
