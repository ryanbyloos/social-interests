const express = require("express");
const controller = require("../controllers/movie.controller");

/**
 * The routes for the movies
 * @param {express.Application} app The express application
 */
module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/movie", controller.getMovies);
};
