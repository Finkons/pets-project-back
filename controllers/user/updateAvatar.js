const { User } = require("../../models/user");
const uploadImage = require("../../helpers/uploadImage");
const { deleteImage } = require("../../helpers");

const updateAvatar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { path: tempUpload } = req.file;
    const userAvatar = await User.findById(_id);
    const idPublic = userAvatar.idCloud;
    if (idPublic) {
      await deleteImage(idPublic);
    }
    const data = await uploadImage(tempUpload);
    const avatarURL = data.secure_url;
    const idCloud = data.public_id;
    await User.findByIdAndUpdate(_id, { avatarURL, idCloud });
    res.json({
      avatarURL,
      idCloud,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = updateAvatar;
