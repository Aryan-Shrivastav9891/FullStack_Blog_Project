const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");


console.log("e");


const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Full_Stack_blog_Pro",
    allowedFormats: ["jpg", "png", "jpeg", "gif"],
  },
});

const upload = multer({ storage });
module.exports = upload;
