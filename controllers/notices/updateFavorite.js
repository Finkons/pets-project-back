const { Notice } = require("../../models/notice");
const { RequestError } = require("../../helpers");

const updateFavorite = async (req, res) => {
  const { _id: userId } = req.user;
  const { id } = req.params;
  console.log(id);
  const result = await Notice.findByIdAndUpdate(id, { $push: { fans: userId._id } }, { new: true });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  console.log(result);
  res.json(result);
};

module.exports = updateFavorite;
