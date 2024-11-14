const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.getLogin = (req, res) => {
    res.render("login");
};

exports.Login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const loginData = await User.findOne({email});
        const checkHash = await bcrypt.compare(password, loginData.password);
        if (checkHash) {
            res.send("login sacksful");
        } else {
            res.send("Email and pass wrong");
        }
    } catch (error) {
        res.send(error);
    }
};

exports.getRegistration = (req, res) => {
    res.render("register");
};

exports.Registration = async (req, res) => {
    const {username, email, password} = req.body;
    try {
        // Check if the user is already present
        const ExistUser = await User.findOne({email});
        if (ExistUser) {
            return res.render("register", {
                title: "register",
                user: req.username,
                error: "User Already Present",
            });
        }

        const passHash = await bcrypt.hash(password , 10)
        // Create a new user
        const newUser = new User({
            username,
            email,
            password: passHash,
        });
        await newUser.save();
        // Redirect to login
        res.redirect("/auth/login");
    } catch (error) {
        // Render with a fallback error message if something went wrong
        res.render("register", {
            title: "Register",
            user: req.username || "",
            error: error.message,
        });
    }
};
