import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:7000/api/user/info')
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  const robots = [
    { name: 'Petros', path: '/petros' },
    { name: 'Reela', path: '/reela' },
    { name: 'Sayra', path: '/sayra' },
    { name: 'Zentrox', path: '/zentrox' },
    { name: 'Nava', path: '/nava' },
    { name: 'Azra', path: '/azra' },
    { name: 'Mivara', path: '/mivara' },
    { name: 'Zilat', path: '/zilat' }
  ];

  if (!user) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <h1>🏠 Welcome, {user.name}</h1>
      <p><strong>📍 Location:</strong> {user.location}</p>
      <p><strong>💰 Balance:</strong> ${user.balance}</p>
      <p><strong>🤖 Favorite Robot:</strong> {user.favoriteRobot}</p>

      <h3>🚀 Choose your robot:</h3>
      <div style={styles.robotGrid}>
        {robots.map((bot, i) => (
          <button key={i} onClick={() => navigate(bot.path)} style={styles.robotBtn}>
            {bot.name}
          </button>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: 30, fontFamily: 'Arial', textAlign: 'center' },
  robotGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 10, marginTop: 20 },
  robotBtn: { padding: 10, background: '#111', color: '#0f0', border: '1px solid #0f0', borderRadius: 5, cursor: 'pointer' }
};

export default Home;
