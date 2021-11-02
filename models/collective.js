const mongoose = require('mongoose');

const collectiveSchema = new mongoose.Schema({

  type: {
    type: String,
    enum: ['kids', 'youngs', 'adults'],
    required: true,
  },

  chosen: {
    type: String,
    default: '',
  },

  subtype: {
    type: String,
    enum: [
      'arts and crafts',
      'dance',
      'vocal',
      'theatrical',
      'art',
      'photography art',
    ],
    required: true,
  },

  images: [],

  supervisor: {
    type: String,
    required: true,
  },

  position: [],

  phone: {
    type: String,
    default: '542-16-34',
    required: true,
  },

  price: {
    type: Number,
    default: 0,
  },

  time: [],

  ageStart: {
    type: Number,
    required: true,
  },

  ageEnd: {
    type: Number,
    required: true,
  },

  link: {
    type: String,
  },

  name: {
    type: String,
    require: true,
    unique: true,
  },

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

module.exports = mongoose.model('collective', collectiveSchema);
