import React, { useState } from 'react';

const Zentrox = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [vpnInfo, setVpnInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkLink = async () => {
    if (!url.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:7000/api/zentrox/checkLink', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ status: 'error', reason: 'Failed to analyze link' });
    } finally {
      setLoading(false);
    }
  };

  const getVPN = async () => {
    const res = await fetch('http://localhost:7000/api/zentrox/vpnSuggestion');
    const data = await res.json();
    setVpnInfo(data.vpn);
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h2>🛡 Zentrox – Security & Privacy Assistant</h2>

      <input
        type="text"
        placeholder="Enter URL to check..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 10 }}
      />

      <button onClick={checkLink} disabled={loading} style={{ marginRight: 10 }}>
        {loading ? 'Checking...' : '🔍 Check Security'}
      </button>

      <button onClick={getVPN}>🔐 Get VPN Suggestion</button>

      {result && (
        <div style={{ marginTop: 20, backgroundColor: '#f4f4f4', padding: 15, borderRadius: 8 }}>
          <strong>Status:</strong> {result.status} <br />
          <strong>Reason:</strong> {result.reason}
        </div>
      )}

      {vpnInfo && (
        <div style={{ marginTop: 20, backgroundColor: '#e0f7fa', padding: 15, borderRadius: 8 }}>
          <h4>{vpnInfo.provider}</h4>
          <p>{vpnInfo.description}</p>
          <a href={vpnInfo.link} target="_blank" rel="noreferrer">Setup VPN</a>
        </div>
      )}
    </div>
  );
};

export default Zentrox;
