const { Schema, model, Types } = require("mongoose");
const bcrypt = require("bcryptjs");

// User Schema
const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true, // Corrected 'require' to 'required'
            trim: true,
        },
        email: {
            type: String,
            required: true, // Corrected 'require' to 'required'
            trim: true,
        },
        password: {
            type: String,
            required: true, // Corrected 'require' to 'required'
        },
        profilePicture: {
            type: String,
            public_id: String,
        },
        bio: {
            type: String,
        },
        posts: [ // Changed from 'post' to 'posts' to keep it plural (more natural)
            {
                type: Schema.Types.ObjectId, // Corrected to 'Types.ObjectId'
                ref: "Post", // Corrected model name capitalization
            },
        ],
        comments: [
            {
                type: Types.ObjectId, // Corrected to 'Types.ObjectId'
                ref: "Comment", // Corrected model name capitalization
            },
        ],
    },
    {
        timestamps: true,
    }
);

// Create model for User
const User = model("User", UserSchema); // Corrected model name capitalization

module.exports = User;
