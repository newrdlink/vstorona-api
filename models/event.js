const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({

  type: {
    type: String,
    enum: ['festival'],
  },

  startTime: {
    type: Date,
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
    required: true,
  },

  images: {
    type: [{
      name: {
        type: String,
      },
      link: {
        type: String,
      },
    }],
    default: [],
  },

  description: {
    type: [{
      type: String,
    }],
    default: [],
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
