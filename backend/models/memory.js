const mongoose = require('mongoose');

const memorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  relation: {
    type: String,
    required: true,
    trim: true,
  },
  event: {
    type: String,
    required: true,
    trim: true,
  },
  notes: {
    type: String,
    trim: true, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Memory', memorySchema);