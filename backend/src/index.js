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

  socket.on('disconnect', () => {
    console.log('socket disconnected:', socket.id);
  });
});

server.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
