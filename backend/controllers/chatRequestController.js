// const ChatRequest = require('../models/chatRequestModel');
// const Notification = require('../models/notificationModel');
// const { io, onlineUsers } = require('../server');  // Import Socket.IO instance

// const sendChatRequest = async (req, res) => {
//   const { photographerId } = req.body;
  
//   if (!req.user) {
//     console.error("User is not authenticated.");
//     return res.status(401).json({ message: 'User not authenticated' });
//   }

//   const userId = req.user._id;
//   console.log("Received chat request from user:", userId, "to photographer:", photographerId);  // Debug log

//   try {
//     const existingRequest = await ChatRequest.findOne({
//       user: userId,
//       photographer: photographerId,
//       status: 'pending',
//     });

//     console.log("Existing request:", existingRequest);  // Debug log

//     if (existingRequest) {
//       console.log("Chat request already exists.");
//       return res.status(400).json({ message: 'You already have a pending chat request.' });
//     }

//     const chatRequest = new ChatRequest({
//       user: userId,
//       photographer: photographerId,
//       status: 'pending',
//     });

//     await chatRequest.save();
//     res.status(200).json({ message: 'request sent', requestId: chatRequest._id});  // Debug log

//     // Create and save notification
//     const notification = new Notification({
//       recipient: photographerId,
//       recipientType: 'Photographer',
//       sender: userId,
//       senderType: 'User',
//       type: 'chat-request',
//       message: 'You have a new chat request.',
//     });

//     await notification.save();
//     console.log("Notification saved.");  // Debug log

//     // // Emit real-time notification to the photographer via Socket.IO
//     // if (onlineUsers[photographerId]) {
//     //   io.to(onlineUsers[photographerId]).emit('notification', {
//     //     message: 'You have a new chat request.',
//     //   });
//     // }

//     // // Send the response back to the client to stop loading
//     // res.status(201).json({ message: 'Chat request sent', chatRequest });
    
//   } catch (error) {
//     console.error('Error sending chat request:', error);  // Debug log
//     res.status(500).json({ message: 'Error sending chat request', error: error.message });
//   }
// };



// // Photographer accepts or declines the chat request
// const updateChatRequestStatus = async (req, res) => {
//   const { requestId, status } = req.body;  // Get requestId and status from request body
//   const photographerId = req.user._id;  // Get photographer ID from request

//   try {
//     // Find the chat request by ID
//     const chatRequest = await ChatRequest.findById(requestId);

//     if (!chatRequest || chatRequest.photographer.toString() !== photographerId.toString()) {
//       return res.status(404).json({ message: 'Chat request not found' });
//     }

//     if (status === 'accepted') {
//       chatRequest.status = 'accepted';

//       // Save notification for the user
//       const notification = new Notification({
//         recipient: chatRequest.user,
//         recipientType: 'User',
//         sender: photographerId,
//         senderType: 'Photographer',
//         type: 'request-accepted',
//         message: 'Your chat request has been accepted.',
//       });
//       await notification.save();

//       // Emit real-time notification to the user
//       if (onlineUsers[chatRequest.user]) {
//         io.to(onlineUsers[chatRequest.user]).emit('notification', {
//           message: 'Your chat request has been accepted.',
//         });
//       }
//     } else if (status === 'declined') {
//       chatRequest.status = 'declined';
//     } else {
//       return res.status(400).json({ message: 'Invalid status value' });
//     }

//     await chatRequest.save();
//     res.status(200).json({ message: `Chat request ${status}`, chatRequest });
//   } catch (error) {
//     console.error('Error updating chat request:', error);
//     res.status(500).json({ message: 'Error updating chat request', error: error.message });
//   }
// };
// module.exports = {
//   sendChatRequest,
//   updateChatRequestStatus
  
// };
