const { Mongoose, Schema, default: mongoose, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true, // Fixed the typo: 'require' to 'required'
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User", // Kept 'required: false' implicit, as it's optional by default
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
      },
    ],

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", PostSchema);
