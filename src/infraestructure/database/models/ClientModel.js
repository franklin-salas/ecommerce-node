const mongoose = require('../mongoose');

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, required: true, trim: true },
  address: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);
