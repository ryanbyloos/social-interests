const mongoose = require("mongoose");
const User = mongoose.model(
    "User",
    new mongoose.Schema({
        // firstname: String,
        // lastname: String,
        // email: String,
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: String,
        bio: String,
        avatar: String,
        friends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ],
        books: [

            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book"
            }
        ],
        movies: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Movie"
            }
        ]
    })
);
module.exports = User;