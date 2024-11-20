require("dotenv").config();
const express = require("express");
const app = express();
const passport = require("passport");
const mongoose = require("mongoose");
const session = require("express-session");
const userRoute = require("./routes/authRoute");
const passportConfig = require("./config/passport");
const MongoStore = require("connect-mongo");
const postRoute = require("./routes/postRoute");

//EJS
app.set("view engine", "ejs");

//PORT
const port = process.env.PORT || 5000;

//* middleware:passing from data
app.use(express.urlencoded({extended: true}));

// session midway
app.use(
    session({
        secret: "keyword cat",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({mongoUrl: process.env.mongoDB_URL}),
    })
);

// passport configuration
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

//! Route   Login
app.use("/auth", userRoute);

app.use('/posts' , postRoute)
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
