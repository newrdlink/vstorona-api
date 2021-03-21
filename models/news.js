const mongoose = require('mongoose');
const moment = require('moment');

const currentDate = moment().utc(3);

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    require: true,
  },
  link: {
    type: String,
    required: true,
  },
  image: {
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
    // default: Date.now,
    default: currentDate,
  },
});

module.exports = mongoose.model('news', newsSchema);
