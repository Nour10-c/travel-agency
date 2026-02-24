const express = require('express');
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');
const router = express.Router();

// GET /api/bookings - Récupérer les réservations de l'utilisateur connecté
router.get('/', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('trip');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/bookings - Créer une nouvelle réservation
router.post('/', auth, async (req, res) => {
  const { tripId } = req.body;
  try {
    const booking = new Booking({
      user: req.user.id,
      trip: tripId
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/bookings/:id - Mettre à jour le statut (ex. confirmer)
router.put('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking || booking.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    booking.status = req.body.status || booking.status;
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;