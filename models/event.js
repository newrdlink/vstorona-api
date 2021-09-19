const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({

  type: {
    type: String,
    enum: ['default', 'festival'],
  },

  startTime: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    require: true,
  },

  subtitle: {
    type: String,
    require: true,
  },

  link: {
    type: String,
  },

  images: [],

  description: {
    type: String,
    require: true,
  },

  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    // select: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('event', eventSchema);
