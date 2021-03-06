const express = require("express");
const db = require("../models");
const User = db.user;
const Role = db.role;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

/**
 * @description Create a new user when the user is registering
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  if (username.match(/^[a-zA-Z0-9_]{3,20}$/) !== null && password.length >= 8) {
    try {
      await User.create({
        username,
        password: bcrypt.hashSync(password, 8),
        roles: [await Role.findOne({ name: "user" })],
        bio: "Nouvel utilisateur de la plateforme",
      });
      res.send({ message: "User created successfully" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  } else {
    res.status(400).send({ message: "Username or password is invalid" });
  }
};

/**
 * @description Log a user in when the user is logging in
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.signin = async (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .then((user) => {
      if (!user) {
        return res.status(401).send({ message: "Invalid credentials" });
      }
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign(
          {
            username: user.username,
            userId: user._id,
            roles: user.roles,
          },
          process.env.JWT_KEY || "secret",
          {
            expiresIn: 86400,
          }
        );
        return res.status(200).send({
          success: true,
          message: "Authentication successful",
          token: token,
          userId: user._id,
          username: user.username,
        });
      } else {
        return res.status(401).send({ message: "Invalid credentials" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

/**
 * @description Log a user out when the user is logging out
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.signout = async (req, res) => {
  res.status(200).send({ message: "Signout successful" });
};

/**
 * @description Get the user's profile
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.whoami = async (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).send({ message: "No token provided" });
  }
  jwt.verify(token, process.env.JWT_KEY || "secret", (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Invalid token" });
    }
    return res.status(200).send(decoded);
  });
};
