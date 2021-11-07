const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({

  title: {
    type: String,
    require: true,
  },

  description: {
    type: String,
    require: true,
  },

  link: {
    type: String,
    require: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('video', videoSchema);
