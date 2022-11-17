const { Pet } = require("../../models/pets");
const fs = require("fs/promises");
const path = require("path");

const avatarsDir = path.join(__dirname, "../../", "public", "petsAvatars");

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const { path: tempUpload, filename } = req.file;
  const { _id } = req.user;
  const [extension] = filename.split(".").reverse();
  const avatarName = `${_id}.${extension}`;
  const resultUpload = path.join(avatarsDir, avatarName);

  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("petsAvatars", resultUpload);

  const result = await Pet.create({ avatarURL, ...req.body, owner });
  res.status(201).json(result);
};

module.exports = add;
