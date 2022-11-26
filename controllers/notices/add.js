const { Notice } = require("../../models/notice");
const { User } = require("../../models/user");
const uploadImage = require("../../helpers/uploadImage");


const add = async (req, res) => {
  try { 
     const { _id: owner } = req.user;
  const { path: tempUpload } = req.file;
  const avatar = await uploadImage(tempUpload);
  const { data } = req.body;

 const result = await Notice.create({...JSON.parse(data), avatarURL:avatar,  owner });
    await User.findByIdAndUpdate(owner, { $push: { notices: result._id } }, { new: true });
    res.status(201).json(result);
  }
  catch (error) {
    console.log(error)
  }
}

module.exports = add;
