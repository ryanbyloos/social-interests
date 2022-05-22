const db = require("../models");
const User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

exports.getUser = async (req, res) => {
    if (req.query.id) {
        User.findById(req.query.id)
            .then(user => {
                if (!user) {
                    return res.status(404).send({ message: "User not found" });
                }
                return res.status(200).send(user);
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });
    }
    else if (req.query.username) {
        User.findOne({
            username: req.query.username
        })
            .then(user => {
                if (!user) {
                    return res.status(404).send({ message: "User not found" });
                }
                return res.status(200).send(user);
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });
    }
    else {
        User.find({})
            .then(users => {
                if (!users) {
                    return res.status(404).send({ message: "Users not found" });
                }
                return res.status(200).send(users);
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });
    }
    // try {
    //     const users = await User.find({});
    //     res.status(200).json(users);
    // } catch (err) {
    //     res.status(500).json({
    //         message: err.message
    //     });
    // }
};

exports.getUserBooks = async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.params.id
        });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send(user.books);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getUserMovies = async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.params.id
        });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send(user.movies);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getUserFriends = async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.params.id
        });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send(user.friends);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const newUser = req.body;
        if (req.body.password) {
            newUser.password = bcrypt.hashSync(req.body.password, 8);
        }
        console.log(newUser);
        const user = await User.findOneAndUpdate({
            _id: req.params.id
        }, req.body, { new: true });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.addBook = async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.params.id
        });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        user.books.push(req.body);
        await user.save();
        res.status(200).send(user.books);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.addMovie = async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.params.id
        });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        user.movies.push(req.body);
        await user.save();
        res.status(200).send(user.movies);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.addFriend = async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.params.id
        });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        user.friends.push(req.body);
        await user.save();
        res.status(200).send(user.friends);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.params.id
        });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        await user.remove();
        res.status(200).send({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.params.id
        });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        user.books.pull(req.params.bookId);
        await user.save();
        res.status(200).send(user.books);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.deleteMovie = async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.params.id
        });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        user.movies.pull(req.params.movieId);
        await user.save();
        res.status(200).send(user.movies);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.deleteFriend = async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.params.id
        });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        user.friends.pull(req.params.friendId);
        await user.save();
        res.status(200).send(user.friends);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};