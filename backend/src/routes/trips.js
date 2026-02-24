const express = require('express');
const Trip = require('../models/Trip');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  const trips = await Trip.find();
  res.json(trips);
});

router.post('/', auth, async (req, res) => {
  const trip = new Trip(req.body);
  await trip.save();
  res.status(201).json(trip);
});

module.exports = router;