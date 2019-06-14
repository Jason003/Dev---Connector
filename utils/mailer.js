const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
const config = require('config');

exports.sendMail = async emailData => {
  const transporter = nodemailer.createTransport(
    smtpTransport({
      service: config.get('emailService'),
      auth: {
        user: config.get('qqEmail'),
        pass: config.get('qqEmailPassword')
      }
    })
  );

  try {
    await transporter.sendMail(emailData);
    console.log(`Email sent`);
  } catch (error) {
    console.log(`Problem sending email: ${error}`);
  }
};
