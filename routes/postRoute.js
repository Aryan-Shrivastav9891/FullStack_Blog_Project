const express = require("express");
const handleFileUpload = require("../config/multer");

const { getPostForm, createPost } = require("../controllers/postController");
const { ensureAuthenticated } = require("../middlewares/auth");
const postRoute = express.Router();

postRoute.get("/add", getPostForm);

postRoute.post("/add" , ensureAuthenticated , handleFileUpload , createPost);

module.exports = postRoute;
    