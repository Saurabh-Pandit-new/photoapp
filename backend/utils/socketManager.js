let ioInstance = null;
const onlineUsers = {}; // Object to store online users

// Set the Socket.IO instance
const setIO = (io) => {
  ioInstance = io;
};

// Get the Socket.IO instance
const getIO = () => {
  return ioInstance;
};

module.exports = { setIO, getIO, onlineUsers };
