const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};

/**
 * @description Initialize the database connector and
 */
db.mongoose = mongoose;
db.user = require("./user.model");
db.role = require("./role.model");
db.book = require("./book.model");
db.movie = require("./movie.model");
db.ROLES = ["user", "admin"];

module.exports = db;
