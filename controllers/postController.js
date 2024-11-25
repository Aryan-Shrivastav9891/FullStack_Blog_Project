const Post = require("../models/Post");


exports.getPostForm = (req, res) => {
    res.render("newPost", {
        title: "Create Post",
        user: req.user,
    });
};

exports.createPost = async (req, res) => {
    console.log("we are hear");
    console.log(req.file , "this is my image")
    
    console.log(req.body , "this is my req body");
    const {title, content} = req.body;
    
    const newUser = await Post.create({
        title,
        content,
        author: req.user._id,
    });
    console.log(newUser)
    res.redirect("/posts")
};
