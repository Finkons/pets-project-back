const { Notice } = require("../../models/notice");
// const { RequestError } = require("../../helpers");

const getFavorite = async (req, res) => {
  const { _id: userId } = req.user;
  const result = await Notice.find({ fans: userId._id });
  // if (result.length !== 0) {
    return res.status(200).json(result);
  // }
  // throw RequestError(404, "Not found");
};

module.exports = getFavorite;
