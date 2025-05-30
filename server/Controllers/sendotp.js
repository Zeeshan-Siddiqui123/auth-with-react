const nodemailer = require('nodemailer');

const sendOtp = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'zeeshansd767@gmail.com',
        pass: 'uoepvgagemecreom', 
      },
    });

    const mailOptions = {
      from: '"Zeeshan - OTP Verification" <zeeshansd767@gmail.com>',
      to: email,
      subject: 'Your OTP Code',
      html: `<h3>Your OTP is:</h3><h2>${otp}</h2><p>Please use this code to complete your verification.</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('OTP sent: ', info.messageId);
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
};

module.exports = sendOtp;
