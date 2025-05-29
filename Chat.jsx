import React, { useEffect, useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [from, setFrom] = useState('User1');
  const [to, setTo] = useState('User2');
  const [text, setText] = useState('');

  const fetchMessages = async () => {
    const res = await fetch(`http://localhost:6000/api/chat/${from}/${to}`);
    const data = await res.json();
    setMessages(data);
  };

  const sendMessage = async () => {
    if (!text.trim()) return;
    await fetch('http://localhost:6000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to, text })
    });
    setText('');
    fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
  }, [from, to]);

  return (
    <div style={styles.container}>
      <h2>💬 Chat Between {from} & {to}</h2>
      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div key={i} style={msg.from === from ? styles.sent : styles.received}>
            <p>{msg.text}</p>
            <small>{new Date(msg.time).toLocaleTimeString()}</small>
          </div>
        ))}
      </div>
      <div style={styles.controls}>
        <input value={text} onChange={e => setText(e.target.value)} style={styles.input} placeholder="Type message..." />
        <button onClick={sendMessage} style={styles.button}>Send</button>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: 20, fontFamily: 'Arial' },
  chatBox: { border: '1px solid #ccc', padding: 10, height: 300, overflowY: 'scroll', marginBottom: 10 },
  sent: { textAlign: 'right', background: '#e0ffe0', padding: 5, margin: '5px 0' },
  received: { textAlign: 'left', background: '#f0f0f0', padding: 5, margin: '5px 0' },
  controls: { display: 'flex', gap: 10 },
  input: { flex: 1, padding: 8 },
  button: { padding: '8px 16px', background: '#0088ff', color: '#fff', border: 'none', borderRadius: 5 }
};

export default Chat;
