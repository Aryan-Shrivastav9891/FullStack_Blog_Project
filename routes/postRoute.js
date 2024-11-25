const express = require("express");
const upload = require("../config/multer");

const { getPostForm, createPost } = require("../controllers/postController");
const postRoute = express.Router();

postRoute.get("/add", getPostForm);

postRoute.post("/add", upload.single("image"), createPost);

module.exports = postRoute;
    