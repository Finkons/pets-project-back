const { Pet } = require("../../models/pets");
const { User } = require("../../models/user");
const fs = require("fs/promises");
const path = require("path");

const avatarsDir = path.join(__dirname, "../../", "public", "petsAvatars");

const add = async (req, res) => {
  try {
    const { _id: owner } = req.user;
    const { path: tempUpload, filename } = req.file;
    const petId = Date.now();
    const [extension] = filename.split(".").reverse();
    const avatarName = `${petId}.${extension}`;
    const resultUpload = path.join(avatarsDir, avatarName);

    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("petsAvatars", avatarName);

    const result = await Pet.create({ avatarURL, ...req.body, owner });
    await User.findByIdAndUpdate(owner, { $push: { pets: result._id } }, { new: true });
    res.status(201).json(result);
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = add;
