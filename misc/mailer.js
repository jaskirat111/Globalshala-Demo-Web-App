const nodemailer = require("nodemailer");
const config = require("../config/mailer");
var smtpTransport = require("nodemailer-smtp-transport");

// const transport = nodemailer.createTransport({
//   host: 'email-smtp.us-east-1.amazonaws.com',
//     port: 465,
//     secure: true,
//   auth: {
//     user: 'jaskirat409@gmail.com', // generated ethereal user
//     pass: '9999888219'  // generated ethereal password
//   },
//   tls: {
//     rejectUnauthorized: false
//   }
// });

const transport = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: "GlobalShala@gmail.com",
      pass: "Qwerty123456@",
    },
  })
);

module.exports = {
  sendEmail(from, to, subject, html) {
    return new Promise((resolve, reject) => {
      transport.sendMail({ from, subject, to, html }, (err, info) => {
        if (err) reject(err);
        resolve(info);
      });
    });
  },
};
