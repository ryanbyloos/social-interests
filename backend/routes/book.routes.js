const controller = require("../controllers/book.controller");
module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/book", controller.getAllBooks);
  app.get("/api/book/:id", controller.getBookById);

  app.post("/api/book", controller.createBook);

  app.put("/api/book/:id", controller.updateBook);

  app.delete("/api/book/:id", controller.deleteBook);
};
