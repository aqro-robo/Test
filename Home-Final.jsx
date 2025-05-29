import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const user = {
    name: "AqroUser",
    balance: "Ξ 4.21"
  };

  const bots = [
    { name: "Petros", path: "/petros" },
    { name: "Reela", path: "/reela" },
    { name: "Sayra", path: "/sayra" },
    { name: "Zentrox", path: "/zentrox" },
    { name: "Azra", path: "/azra" },
    { name: "Nava", path: "/nava" },
    { name: "Zilat", path: "/zilat" }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Aqro AI Center</h1>
        <div>
          <span>{user.name}</span> | <strong>{user.balance}</strong>
        </div>
        <button style={styles.logout}>Logout</button>
      </div>

      <div style={styles.grid}>
        {bots.map((bot, idx) => (
          <button key={idx} onClick={() => navigate(bot.path)} style={styles.card}>
            🤖 {bot.name}
          </button>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    background: '#111',
    minHeight: '100vh',
    color: '#eee',
    padding: 20
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
    borderBottom: '1px solid #444'
  },
  logout: {
    background: '#222',
    color: '#f55',
    border: 'none',
    padding: '6px 12px',
    cursor: 'pointer',
    borderRadius: 4
  },
  grid: {
    marginTop: 30,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: 20
  },
  card: {
    background: '#222',
    color: '#0f0',
    padding: 20,
    fontSize: '1.1rem',
    border: '1px solid #333',
    borderRadius: 8,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'center'
  }
};

export default Home;
