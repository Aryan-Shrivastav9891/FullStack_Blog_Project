const {Mongoose, Schema, default: mongoose, model} = require("mongoose");
const bcrypt = require("bcryptjs");

// Schema
const CommentSchema = new Schema(
    {
        content: {
            type: String,
            require: true,
        },
        post: {
            type: Schema.types.ObjectId,
            ref: "Post",
            require: true,
        },
        author: {
            type: Schema.types.ObjectId,
            require: true,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
