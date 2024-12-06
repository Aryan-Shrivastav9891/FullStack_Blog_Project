const multer = require("multer");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
  destination: async (req, res, cb) => {
    const userRoutePath = path.join(__dirname, "../uploadImage");
    if (!fs.existsSync(userRoutePath)) {
      fs.mkdirSync(userRoutePath, {
        recursive: true,
      });
    }
    cb(null, userRoutePath);
  },
  filename: (req, file, cb) => {
    const rendId = uuidv4();
    // req.rendomId = rendId();
    // console.log("this is req", req);
    const originalNameWithoutExtension = file.originalname
      .split(".")
      .slice(0, -1)
      .join(".");
    const newFileName = `${rendId}_${originalNameWithoutExtension}.jpg`;
    cb(null, newFileName);
    // file.fieldname is name of the field (image)
    // path.extname get the uploaded file extension
  },
});
const upload = multer({
  storage,
}).single("image");

function handleFileUpload(req, res, next) {
  try {
    upload(req, res, function (err, data) {
      if (err instanceof multer.MulterError) {
        return res.send("Error occurred during file upload.");
      }
      next();
    });
  } catch (error) {
    return res.send("Error occurred in handleFileUpload");
  }
}

module.exports = handleFileUpload;
