const mongoose = require("mongoose");
const Book = mongoose.model(
  "Book",
  new mongoose.Schema({
    title: String,
    isbn: String,
    author: String,
    year: Number,
    genre: [String],
    author: [String],
    description: String,
    image: String
  })
);
module.exports = Book;