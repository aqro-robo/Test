import React, { useState } from 'react';
import axios from 'axios';

const Zilat = () => {
  const [belief, setBelief] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const famousQuotes = [
    "Science is the great antidote to the poison of enthusiasm and superstition. – Adam Smith",
    "Extraordinary claims require extraordinary evidence. – Carl Sagan",
    "It is wrong always, everywhere, and for anyone, to believe anything upon insufficient evidence. – W.K. Clifford"
  ];

  const handleAnalyze = async () => {
    setLoading(true);
    setResponse('');
    try {
      const res = await axios.post('/api/zilat/analyze', { belief });
      setResponse(res.data.result || 'No response');
    } catch (err) {
      setResponse('Zilat is not impressed. Try again with logic.');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', background: '#111', color: '#eee', minHeight: '100vh' }}>
      <h1>Zilat – Truth Seeker</h1>
      <p style={{ fontStyle: 'italic' }}>Got a superstition, myth, or weird claim? Zilat will roast it.</p>

      <textarea
        rows="4"
        cols="60"
        placeholder="Type a belief or claim..."
        value={belief}
        onChange={(e) => setBelief(e.target.value)}
        style={{ padding: '0.5rem', background: '#222', color: '#fff', border: '1px solid #444' }}
      /><br/><br/>

      <button onClick={handleAnalyze} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>

      <div style={{ marginTop: '2rem', background: '#222', padding: '1rem' }}>
        <h3>Zilat's Response:</h3>
        <p>{response}</p>
      </div>

      <div style={{ marginTop: '2rem', fontSize: '0.9rem' }}>
        <h4>Famous Quotes:</h4>
        <ul>
          {famousQuotes.map((q, i) => (
            <li key={i}>{q}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Zilat;