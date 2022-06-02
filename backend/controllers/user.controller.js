const db = require("../models");
const User = db.user;
var bcrypt = require("bcrypt");

exports.getUser = async (req, res) => {
  if (req.query.id) {
    User.findById(req.query.id)
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: "User not found" });
        }
        return res.status(200).send(user);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  } else if (req.query.username) {
    User.findOne({
      username: req.query.username,
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: "User not found" });
        }
        return res.status(200).send(user);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  } else {
    User.find({})
      .then((users) => {
        if (!users) {
          return res.status(404).send({ message: "Users not found" });
        }
        return res.status(200).send(users);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
};

exports.getUserBooks = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
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
      _id: req.params.id,
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
      _id: req.params.id,
    });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(user.following);
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
    const user = await User.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      { new: true }
    );
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
      _id: req.params.id,
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
      _id: req.params.id,
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

exports.followFriend = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
    });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const friend = await User.findOne({
      _id: req.body._id,
    });
    if (!friend) {
      return res.status(404).send({ message: "Friend not found" });
    }
    user.following.push(friend._id);
    friend.followers.push(user._id);

    await user.save();
    await friend.save();

    res.status(200).send(user.following);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
    });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    for (let i = 0; i < user.followers.length; i++) {
      const followerId = user.followers[i];
      const follower = await User.findOne({
        _id: followerId,
      });
      if (!follower) {
        return res.status(404).send({ message: "Follower not found" });
      }
      follower.following.pull(user._id);
      await follower.save();
    }
    for (let i = 0; i < user.following.length; i++) {
      const followingId = user.following[i];
      const following = await User.findOne({
        _id: followingId,
      });
      if (!following) {
        return res.status(404).send({ message: "Following not found" });
      }
      following.followers.pull(user._id);
      await following.save();
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
      _id: req.params.id,
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
      _id: req.params.id,
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

exports.hasBook = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
    });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const hasBook = user.books.some((book) =>
      book._id.equals(req.params.bookId)
    );
    res.status(200).send(hasBook);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.hasMovie = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
    });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const hasMovie = user.movies.some((movie) =>
      movie._id.equals(req.params.movieId)
    );
    res.status(200).send(hasMovie);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.deleteFriend = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
    });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const friend = await User.findOne({
      _id: req.params.friendId,
    });
    if (!friend) {
      return res.status(404).send({ message: "Friend not found" });
    }
    user.following.pull(req.params.friendId);
    friend.followers.pull(req.params.id);

    await user.save();
    await friend.save();

    res.status(200).send(user.following);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.areFriends = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
    });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const friend = await User.findOne({
      _id: req.params.friendId,
    });
    if (!friend) {
      return res.status(404).send({ message: "Friend not found" });
    }
    const isFriend = user.following.some((friend) =>
      friend.equals(req.params.friendId)
    );
    res.status(200).send(isFriend);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getSimilarity = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.query.id,
    });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const friend = await User.findOne({
      _id: req.query.friendId,
    });
    if (!friend) {
      return res.status(404).send({ message: "Friend not found" });
    }
    const commonBooks = user.books.filter((book) =>
      friend.books.includes(book)
    );
    const commonMovies = user.movies.filter((movie) =>
      friend.movies.includes(movie)
    );
    const similarity = commonBooks.length + commonMovies.length;
    res.status(200).send({ result: similarity });
  } catch (err) {
    res.status(500).send({ message: "Similarity computation failed" });
  }
};

exports.getTenMostSimilar = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.query.id,
    });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const friends = await User.find({
      _id: { $nin: [req.query.id] },
    });
    if (!friends) {
      return res.status(404).send({ message: "Friends not found" });
    }
    const similarity = friends.map((friend) => {
      const commonBooks = user.books.filter((book) =>
        friend.books.includes(book)
      );
      const commonMovies = user.movies.filter((movie) =>
        friend.movies.includes(movie)
      );
      return {
        id: friend._id,
        username: friend.username,
        similarity: commonBooks.length + commonMovies.length,
      };
    });
    const sortedSimilarity = similarity.sort((a, b) => {
      return b.similarity - a.similarity;
    });
    const tenMostSimilar = sortedSimilarity.slice(0, 10);
    res.status(200).send(tenMostSimilar);
  } catch (err) {
    res.status(500).send({ message: "Similarity computation failed" });
  }
};
