const controller = require("../controllers/movie.controller");
module.exports =  (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
    app.get("/api/movie", controller.getAllMovies);
    app.get("/api/movie/:id", controller.getMovieById);

    app.post("/api/movie", controller.createMovie);

    app.put("/api/movie/:id", controller.updateMovie);
    
    app.delete("/api/movie/:id", controller.deleteMovie);
}