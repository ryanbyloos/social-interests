const mongoose = require("mongoose");

/**
 * @description
 * The schema for the book model
 */
const Book = mongoose.model(
  "Book",
  new mongoose.Schema({
    title: String,
    author: [String],
    year: Number,
    image: String,
  })
);

module.exports = Book;
