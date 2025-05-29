import React, { useState } from 'react';

const Nava = () => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRecommend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:7000/api/nava/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moodOrText: input }),
      });
      const data = await res.json();
      setSuggestions(data.suggestions || 'No suggestion found.');
    } catch (err) {
      setSuggestions('Error recommending music.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h2>🎧 Nava – Smart Music Recommender</h2>
      <input
        type="text"
        placeholder="Enter your mood or a sentence..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 10 }}
      />
      <button onClick={handleRecommend} disabled={loading}>
        {loading ? 'Loading...' : '🎶 Recommend Music'}
      </button>
      <div style={{ marginTop: 20, whiteSpace: 'pre-wrap', backgroundColor: '#f9f9f9', padding: 15, borderRadius: 8 }}>
        {suggestions}
      </div>
    </div>
  );
};

export default Nava;
