const controller = require("../controllers/auth.controller");
module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/auth/signup", controller.signup);
  app.post("/api/auth/signin", controller.signin);
  app.get("/api/auth/whoami", controller.whoami);
  app.post("/api/auth/signout", controller.signout);
};
