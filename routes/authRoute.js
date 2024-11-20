const express = require("express");
const {getLogin, Login, Registration, getRegistration, logout} = require("../controllers/authController");
const userRoute = express.Router();

userRoute.get("/login", getLogin);
//* Route   Login logic
userRoute.post("/login", Login);
//* Route  register
userRoute.get("/register", getRegistration);
//* Route  register main logic
userRoute.post("/register", Registration);

//* route logout 
userRoute.get("/logout" , logout)

module.exports = userRoute;
