const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

const SECRET = process.env.JWT_SECRET || 'aqro_secret';
const chatFile = path.join(__dirname, 'chat_data.json');
if (!fs.existsSync(chatFile)) fs.writeFileSync(chatFile, JSON.stringify([]));

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Aqro Real-time Chat is Live ✅'));

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    const user = jwt.verify(token, SECRET);
    socket.user = user;
    next();
  } catch (err) {
    next(new Error("Authentication error"));
  }
});

io.on('connection', (socket) => {
  const userId = socket.user.id;
  console.log(`✅ User connected: ${userId}`);

  socket.on('sendMessage', (data) => {
    const chatData = JSON.parse(fs.readFileSync(chatFile));
    chatData.push(data);
    fs.writeFileSync(chatFile, JSON.stringify(chatData, null, 2));
    io.emit('receiveMessage', data);
  });

  socket.on('disconnect', () => {
    console.log(`❌ User disconnected: ${userId}`);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Real-time server running on http://localhost:${PORT}`);
});
