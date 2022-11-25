const { Pet } = require("../../models/pets");
const { User } = require("../../models/user");
const uploadImage = require("../../helpers/uploadImage");

const addPet = async (req, res) => {
  try {
    const { _id: owner } = req.user;
    const { path: tempUpload } = req.file;
    const avatarURL = await uploadImage(tempUpload);
    const pet = {
      name: req.body.name,
      date: req.body.date,
      breed: req.body.breed,
      comments: req.body.comments,
      avatarURL: avatarURL,
      owner: owner,
    };

    const result = await Pet.create(pet);
    await User.findByIdAndUpdate(owner, { $push: { pets: result._id } }, { new: true });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = addPet;
