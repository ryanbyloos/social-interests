const mongoose = require("mongoose");

const Book = mongoose.model(
  "Book",
  new mongoose.Schema({
    title: String,
    author: String,
    year: Number,
    genre: [String],
    description: String,
    image: String
  })
);

module.exports = Book;