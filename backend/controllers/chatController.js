// // controllers/chatController.js
// const Chat = require('../models/chatModel');

// // Send a message
// const sendMessage = async (req, res) => {
//   const { chatId, senderId, messageText } = req.body;

//   try {
//     const chat = await Chat.findById(chatId);

//     if (!chat) return res.status(404).json({ message: 'Chat not found' });

//     const newMessage = {
//       sender: senderId,
//       message: messageText,
//       read: false,
//     };

//     chat.messages.push(newMessage);
//     await chat.save();

//     res.status(200).json({ message: 'Message sent', chat });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get messages for a chat
// const getMessages = async (req, res) => {
//   const { chatId } = req.params;

//   try {
//     const chat = await Chat.findById(chatId).populate('participants', 'name');
//     if (!chat) return res.status(404).json({ message: 'Chat not found' });

//     res.status(200).json(chat.messages);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// module.exports = {
//     sendMessage,
//     getMessages
    
// };
