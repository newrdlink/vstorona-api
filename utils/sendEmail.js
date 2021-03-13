const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.yandex.ru',
  port: 465,
  secure: true, // use TLS
  service: 'Yandex',
  auth: {
    user: 'club-vs@yandex.ru',
    pass: 'dcyqcewzfuxeyrcq',
  },
});

const mailer = (message) => {
  transporter.sendMail(message, (err, info) => {
    if (err) return console.log(err);
    return console.log('Email sent: ', info);
  });
};

module.exports = mailer;

// const mailer = require('../utils/sendEmail');
// const message = {
//   from: 'Message from site <club-vs@yandex.ru>',
//   to: 'newrdlink@gmail.com',
//   subject: 'Test from nodejs',
//   text: 'Test is Ok!',
// };
// mailer(message);
