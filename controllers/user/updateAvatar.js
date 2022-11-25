const { User } = require("../../models/user");
const uploadImage = require("../../helpers/uploadImage");

const updateAvatar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { path: tempUpload } = req.file;
    const avatarURL = await uploadImage(tempUpload);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({
      avatarURL,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = updateAvatar;
