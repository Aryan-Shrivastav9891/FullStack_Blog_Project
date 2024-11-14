require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const userRoute = require("./routes/authRoute");

//EJS
app.set("view engine", "ejs");

//PORT
const port = process.env.PORT || 5000;

//* middleware:passing from data
app.use(express.urlencoded({extended: true}));

//! Route   Login
app.use("/auth" , userRoute)
//mongoDB COnnection
mongoose
.connect(process.env.mongoDB_URL)
.then(() => {
    //Start the server
    app.listen(port, () => {
        console.log(`this is server running on port ${port} 💕😊`);
    });
    console.log("this is my mongoDB server ♠️");
})
.catch((err) => {
    console.log("Database Connection fail ");
});
