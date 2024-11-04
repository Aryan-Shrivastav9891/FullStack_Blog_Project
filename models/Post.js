const {Mongoose, Schema, default: mongoose, model} = require("mongoose");
const bcrypt = require("bcryptjs");

// Schema
const PostSchema = new Schema(
    {
        title: {
            type: String,
            require: true,
            trim: true,
        },
        content: {
            type: String,
            require: true,
        },
        author: {
            type: Schema.types.ObjectId,
            require: true,
        },
        images: [
            {
                url: {
                    type: String,
                    required: true,
                },
                public_id: {
                    type: String,
                    require: true,
                },
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

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
