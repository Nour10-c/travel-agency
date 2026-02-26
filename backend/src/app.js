const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();


app.use(helmet());
app.use(morgan('combined'));
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/trips', require('./routes/trips'));
app.use('/api/bookings', require('./routes/bookings'));


app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});


app.use(require('./middleware/errorHandler'));

module.exports = app;