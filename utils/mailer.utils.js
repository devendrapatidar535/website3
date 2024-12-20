//import { nodemailer } from 'nodemailer';
const nodemailer = require('nodemailer');
 const sendRegistrationEmail = async ( 
    name,
    email
  ) => {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
          user: "devpatidar593@gmail.com",
          pass: "jkfi twjv poff qrom",
        },
      });
  
      const mailOptions = {
        from: "devpatidar593@gmail.com",
        to: email,
        subject: 'Welcome to our website!',
        text: `
            <h1>Welcome, ${name}!</h1>
            <p>Thank you for registering with us. We're excited to have you on board!</p>
            <p>Feel free to explore our platform and reach out if you have any questions.</p>
        `, // HTML body
      };
  
      await transporter.sendMail(mailOptions);
      console.log("Mail sent!");
    } catch (error) {
      console.log(error);
    }
  };

  module.exports= sendRegistrationEmail;