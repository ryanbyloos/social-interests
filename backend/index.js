const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const bookRoutes = require("./routes/book.routes");

const fs = require("fs");
const StreamArray = require("stream-json/streamers/StreamArray");
const { Writable } = require("stream");

const port = process.env.PORT || 8080;
const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

authRoutes(app);
userRoutes(app);
bookRoutes(app);

app.listen(port, () => console.log(`App listening on port ${port}!`));

db.mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/social", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
    dbInit();
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

const dbInit = () => {
  db.role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new db.role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new db.role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });

  db.book.estimatedDocumentCount((err, count) => {
    let i = 0;
    if (!err && count === 0) {
      const fileStream = fs.createReadStream("./data/books.json");
      const jsonBookStream = StreamArray.withParser();
      const processStream = new Writable({
        objectMode: true,
        write(chunk, encoding, callback) {
          const book = chunk.value;
          console.log(`book n${++i} added`);
          db.book.create({
            title: book.title,
            author: book.author_name,
            year: book.first_publish_year,
            image: book.cover_i,
          });
          callback();
        },
      });
      fileStream.pipe(jsonBookStream.input);
      jsonBookStream.pipe(processStream);

      processStream.on("finish", () => {
        console.log("Books collection seeded");
      });
    }
  });

  db.movie.estimatedDocumentCount((err, count) => {
    let i = 0;
    if (!err && count === 0) {
      const fileStream = fs.createReadStream("./data/movies.json");
      const jsonMovieStream = StreamArray.withParser();
      const processStream = new Writable({
        objectMode: true,
        write(chunk, encoding, callback) {
          const movie = chunk.value;
          db.movie.create({
            title: movie.title,
            author: movie.directors,
            year: movie.year,
          });
          setTimeout(() => {
            console.log(`movie n${++i} added`);
            callback();
          }, 1);
        },
      });
      fileStream.pipe(jsonMovieStream.input);
      jsonMovieStream.pipe(processStream);

      processStream.on("finish", () => {
        console.log("Movies collection seeded");
      });
    }
  });

  console.log("db init done");
};
