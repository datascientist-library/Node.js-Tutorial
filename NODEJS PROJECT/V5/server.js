require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(express.json());
app.use(express.static('public'));


// Mongodb & data modeling [UPDATED]
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'agent'], default: 'user' }
});

const TicketSchema = new mongoose.Schema({
  ticketNumber: { type: Number },
  title: { type: String, required: true },
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const MessageSchema = new mongoose.Schema({
  ticketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
const Ticket = mongoose.model('Ticket', TicketSchema);
const Message = mongoose.model('Message', MessageSchema);


// Authentication Middleware
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};


// Auth Routes
app.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword, role });
  await user.save();
  res.status(201).json({ message: 'User created' });
});

app.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token, role: user.role, userId: user._id });
});


// Ticket Routes [UPDATED]
app.post('/tickets', auth, async (req, res) => {
  const count = await Ticket.countDocuments(); 
  const ticket = new Ticket({ 
    ticketNumber: count + 1, 
    title: req.body.title, 
    customer: req.user._id 
  });
  await ticket.save();
  res.status(201).json(ticket);
});

// GET list of tickets (Users see their own and agents see all)
app.get('/tickets', auth, async (req, res) => {
  const query = req.user.role === 'user' ? { customer: req.user._id } : {};
  const tickets = await Ticket.find(query).sort({ createdAt: 1 }); 
  res.json(tickets);
});

// Get chat history for a specific ticket
app.get('/tickets/:id/history', auth, async (req, res) => {
  const messages = await Message.find({ ticketId: req.params.id })
    .populate('sender', 'username role')
    .sort({ createdAt: 1 });
  res.json(messages);
});


// WebSockets (Chat System)
io.on('connection', (socket) => {
  console.log('A client connected:', socket.id);

  // Client joins a specific ticket room
  socket.on('joinTicket', (ticketId) => {
    socket.join(ticketId);
    console.log(`Socket ${socket.id} joined ticket: ${ticketId}`);
  });

  // Handle incoming messages with Error Handling
  socket.on('sendMessage', async (data) => {
    try {
      const { ticketId, senderId, content } = data;
      
      // Save to database for history
      const message = new Message({ ticketId, sender: senderId, content });
      await message.save();

      // Broadcast to everyone in the ticket room
      const populatedMessage = await message.populate('sender', 'username role');
      io.to(ticketId).emit('newMessage', populatedMessage);
      
    } catch (error) {
      // Send the error back 
      socket.emit('error', { message: 'Failed to send message. Check your IDs.', details: error.message });
      console.error('Socket Error:', error.message);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));