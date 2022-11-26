require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
  secure: true,
});

const uploadImage = async imagePath => {
  const options = {
    use_filename: false,
    unique_filename: true,
    overwrite: true,
    folder: "avatars",
    transformation: [{ width: 340, height: 340, crop: "fill", gravity: "face" }],
  };

  try {
    const result = await cloudinary.uploader.upload(imagePath, options);
    return result;
  } catch (error) {
    console.error(error);
  }
};

module.exports = uploadImage;
