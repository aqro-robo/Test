import React, { useState } from 'react';

const PersonalityBuilder = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:7000/api/personality/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputText }),
      });
      const data = await res.json();
      setResult(data.analysis || 'No analysis available');
    } catch (err) {
      setResult('Error during personality analysis.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h2>🧬 Personality Builder AI</h2>
      <p>Enter a short text about yourself or your past chats to analyze your personality.</p>
      <textarea
        rows={6}
        style={{ width: '100%', padding: 10 }}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Write something about yourself..."
      />
      <button onClick={handleAnalyze} disabled={loading} style={{ marginTop: 10 }}>
        {loading ? 'Analyzing...' : '🔍 Analyze Personality'}
      </button>
      {result && (
        <div style={{ marginTop: 20, whiteSpace: 'pre-wrap', backgroundColor: '#f0f0f0', padding: 15, borderRadius: 8 }}>
          {result}
        </div>
      )}
    </div>
  );
};

export default PersonalityBuilder;
