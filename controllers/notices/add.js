const { Notice } = require("../../models/notice");
const { User } = require("../../models/user");
const fs = require("fs/promises");
const path = require("path");

const avatarsDir = path.join(__dirname, "../../", "public", "noticesAvatars");
const add = async (req, res) => {
  const { _id: owner } = req.user;
  const { path: tempUpload, filename } = req.file;
  const { data } = req.body;

  const noticeId = Date.now();
  const extension = filename.split(".").pop();
  const noticeName = `${noticeId}.${extension}`;

  const resultUpload = path.join(avatarsDir, noticeName);
  await fs.rename(tempUpload, resultUpload);
  const avatar = path.join("noticesAvatars", noticeName);

  const result = await Notice.create({ ...JSON.parse(data), avatarURL: avatar, owner });
  await User.findByIdAndUpdate(owner, { $push: { notices: result._id } }, { new: true });
  res.status(201).json(result);
};

module.exports = add;
