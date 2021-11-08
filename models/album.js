const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({

  title: {
    type: String,
    require: true,
  },

  link: {
    type: String,
    require: true,
  },

  images: [],

  createdAt: {
    type: Date,
    default: Date.now,
    require: true,
  },
});

module.exports = mongoose.model('album', albumSchema);
