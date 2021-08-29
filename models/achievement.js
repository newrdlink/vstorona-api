const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
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
    // default: currentDate,
  },
  // title: {
  //   type: String,
  //   required: true,
  // },
  // link: {
  //   type: String,
  //   required: true,
  // },
  // creator: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'user',
  //   required: true,
  //   // select: false,
  // },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  //   // default: currentDate,
  // },
});

module.exports = mongoose.model('achievement', achievementSchema);
