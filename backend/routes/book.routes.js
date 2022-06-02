const express = require("express");
const controller = require("../controllers/book.controller");

/**
 * The routes for the books
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

  app.get("/api/book", controller.getBooks);
};
