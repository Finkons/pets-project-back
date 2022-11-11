const { Notice } = require("../../models/notice");

const getAll = async (req, res) => {
  const result = await Notice.find({}, "-createdAt -updatedAt");

  res.status(200).json(result);
};

module.exports = getAll;
