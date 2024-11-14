const express = require("express");
const {getLogin, Login, Registration, getRegistration} = require("../controllers/authController");
const userRoute = express.Router();

userRoute.get("/login", getLogin);
//* Route   Login logic
userRoute.post("/login", Login);
//* Route  register
userRoute.get("/register", getRegistration);
//* Route  register mail logic
userRoute.post("/register", Registration);

module.exports = userRoute;
