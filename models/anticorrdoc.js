const mongoose = require('mongoose');

const anticorrdocSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [
      'Нормативно-правовые и иные акты в сфере противодействия коррупции',
      'Методические материалы',
      'Формы документов для заполнения',
      'Сведения о доходах, расходах, об имуществе',
      'Комиссия по противодействию коррупции',
      'Обратная связь для сообщений о фактах коррупции',
      'Меры юридической ответственности',
      'Информационные материалы',
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
    default: Date.now,
    // default: currentDate,
  },
});

module.exports = mongoose.model('anticorrdoc', anticorrdocSchema);
