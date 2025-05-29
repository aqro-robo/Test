import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editName, setEditName] = useState('');
  const [editRobot, setEditRobot] = useState('');

  useEffect(() => {
    fetch('http://localhost:7000/api/user/info')
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setEditName(data.name);
        setEditRobot(data.favoriteRobot);
      });
  }, []);

  const handleSave = async () => {
    const response = await fetch('http://localhost:7000/api/user/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editName, favoriteRobot: editRobot })
    });
    const data = await response.json();
    setUser(data.updated);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <h2>👤 User Profile</h2>
      <div style={styles.field}><strong>Email:</strong> {user.email}</div>
      <div style={styles.field}><strong>Location:</strong> {user.location}</div>
      <div style={styles.field}><strong>Balance:</strong> ${user.balance}</div>

      <div style={styles.edit}>
        <label>Name:</label>
        <input value={editName} onChange={e => setEditName(e.target.value)} style={styles.input} />
      </div>

      <div style={styles.edit}>
        <label>Favorite Robot:</label>
        <input value={editRobot} onChange={e => setEditRobot(e.target.value)} style={styles.input} />
      </div>

      <button onClick={handleSave} style={styles.button}>💾 Save</button>
    </div>
  );
};

const styles = {
  container: { padding: 20, fontFamily: 'Arial' },
  field: { marginBottom: 10 },
  edit: { marginBottom: 10, display: 'flex', gap: 10, alignItems: 'center' },
  input: { padding: 5, flex: 1 },
  button: { padding: '8px 16px', background: '#28a745', color: '#fff', border: 'none', borderRadius: 5 }
};

export default Profile;
