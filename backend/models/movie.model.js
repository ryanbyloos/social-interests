const mongoose = require("mongoose");

/**
 * @description The schema for the movie model
 */
const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: String,
    author: [String],
    year: Number,
  })
);

module.exports = Movie;
