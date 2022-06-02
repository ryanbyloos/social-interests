const controller = require("../controllers/role.controller");
module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/role", controller.getRoles);
  app.get("/api/role/isadmin", controller.isAdmin);
};
