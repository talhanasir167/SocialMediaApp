const nodemailer = require('nodemailer');
const dotenv =require('dotenv').config();

// Create a transporter object using your email provider's SMTP settings
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});


module.exports = {
    sendRegistrationEmail: (body) => {
      const mailOptions = {
        from: 'talha.nasir@devsinc.com',
        to: body.email,
        subject: body.subject,
        text: body.text
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email: ', error);
        } else {
            console.log('Email sent: ', info.response);
        }
    });
    }
};
