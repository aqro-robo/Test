import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatWithMongo = ({ userId, partnerId }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const API = 'http://localhost:3000/api/messages';
  const ZILAT_API = 'http://localhost:3000/api/zilat/analyze';

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

  const analyzeMessage = async (msg) => {
    try {
      const res = await axios.post(ZILAT_API, {
        message: msg.text,
        userId: msg.from
      });
      setAnalysis({ ...res.data, text: msg.text });
    } catch (err) {
      console.error('Zilat failed', err);
      setAnalysis({ verdict: '❌ Error analyzing message' });
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>💬 Chat with {partnerId}</h2>
      <div style={{ border: '1px solid #ccc', height: 300, overflowY: 'scroll', marginBottom: 10 }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: 5 }}>
            <strong>{msg.from}:</strong> {msg.text}
            <button style={{ marginLeft: 10 }} onClick={() => analyzeMessage(msg)}>🧠 Analyze</button>
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

      {analysis && (
        <div style={{ marginTop: 20, padding: 10, background: '#f0f0f0' }}>
          <h4>🧠 Zilat Analysis:</h4>
          <p><strong>Message:</strong> {analysis.text}</p>
          <p><strong>Verdict:</strong> {analysis.verdict}</p>
          <p><strong>Truth Score:</strong> {analysis.truthScore}</p>
          <p><strong>Details:</strong> {analysis.analysis}</p>
        </div>
      )}
    </div>
  );
};

export default ChatWithMongo;
