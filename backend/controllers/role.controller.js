const db = require("../models");
const Role = db.role;
const jwt = require("jsonwebtoken");

exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find({});
    if (!roles) {
      return res.status(404).send({ message: "Roles not found" });
    }
    res.status(200).send(roles);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.isAdmin = async (req, res) => {
  const role = await Role.findOne({ name: "admin" });
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).send({ message: "No token provided" });
  }
  jwt.verify(token, process.env.JWT_KEY || "secret", (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Invalid token" });
    }
    if (decoded.roles.includes(role._id.toString())) {
      return res.status(200).send({ isAdmin: true });
    } else {
      return res.status(200).send({ isAdmin: false });
    }
  });
};
