const { Notice } = require("../../models/notice");
const { User } = require("../../models/user");
const uploadImage = require("../../helpers/uploadImage");
const { RequestError } = require("../../helpers");

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const { path: tempUpload } = req.file;
  const avatarURL = await uploadImage(tempUpload);
  const notice = {
    title: req.body.title,
    name: req.body.name,
    birthday: req.body.birthday,
    breed: req.body.breed,
    sex: req.body.sex,
    location: req.body.location,
    price: req.body.price,
    avatarURL: avatarURL,
    comments: req.body.comments,
    category: req.body.category,
    owner: owner,
  };
  if (notice) {
    const result = await Notice.create(notice);
    if (result.length !== 0) {
      await User.findByIdAndUpdate(owner, { $push: { notices: result._id } }, { new: true });
      return res.status(201).json(result);
    }
    throw RequestError(404, "Not found");
  }
  throw RequestError(404, "Not found");
};

module.exports = add;
