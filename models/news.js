const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },

  subtitle: {
    type: String,
    require: true,
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

module.exports = mongoose.model('news', newsSchema);
