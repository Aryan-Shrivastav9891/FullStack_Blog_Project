const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
module.exports = function (passport) {
    passport.use(
        new LocalStrategy({usernameField: "email"}, async (email, password, done) => {
            try {
                const user = await User.findOne({email});
                if (!user) {
                    return done(null, false, {message: "User not found with email"});
                }
                const isMAtch = user.password;
                const CheckPass = await bcrypt.compare(password, isMAtch);
                if (!CheckPass) {
                    return done(null, false, {message: "incorrect password"});
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        })
    );
    passport.serializeUser(function (user, done) {
        console.log("we are in in serializeUser" , user , done)
        done(null, user.id);
    });

    passport.deserializeUser(async function (id, done) {
        try {
            console.log("this is my id" , id)
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
};
