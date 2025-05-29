import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Drox = () => {
  const [bets, setBets] = useState([]);
  const [newBet, setNewBet] = useState({ title: '', optionA: '', optionB: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchBets();
  }, []);

  const fetchBets = async () => {
    try {
      const response = await axios.get('/api/bets/list');
      setBets(response.data);
    } catch (error) {
      console.error('Error fetching bets:', error);
    }
  };

  const createBet = async () => {
    try {
      await axios.post('/api/bets/create', newBet);
      setMessage('Bet created successfully!');
      fetchBets();
      setNewBet({ title: '', optionA: '', optionB: '' });
    } catch (error) {
      setMessage('Error creating bet');
      console.error(error);
    }
  };

  const joinBet = async (betId, choice) => {
    try {
      await axios.post(`/api/bets/join`, { betId, choice });
      setMessage('You joined the bet!');
    } catch (error) {
      setMessage('Failed to join bet');
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '2rem', background: '#111', color: '#fff', minHeight: '100vh' }}>
      <h1>Drox – Betting Arena</h1>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Create New Bet</h2>
        <input
          type="text"
          placeholder="Bet Title"
          value={newBet.title}
          onChange={(e) => setNewBet({ ...newBet, title: e.target.value })}
        /><br/>
        <input
          type="text"
          placeholder="Option A"
          value={newBet.optionA}
          onChange={(e) => setNewBet({ ...newBet, optionA: e.target.value })}
        /><br/>
        <input
          type="text"
          placeholder="Option B"
          value={newBet.optionB}
          onChange={(e) => setNewBet({ ...newBet, optionB: e.target.value })}
        /><br/>
        <button onClick={createBet}>Create Bet</button>
        <p>{message}</p>
      </div>

      <div>
        <h2>Active Bets</h2>
        {bets.map((bet) => (
          <div key={bet.id} style={{ marginBottom: '1rem', padding: '1rem', background: '#222' }}>
            <h3>{bet.title}</h3>
            <button onClick={() => joinBet(bet.id, 'A')}>{bet.optionA}</button>
            <button onClick={() => joinBet(bet.id, 'B')}>{bet.optionB}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Drox;