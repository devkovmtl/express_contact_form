require('dotenv').config();
const path = require('path');
const express = require('express');

const { PORT } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/', (req, res) => {
  res.json({ success: true, data: 'Hello World' });
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${8080}`)
);
