const {models, model} = require("mongoose");
const User = require("../models/User");
const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt")

module.exports = function (passport) {
    passport.use(new LocalStrategy({usernameField: "email"} , async(email , password , done)=>{
        try {
            const user = await User.findOne({email})
            if (!user) {
                return done(null , false , {message:"User not found with email"})
            }
            const isMAtch = user.password
            const CheckPass = await bcrypt.compare(password ,isMAtch)
            if (!isMAtch) {
                return done( null , false , {message :"incorrect password"})
            }
            return done(null  , user)

        } catch (error) {
            return done(error)
            
        }
    }));
    passport.deserializeUser(function(user , done){
        done(null , )
    })
};
