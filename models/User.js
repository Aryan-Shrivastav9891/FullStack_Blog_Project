const {Mongoose, Schema, default: mongoose, model} = require("mongoose");
const bcrypt = require("bcryptjs");

// Schema
const UserSchema = new Schema(
    {
        username: {
            type: String,
            require: true,
            trim: true,
        },
        email: {
            type: String,
            require: true,
            trim: true,
        },
        password: {
            type: String,
            require: true,
        },
        profilePicture: {
            type: String,
            public_id: String,
        },
        bio: {
            type: String,
        },
        post: [
            {
                type: Schema.types.ObjectId,
                ref: "POST",
            },
        ],
        comments: [
            {
                type: Schema.types.ObjectId,
                ref: "Comment",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User" , UserSchema)


module.exports = User