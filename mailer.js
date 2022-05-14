const nodemailer = require('nodemailer');

const { NODEMAILER_EMAIL, NODEMAILER_PASSWORD } = process.env;

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: NODEMAILER_EMAIL,
    pass: NODEMAILER_PASSWORD,
  },
  from: 'Me me@test.com',
});

/**
 * @description Send email to the user
 * @param {object} options
 * @param {string} options.to
 * @param {string} options.subject
 * @param {string} options.message
 */
exports.sendContactEmail = ({ to, name, message }) => {
  const mailOptionsToOwner = {
    to: email,
    subject: `Contact Form Submission from ${name} ${to}`,
    html: `
        <h1>Contact Form Submission</h1>
        <p>Name: ${name} ${to}</p>
        <p>${message}</p>
        `,
  };

  const mailOptionsToUser = {
    to,
    subject: 'Thanks',
    text: 'I will get back to you soon',
  };

  return Promise.all([
    transport.sendMail(mailOptionsToOwner),
    transport.sendMail(mailOptionsToUser),
  ]);
};
