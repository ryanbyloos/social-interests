const mongoose = require("mongoose");

/**
 * @description The schema for the role model
 */
const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    name: String,
  })
);

module.exports = Role;
