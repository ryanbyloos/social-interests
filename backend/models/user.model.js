const mongoose = require("mongoose");
const User = mongoose.model(
    "User",
    new mongoose.Schema({
        name: String,
        lastname: String,
        email: String,
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
        interests: [
            [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Book"
                }
            ],
            [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Movie"
                }
            ]
        ]
    })
);
module.exports = User;