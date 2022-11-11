const { Notice } = require("../../models/notice");

const { RequestError } = require("../../helpers");

const getByCategory = async (req, res) => {
  const { category } = req.params;

  const result = await Notice.find({ category }, "-createdAt -updatedAt");
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json(result);
};
module.exports = getByCategory;
