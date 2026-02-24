const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middlewares
app.use(helmet());
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());

// Connexion DB
mongoose.connect(process.env.MONGO_URI);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/trips', require('./routes/trips'));
app.use('/api/bookings', require('./routes/bookings'));

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Middleware d'erreur global
app.use(require('./middleware/errorHandler'));

module.exports = app;