const express = require("express");
const controller = require("../controllers/user.controller");

/**
 * @description The routes for the users
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

  app.get("/api/user", controller.getUser);
  app.get("/api/user/:id/friends", controller.getUserFriends);
  app.get("/api/user/:id/friends/:friendId", controller.areFriends);
  app.get("/api/user/:id/books", controller.getUserBooks);
  app.get("/api/user/:id/movies", controller.getUserMovies);
  app.get("/api/user/:id/books/:bookId", controller.hasBook);
  app.get("/api/user/:id/movies/:movieId", controller.hasMovie);
  app.get("/api/user/similarity", controller.getSimilarity);
  app.get("/api/user/mostsimilar", controller.getTenMostSimilar);
  app.post("/api/user/:id/books", controller.addBook);
  app.post("/api/user/:id/movies", controller.addMovie);
  app.post("/api/user/:id/friends", controller.followFriend);
  app.put("/api/user/:id", controller.updateUser);
  app.delete("/api/user/:id", controller.deleteUser);
  app.delete("/api/user/:id/books/:bookId", controller.deleteBook);
  app.delete("/api/user/:id/movies/:movieId", controller.deleteMovie);
  app.delete("/api/user/:id/friends/:friendId", controller.deleteFriend);
};
