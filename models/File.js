const {Mongoose, Schema, default: mongoose, model} = require("mongoose");
const bcrypt = require("bcryptjs");

// Schema
const FileSchema = new Schema(
    {
        url: {
            type: String,
            require: true,
        },
        public_id: {
            type: String,
            require: true,
        },
        uploaded_by: {
            type: Schema.types.ObjectId,
            require: true,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

const File = mongoose.model("File", FileSchema);

module.exports = File;
