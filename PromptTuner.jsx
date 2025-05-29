import React, { useState } from 'react';

const PromptTuner = () => {
  const [rawPrompt, setRawPrompt] = useState('');
  const [role, setRole] = useState('assistant');
  const [tunedPrompt, setTunedPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTune = async () => {
    if (!rawPrompt.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:7000/api/prompt/tune', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawPrompt, role }),
      });
      const data = await res.json();
      setTunedPrompt(data.tunedPrompt || 'No result');
    } catch (err) {
      setTunedPrompt('Error during tuning');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h2>🎯 Prompt Tuner AI</h2>
      <p>Enter your original prompt and select a target AI role to optimize it.</p>
      <textarea
        rows={5}
        style={{ width: '100%', padding: 10 }}
        value={rawPrompt}
        onChange={(e) => setRawPrompt(e.target.value)}
        placeholder="Enter your original prompt here..."
      />
      <div style={{ marginTop: 10 }}>
        Role:
        <select value={role} onChange={(e) => setRole(e.target.value)} style={{ marginLeft: 10 }}>
          <option value="assistant">Assistant</option>
          <option value="search">Search Agent</option>
          <option value="chat">Conversational Agent</option>
          <option value="romantic">Romantic AI</option>
          <option value="security">Security Agent</option>
        </select>
      </div>
      <button onClick={handleTune} disabled={loading} style={{ marginTop: 10 }}>
        {loading ? 'Tuning...' : '✨ Tune Prompt'}
      </button>
      {tunedPrompt && (
        <div style={{ marginTop: 20, backgroundColor: '#eef', padding: 15, borderRadius: 8 }}>
          <strong>Optimized Prompt:</strong>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{tunedPrompt}</pre>
        </div>
      )}
    </div>
  );
};

export default PromptTuner;
