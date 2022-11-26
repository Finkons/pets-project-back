require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
  secure: true,
});

const deleteImage = async id => {
  try {
    const result = await cloudinary.uploader.destroy(id);
    console.log("deleteImage");
    return result;
  } catch (error) {
    console.error(error);
  }
};

module.exports = deleteImage;
