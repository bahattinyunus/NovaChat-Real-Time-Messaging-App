import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Message from './models/message.js';
import authRoutes from './routes/auth.js';
import { verifySocketToken } from './middleware/auth.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from NovaChat backend' });
});

app.use('/api/auth', authRoutes)

// Get recent messages from MongoDB
app.get('/api/messages', async (req, res) => {
  try {
    const msgs = await Message.find().sort({ ts: 1 }).limit(50).lean()
    res.json({ messages: msgs })
  } catch (err) {
    console.error('Error fetching messages', err)
    res.status(500).json({ error: 'Could not fetch messages' })
  }
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.use((socket, next) => {
  // extract token from socket handshake auth
  const token = socket.handshake.auth && socket.handshake.auth.token
  if (!token) return next()
  const payload = verifySocketToken(token)
  if (!payload) return next()
  socket.user = payload
  next()
})

io.on('connection', (socket) => {
  console.log('socket connected:', socket.id, 'user=', socket.user?.username || 'anon');

  socket.on('ping', (data) => {
    socket.emit('pong', { message: 'pong', data });
  });

  // Chat message handling (persist to MongoDB then broadcast)
  socket.on('chat:message', async (payload) => {
    try {
      const from = socket.user?.username || payload?.from || 'anon'
      const doc = await Message.create({ text: payload?.text || '', from, ts: payload?.ts ? new Date(payload.ts) : new Date() })
      const msg = { id: doc._id.toString(), text: doc.text, from: doc.from, ts: doc.ts }
      io.emit('chat:message', msg)
    } catch (err) {
      console.error('Failed to save message', err)
    }
  });

  socket.on('disconnect', () => {
    console.log('socket disconnected:', socket.id);
  });
});

// Connect to MongoDB then start server
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/novachat'
mongoose.connect(mongoUri, { autoIndex: false })
  .then(() => {
    console.log('Connected to MongoDB')
    server.listen(port, () => {
      console.log(`Backend listening on port ${port}`)
    })
  })
  .catch((err) => {
    console.error('MongoDB connection error', err)
    // still start server so REST endpoints (if any) can run in degraded mode
    server.listen(port, () => {
      console.log(`Backend listening on port ${port} (no Mongo)`)
    })
  })
