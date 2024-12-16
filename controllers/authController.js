const bcrypt = require("bcrypt");
const User = require("../models/User");
const passport = require("passport");
const {render} = require("ejs");

exports.getLogin = (req, res) => {
    // console.log(req.user);

    res.render("login", {
        title: "login",
        user: req.user,
        error: "",
    });
};

exports.Login = async (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        // console.log({err, user, info});
        console.log("this login route")
        
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.render("login", {
                title: "login",
                user: req.user,
                error: info.message,
            });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect("/");
        });
    })(req, res, next);
};

exports.getRegistration = (req, res) => {
    res.render("register", {
        title: "register",
        user: req.user,
        error: "",
    });
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

        const passHash = await bcrypt.hash(password, 10);
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

// logOut

exports.logout = async (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/auth/login")
    });
};
