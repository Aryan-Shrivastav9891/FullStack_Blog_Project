const Post = require("../models/Post");

exports.getPostForm = (req, res) => {
    res.render("newPost", {
        title: "Create Post",
        user: req.user,
    });
};

exports.createPost = async (req, res) => {
    const {title, content} = req.body;
    const newUser = await Post.create({
        title,
        content,
        author: req.user._id,
    });
    res.redirect("/posts")
};
