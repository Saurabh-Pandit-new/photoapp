// const Notification = require('../models/notificationModel');

// const createNotification = async (recipient, message, type, metadata) => {
//   const notification = await Notification.create({
//     recipient,
//     message,
//     type,
//     metadata,
//   });
//   return notification;
// };

// const getNotifications = async (req, res) => {
//   try {
//     const notifications = await Notification.find({ recipient: req.user._id });
//     res.status(200).json({ success: true, notifications });
//   } catch (error) {
//     res.status(500).json({ success: false, error: 'Failed to fetch notifications' });
//   }
// };

// module.exports = { createNotification, getNotifications };
