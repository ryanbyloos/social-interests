const db = require("../models");
const User = db.user;
var jwt = require("jsonwebtoken");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.params.id
        });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

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
}

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
}

exports.updateUser = async (req, res) => {
    try {
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
}

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
}

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
}

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
}

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
}

exports.deleteBook = async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.params.id
        });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        user.books.pull(req.body);
        await user.save();
        res.status(200).send(user.books);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.deleteMovie = async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.params.id
        });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        user.movies.pull(req.body);
        await user.save();
        res.status(200).send(user.movies);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.deleteFriend = async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.params.id
        });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        user.friends.pull(req.body);
        await user.save();
        res.status(200).send(user.friends);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}