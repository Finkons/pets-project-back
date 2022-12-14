const { Pet } = require("../../models/pets");
const { User } = require("../../models/user");
const uploadImage = require("../../helpers/uploadImage");

const addPet = async (req, res) => {
  try {
    const { _id: owner } = req.user;
    const { path: tempUpload } = req.file;
    const avatarData = await uploadImage(tempUpload);
    const avatar = avatarData.secure_url;
    const idPublic = avatarData.public_id;
    const { data } = req.body;

    const result = await Pet.create({ ...JSON.parse(data), avatarURL: avatar, idCloud: idPublic, owner });
    await User.findByIdAndUpdate(owner, { $push: { pets: result._id } }, { new: true });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = addPet;
