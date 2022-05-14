require('dotenv').config();
const path = require('path');
const express = require('express');

const { sendContactEmail } = require('./mailer');

const { PORT } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'public')));

/**
 * @description Accept contact form data and send it to the server
 *
 * @api POST /api/contact
 *
 * @data {string} name, {string} email, {string} message
 *
 * @access public
 */
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await sendContactEmail({ to: email, name, message });

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      data: { name, email, message },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Unable to process request',
      data: {},
    });
  }
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${8080}`)
);
