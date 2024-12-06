const Post = require("../models/Post");
const fs = require("fs");
const path = require("path");
const uploadFileToCloudianry = require("../config/cloudinary");
// const { url } = require("inspector");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

exports.getPostForm = (req, res) => {
  res.render("newPost", {
    title: "Create Post",
    user: req.user,
  });
};

exports.createPost = async (req, res) => {
  try {
    let fpath = path.join(__dirname, `../uploadImage/${req.file.filename}`);
    const uploadResult = await uploadFileToCloudianry(fpath);

    const ul = uploadResult.url;
    const { title, content } = req.body;
    console.log(title , " " , content , " " , req.user._id , " " ,  uploadResult.url , "this is my createPost");
    const newPost = await Post.create({
      title:title,
      content:content,
      author: req.user._id,
      // images: [{ url:{ url:uploadResult.url }}, { public_id:{public_id: uploadResult.public_id }}],
      images: [
        {
          url: uploadResult.url, // Directly assign the value
          public_id: uploadResult.public_id, // Directly assign the value
        },
      ],
    });
    res.redirect("/posts");

    if (fs.existsSync(fpath)) {
      console.log(fpath , "this is my file path")
      fs.unlink(fpath, (err) => {
        if (err) console.error("Error deleting file:", err.message);
        else console.log("Local file deleted:", fpath);
      });
    } else {
      console.log("File not found, skipping deletion:", filePath);
    }
  } catch (error) {
    console.log(error , "ERROR")
    res.status(500).json({
      success: false,
      message: "Failed to upload image",
      error: error.message,
    });
  }
};
