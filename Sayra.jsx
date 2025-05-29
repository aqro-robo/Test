import React, { useState } from 'react';

const Sayra = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:7000/api/sayra/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setResult(data.result || 'No result found.');
    } catch (err) {
      setResult('Error searching.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h2>🔎 Sayra – Smart Search Assistant</h2>
      <input
        type="text"
        placeholder="Ask something..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: '100%', padding: 10, fontSize: 16, marginBottom: 10 }}
      />
      <button onClick={handleSearch} disabled={loading} style={{ padding: '10px 20px' }}>
        {loading ? 'Searching...' : 'Search'}
      </button>
      <div style={{ marginTop: 20, whiteSpace: 'pre-wrap', backgroundColor: '#f4f4f4', padding: 15 }}>
        {result}
      </div>
    </div>
  );
};

export default Sayra;
