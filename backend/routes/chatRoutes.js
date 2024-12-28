// // routes/chatRoutes.js
// const express = require('express');
// const {sendChatRequest,updateChatRequestStatus} = require('../controllers/chatRequestController');
// const {  sendMessage,getMessages } = require('../controllers/chatController');
// const { authorizePhotographer }=require('../middlewares/poauthMiddleware');
// const { protect } = require('../middlewares/authMiddleware');
// const router = express.Router();

// // Chat request routes
// router.post('/chat/request', protect,sendChatRequest);
// router.post('/chat/request/status', authorizePhotographer,updateChatRequestStatus);

// // Chat messaging routes
// router.post('/chat/send-message', [protect, authorizePhotographer],sendMessage);
// router.get('/chat/:chatId/messages', [protect, authorizePhotographer],getMessages);

// module.exports = router;
