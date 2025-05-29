import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home3D.css';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', balance: '' });

  useEffect(() => {
    fetch('http://localhost:4000/api/user/info')
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error('❌ Failed to load user info:', err));
  }, []);

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
    <div className="home3d-container">
      <div className="home3d-header">
        <h1>Aqro AI Center</h1>
        <div className="user-info">
          <span>{user.name}</span> | <strong>{user.balance}</strong>
        </div>
        <button className="logout-btn">Logout</button>
      </div>

      <div className="bot-grid">
        {bots.map((bot, idx) => (
          <div key={idx} className="bot-card" onClick={() => navigate(bot.path)}>
            <div className="bot-inner">
              <div className="bot-front">
                🤖 {bot.name}
              </div>
              <div className="bot-back">
                Enter {bot.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
