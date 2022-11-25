const { Notice } = require("../../models/notice");
const { User } = require("../../models/user");
const uploadImage = require("../../helpers/uploadImage");

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
  const result = await Notice.create(notice);
  await User.findByIdAndUpdate(owner, { $push: { notices: result._id } }, { new: true });
  res.status(201).json(result);
};

module.exports = add;
