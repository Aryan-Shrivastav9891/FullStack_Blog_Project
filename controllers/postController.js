const asyncHandler = require("express-async-handler");
const Post = require("../models/Post");
const fs = require("fs");
const path = require("path");
const uploadFileToCloudianry = require("../config/cloudinary");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

exports.getPostForm = asyncHandler((req, res) => {
  res.render("newPost", {
    title: "Create Post",
    user: req.user,
    error: "",
    success: "",
  });
});

exports.createPost = asyncHandler(async (req, res) => {
  try {
    let fpath = path.join(__dirname, `../uploadImage/${req.file.filename}`);
    console.log(req.file.fieldname);
    const uploadResult = await uploadFileToCloudianry(fpath);
    const ul = uploadResult.url;
    const { title, content } = req.body;
    console.log(req.file, "this is my file");
    if (!req.file || !req.file.length === 0) {
      res.render("newPost", {
        title: "Create Post ",
        user: req.user,
        success: "plz add a post ",
        error: "",
      });
    }
    await Post.create({
      title: title,
      content: content,
      author: req.user._id,
      images: [
        {
          url: uploadResult.url,
          public_id: uploadResult.public_id,
        },
      ],
    });
    res.render("newPost", {
      title: "Create Post ",
      user: req.user,
      success: "Post Create Successfully",
      error: "",
      // success:""
    });

    if (fs.existsSync(fpath)) {
      fs.unlink(fpath, (err) => {
        if (err) console.error("Error deleting file:", err.message);
        else console.log("Local file deleted:", fpath);
      });
    } else {
      console.log("File not found, skipping deletion:", filePath);
    }
  } catch (error) {
    // console.log(error, "ERROR");
    // res.status(500).json({
    //   success: false,
    //   message: "Failed to upload image",
    //   error: error.message,
    // });
    res.status(500);
    res.render("error", {
      title: "Error",
      error: error.message,
      user: "req.user",
    });
  }
});

exports.getPosts = asyncHandler(async (req, res) => {
  const posts =await Post.find().populate("author" , "username")
  res.render("posts", {
    title: "Posts",
    posts,
    user: req.user,
    success: "",
    error: "",
  });
});
