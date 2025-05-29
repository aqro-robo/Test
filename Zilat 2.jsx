import React, { useState } from 'react';

const Zilat = () => {
  const [belief, setBelief] = useState('');
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!belief.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:7000/api/zilat/checkBelief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ belief }),
      });
      const data = await res.json();
      setExplanation(data.explanation || 'No explanation found.');
    } catch (err) {
      setExplanation('Error checking belief.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h2>🧠 Zilat – Fact Checker & Anti-Superstition AI</h2>
      <input
        type="text"
        placeholder="Enter a belief or question..."
        value={belief}
        onChange={(e) => setBelief(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 10 }}
      />
      <button onClick={handleCheck} disabled={loading}>
        {loading ? 'Checking...' : '🔍 Analyze Belief'}
      </button>
      <div style={{ marginTop: 20, whiteSpace: 'pre-wrap', backgroundColor: '#fffde7', padding: 15, borderRadius: 8 }}>
        {explanation}
      </div>
    </div>
  );
};

export default Zilat;
