const cloudinary = require("cloudinary").v2;
require("dotenv").config();


console.log( process.env.CLOUD_NAME , "we are hear in cloudinary");


module.exports = cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
