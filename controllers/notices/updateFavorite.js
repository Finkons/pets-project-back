const { Notice } = require("../../models/notice");

const updateFavorite = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: noticeId } = req.params;

  await Notice.findByIdAndUpdate(noticeId, req.body, {
    new: true,
  });
  const result = await Notice.findByIdAndUpdate(noticeId, { $addToSet: { fans: userId._id } }, { new: true });
  res.json(result);
};

module.exports = updateFavorite;
