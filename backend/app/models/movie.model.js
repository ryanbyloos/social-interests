const mongoose = require("mongoose");
const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: String,
    director: String,
    year: Number,
    genre: [String],
    author: [String],
    description: String,
    image: String
  })
);
module.exports = Movie;