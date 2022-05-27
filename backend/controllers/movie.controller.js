const db = require("../models");
const Movie = db.movie;

exports.getMovies = (req, res) => {
  if (req.query.title) {
    Movie.find({ title: req.query.title }, (err, movie) => {
      if (err) {
        res.send(err);
      }
      res.json(movie);
    });
  } else if (req.query.id) {
    Movie.findById(req.query.id, (err, movie) => {
      if (err) {
        res.send(err);
      }
      res.json(movie);
    });
  } else {
    Movie.find({}, (err, movie) => {
      if (err) {
        res.send(err);
      }
      res.json(movie);
    });
  }
};
