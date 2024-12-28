const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');
const { setIO, getIO, onlineUsers } = require('./utils/socketManager');

// Import routes
const addAdminRoutes = require('./routes/addAdminRoute');
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const adminRoutes = require('./routes/adminRoutes');
const searchRoute = require('./routes/searchRoute');
const cartRoutes = require('./routes/cartRoutes');
// const notificationRoutes = require('./routes/notificationRoutes');
const orderRoutes = require('./routes/orderRoutes');
const ecomRoutes = require('./routes/ecom');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to the database
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Allow requests from the Vite frontend
app.use(
  cors({
    origin: 'http://localhost:5173', // Vite dev server origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// Define API routes
app.use('/api/addadmin', addAdminRoutes);
// app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/searchpath', searchRoute);
app.use('/api/cart', cartRoutes);
// app.use('/api/notifications', notificationRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/ecom', ecomRoutes);

// Serve static frontend (for production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Set Socket.IO instance in the manager
setIO(io);

// Manage online users
io.on('connection', (socket) => {
  console.log(`A user connected: ${socket.id}`);

  // Register a user with their ID
  socket.on('join', (userId) => {
    if (userId) {
      onlineUsers[userId] = socket.id;
      console.log(`User ${userId} connected with socket ID ${socket.id}`);
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`A user disconnected: ${socket.id}`);
    for (const [userId, socketId] of Object.entries(onlineUsers)) {
      if (socketId === socket.id) {
        delete onlineUsers[userId];
      }
    }
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

module.exports = app;
