const mongoose = require("mongoose");

const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: String,
    author: String,
    year: Number,
    genre: [String],
    description: String,
    image: String,
  })
);

module.exports = Movie;
