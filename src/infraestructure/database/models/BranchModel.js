const mongoose = require('../mongoose');

const branchSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  manager: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true }
}, { timestamps: true });

module.exports = mongoose.model('Branch', branchSchema);