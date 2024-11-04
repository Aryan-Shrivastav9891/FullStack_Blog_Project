require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

//PORT
const port = process.env.PORT || 5000;


//EJS
app.use("view engine" , "ejs")

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
    console.log("Database Connection fail " + err);
});
