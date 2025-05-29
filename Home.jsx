import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const partnerId = "user456"; // برای تست، ID کاربر مقابل ثابت شده

  return (
    <div style={{ padding: 20 }}>
      <h2>🏠 Welcome to Aqro</h2>
      <p>Start chatting with another user:</p>
      <button
        onClick={() => navigate(`/mongochat/${partnerId}`)}
        style={{ padding: '10px 20px', fontSize: '1rem' }}
      >
        💬 Start Chat with {partnerId}
      </button>
    </div>
  );
};

export default Home;
