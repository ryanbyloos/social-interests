const db = require("../models");
const User = db.user;
const Role = db.role;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({ message: "Username or password is empty" });
  }

  try {
    await User.create({
      username,
      password: bcrypt.hashSync(password, 8),
      roles: [await Role.findOne({ name: "user" })],
      bio: "",
    });
    res.send({ message: "User created successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.signin = async (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign(
          {
            username: user.username,
            userId: user._id,
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
        return res.status(401).send({ message: "Invalid password" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signout = async (req, res) => {
  res.status(200).send({ message: "Signout successful" });
};

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
