const mongoose = require('mongoose');

const moment = require('moment');

const currentDate = moment().utc(3);

const documentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [
      'Нормативные документы',
      'Стандарты безопасной организации труда работников',
      'Планы и отчёты финансово-хозяйственной деятельности',
      'Положение об организации деятельности по оказанию платных услуг',
      'Государственное задание',
    ],
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
    // default: Date.now,
    default: currentDate,
  },
});

module.exports = mongoose.model('document', documentSchema);
