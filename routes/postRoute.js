const express = require("express");
const handleFileUpload = require("../config/multer");

const { getPostForm, createPost } = require("../controllers/postController");
const postRoute = express.Router();

postRoute.get("/add", getPostForm);

postRoute.post("/add", handleFileUpload , createPost);

module.exports = postRoute;
    