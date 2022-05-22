const db = require("../models");
const Book = db.book;
var jwt = require("jsonwebtoken");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findOne({
      _id: req.params.id,
    });
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    res.status(200).send(book);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).send(book);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).send(book);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({
      _id: req.params.id,
    });
    res.status(200).send(book);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
