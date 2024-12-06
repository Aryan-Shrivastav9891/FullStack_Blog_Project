const cloudinary = require("cloudinary").v2;
require("dotenv").config();

module.exports = cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadFileToCloudianry = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "Post Image", // Specify folder in Cloudinary
      use_filename: true, // Use the original file name
      unique_filename: false, // Avoid unique names (optional)
      overwrite: true, // Overwrite if file already exists (optional)
    });
    
    // console.log("Upload successful:", result);
    return result;

  } catch (error) {
    console.error("Error uploading to Cloudinary:", error.message);
    throw error; // Handle error as required
  }
};
module.exports = uploadFileToCloudianry


