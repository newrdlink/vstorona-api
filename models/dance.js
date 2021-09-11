const mongoose = require('mongoose');

const danceSchema = new mongoose.Schema({

  title: {
    type: String,
  },

  subtitle: {
    type: String,
  },

  startTime: {
    type: String,
  },

  endTime: {
    type: String,
  },

  days: {
    type: [
      {
        type: String,
      },
    ],
    default: [],
  },

  description: {
    type: String,
  },

  compositionServices: {
    type: [{
      type: String,
    }],
    default: [],
  },
});

module.exports = mongoose.model('dance', danceSchema);
