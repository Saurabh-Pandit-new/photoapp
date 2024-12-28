const nodemailer = require('nodemailer');

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, // SSL port for Gmail
    secure: true, // Use SSL
    auth: {
        user: 'cams.era.add@gmail.com', // Gmail username
        pass: 'xsxokygsgbpshxmw', // Gmail App Password (ensure this is stored securely in an environment variable)
    },
});

// Function to send email to Admin
const sendEmailToAdmin = async (adminEmail, subject, message) => {
    const mailOptions = {
        from: 'cams.era.add@gmail.com', // Sender address
        to: adminEmail,
        subject: subject,
        text: message,
    };

    try {
        const result = await transporter.sendMail(mailOptions);
        console.log('Email to Admin sent successfully:', result);
        return result;
    } catch (error) {
        console.error('Error sending email to Admin:', error);
        throw new Error('Error sending email to Admin');
    }
};

// Function to send email to User from Photographer
const sendEmailToUser = async ( userEmail, subject, message) => {
    const mailOptions = {
        from: 'cams.era.add@gmail.com', // Photographer's email
        to: userEmail, // User's email
        subject: subject,
        text: message,
    };

    try {
        const result = await transporter.sendMail(mailOptions);
        console.log('Email to User sent successfully:', result);
        return result;
    } catch (error) {
        console.error('Error sending email to User:', error);
        throw new Error('Error sending email to User');
    }
};

// Exporting the email functions
module.exports = {
    sendEmailToAdmin,
    sendEmailToUser,
};
