import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from NovaChat backend' });
});

// Simple in-memory message store (demo only)
const messages = [];

app.get('/api/messages', (req, res) => {
  res.json({ messages: messages.slice(-50) });
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('socket connected:', socket.id);

  socket.on('ping', (data) => {
    socket.emit('pong', { message: 'pong', data });
  });

  // Chat message handling (in-memory broadcast)
  socket.on('chat:message', (payload) => {
    const msg = {
      id: Date.now().toString(),
      text: payload?.text || '',
      from: payload?.from || 'anon',
      ts: new Date().toISOString()
    };
    messages.push(msg);
    // emit to all connected sockets
    io.emit('chat:message', msg);
  });

  socket.on('disconnect', () => {
    console.log('socket disconnected:', socket.id);
  });
});

server.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
