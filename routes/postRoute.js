const express = require("express");
const { getPostForm } = require("../controllers/postController");
const postRoute = express.Router()


postRoute.get("/add" , getPostForm)


module.exports = postRoute