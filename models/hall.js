const mongoose = require('mongoose');

const hallSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [
      'big', 'choreography', 'costume', 'foyer', 'showroom',
    ],
    required: true,
  },

  description: {
    title: {
      type: String,
      required: true,
    },
    square: {
      type: Number,
      required: true,
    },
    roominess: {
      type: Number,
      required: true,
    },
    chairs: {
      type: Number,
      required: true,
    },
    tables: {
      type: Number,
      required: true,
    },
    wifi: {
      type: Boolean,
      required: true,
    },
  },

  images: {
    type: [{
      name: String,
      link: String,
    }],
    default: [],
  },

  price: {
    type: Number,
    required: true,
  },

  composition: {
    administrator: {
      type: Boolean,
      required: true,
    },
    wardrobe: {
      type: Boolean,
      required: true,
    },
    assistant: {
      type: Boolean,
      required: true,
    },
    cleaning: {
      type: Boolean,
      required: true,
    },
  },

  soundServices: {
    type: [{
      String,
    }],
    default: [],
  },

  linkToPrice: {
    name: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },

  ps: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('hall', hallSchema);
