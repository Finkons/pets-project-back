const { Notice } = require("../../models/notice");

const updateFavorite = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: noticeId } = req.params;

  const array = await Notice.findByIdAndUpdate(noticeId, req.body, {
    new: true,
  });
  if (array.favorite) {
    const result = await Notice.findByIdAndUpdate(noticeId, { $addToSet: { fans: userId._id } }, { new: true });
    res.json(result);
    return;
  }
  const result = await Notice.findByIdAndUpdate(noticeId, { $pull: { fans: userId._id } }, { new: true });
  res.json(result);
};

module.exports = updateFavorite;
