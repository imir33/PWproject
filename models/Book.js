const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  numberOfPages: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    default: 0,
  },
  finished: {
    type: Boolean,
    default: false,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  numberOfDays: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Book = mongoose.model('book', BookSchema);
