const mongoose = require('mongoose');

const collectiveSchema = new mongoose.Schema({

  type: {
    type: String,
    enum: ['Для детей', 'Для взрослых', 'Для молодёжи'],
    required: true,
  },

  chosen: {
    type: Boolean,
    default: false,
  },

  subtype: {
    type: String,
    enum: [
      'Декоративно-прикладное творчество',
      'Танцевальные',
      'Вокальные',
      'Театральные',
      'Изобразительное искусство',
      'Фотоискусство',
    ],
    required: true,
  },

  images: [],

  supervisor: {
    type: String,
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
    required: true,
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
