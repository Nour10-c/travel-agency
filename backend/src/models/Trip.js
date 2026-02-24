const mongoose = require('mongoose');
const tripSchema = new mongoose.Schema({
  destination: { type: String, required: true },
  price: { type: Number, required: true },
  dates: {
    start: { type: Date, required: true },
    end: { type: Date, required: true }
  },
  description: String
});
module.exports = mongoose.model('Trip', tripSchema);