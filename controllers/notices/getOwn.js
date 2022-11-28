const { Notice } = require("../../models/notice");
const { RequestError } = require("../../helpers");

const getOwn = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Notice.find({ owner });
  if (result.length !== 0) {
    return res.status(200).json(result);
  }
  throw RequestError(404, "Not found");
};

module.exports = getOwn;
