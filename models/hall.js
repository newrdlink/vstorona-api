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
  // created with Object ID
  // images: {
  //   type: [{
  //     name: String,
  //     link: String,
  //   }],
  //   default: [],
  // },
  images: {
    type: [{
      name: {
        type: String,
      },
      link: {
        type: String,
      },
    }],
    default: [],
  },

  price: {
    type: Number,
    required: true,
  },

  compositionServices: {
    type: [{
      type: String,
    }],
    default: [],
  },

  descriptionServices: {
    type: [{
      type: String,
    }],
    default: [],
  },

  soundServices: {
    type: [{
      type: String,
    }],
    default: [],
  },

  linkToPrice: {
    type: String,
    required: true,
  },

  ps: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('hall', hallSchema);
