const controller = require("../controllers/user.controller");
module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/user", controller.getUser);
  // app.get("/api/user/:id", controller.getUser);
  app.get("/api/user/:id/friends", controller.getUserFriends);
  app.get("/api/user/:id/books", controller.getUserBooks);
  app.get("/api/user/:id/movies", controller.getUserMovies);

  app.post("/api/user/:id/books", controller.addBook);
  app.post("/api/user/:id/movies", controller.addMovie);
  app.post("/api/user/:id/friends", controller.addFriend);

  app.put("/api/user/:id", controller.updateUser);

  app.delete("/api/user/:id", controller.deleteUser);
  app.delete("/api/user/:id/books/:bookId", controller.deleteBook);
  app.delete("/api/user/:id/movies/:movieId", controller.deleteMovie);
  app.delete("/api/user/:id/friends/:friendId", controller.deleteFriend);
};
