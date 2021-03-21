const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.yandex.ru',
  port: 465,
  secure: true, // use TLS
  service: 'Yandex',
  auth: {
    user: 'club-vs@yandex.ru',
    pass: 'akhtavyyjncsewcj',
  },
});

function mailer(message) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(message, (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
}

module.exports = mailer;
