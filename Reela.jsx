import React, { useState } from 'react';

const Reela = () => {
  const [conversation, setConversation] = useState([{ sender: 'user', text: '' }]);
  const [mood, setMood] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (index, value) => {
    const updated = [...conversation];
    updated[index].text = value;
    setConversation(updated);
  };

  const addMessage = () => {
    setConversation([...conversation, { sender: 'user', text: '' }]);
  };

  const analyze = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:7000/api/reela/analyzeConversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conversation }),
      });
      const data = await response.json();
      setMood(data.mood);
    } catch (err) {
      alert('Error analyzing conversation.');
    } finally {
      setLoading(false);
    }
  };

  const moodColor = {
    interested: '#90ee90',
    playful: '#f9f871',
    serious: '#d3d3f3',
    detached: '#f08080',
    manipulative: '#ff8c00',
    friendly: '#add8e6',
  }[mood] || '#eee';

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h2>💘 Reela - Emotional Conversation Analyzer</h2>

      {conversation.map((msg, i) => (
        <input
          key={i}
          type="text"
          value={msg.text}
          onChange={(e) => handleInputChange(i, e.target.value)}
          placeholder={`Message ${i + 1}`}
          style={{ display: 'block', marginBottom: 10, width: '100%', padding: 8 }}
        />
      ))}

      <button onClick={addMessage} style={{ marginRight: 10 }}>➕ Add Message</button>
      <button onClick={analyze} disabled={loading}>
        {loading ? 'Analyzing...' : '🔍 Analyze Mood'}
      </button>

      {mood && (
        <div style={{
          marginTop: 20,
          padding: 15,
          backgroundColor: moodColor,
          borderRadius: 8,
          fontWeight: 'bold'
        }}>
          🧠 Mood detected: {mood}
        </div>
      )}
    </div>
  );
};

export default Reela;
