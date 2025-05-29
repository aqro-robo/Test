import React, { useState } from 'react';

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [analysis, setAnalysis] = useState(null);

  const fetchSuggestions = async () => {
    const response = await fetch('http://localhost:5000/api/match/suggest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        location: 'Tehran',
        interests: ['AI', 'Music', 'Remote Work'],
        chatHistory: ['I love working with AI and making music.']
      })
    });
    const data = await response.json();
    setSuggestions(data.suggestions);
    setAnalysis(data.analysis);
  };

  return (
    <div style={styles.container}>
      <h1>🤝 Suggested Connections</h1>
      <button onClick={fetchSuggestions} style={styles.button}>🔍 Analyze & Suggest</button>

      {analysis && (
        <div style={styles.analysis}>
          🧠 Lie Detection Score: <strong>{analysis.liarScore}</strong>
        </div>
      )}

      <div style={styles.grid}>
        {suggestions.map((s, i) => (
          <div key={i} style={styles.card}>
            <h2>{s.name}</h2>
            <p>Type: <strong>{s.type}</strong></p>
            <p>Location: {s.location}</p>
            <p>Match: <strong>{s.matchPercent}%</strong></p>
            <p>Common Traits: {s.commonTraits.join(', ')}</p>
            <button style={styles.startBtn}>Start Chat</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: 20, fontFamily: 'Arial' },
  button: { padding: '10px 20px', marginBottom: 20, fontSize: 16 },
  analysis: { marginBottom: 20, color: '#0a0' },
  grid: { display: 'flex', gap: 20, flexWrap: 'wrap' },
  card: { padding: 20, border: '1px solid #ccc', borderRadius: 10, width: 250 },
  startBtn: { marginTop: 10, padding: '5px 10px', background: '#0088ff', color: '#fff', border: 'none', borderRadius: 5 }
};

export default Suggestions;
