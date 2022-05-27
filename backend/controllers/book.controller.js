const db = require("../models");
const Book = db.book;

exports.getBooks = (req, res) => {
  if (req.query.title) {
    Book.find({ title: { $regex: req.query.title, $options: "i" } })
      .limit(10)
      .then((books) => {
        res.json(books);
      });
  } else if (req.query.id) {
    Book.findById(req.query.id, (err, book) => {
      if (err) {
        res.send(err);
      }
      res.json(book);
    });
  } else {
    Book.find({}, (err, book) => {
      if (err) {
        res.send(err);
      }
      res.json(book);
    });
  }
};
